import { test } from "node:test";
import assert from "node:assert/strict";
import { isSameSiteRequest } from "../lib/portal-origin";

const base = { requestOrigin: "https://codephantom.example", siteUrl: "https://codephantom.example/" };

test("portal POSTs from the site itself are accepted", () => {
  assert.equal(isSameSiteRequest({ ...base, method: "POST", origin: "https://codephantom.example", secFetchSite: "same-origin" }), true);
  // Behind a proxy the request origin may be internal; the configured site URL still matches.
  assert.equal(
    isSameSiteRequest({ ...base, requestOrigin: "http://localhost:3000", method: "POST", origin: "https://codephantom.example", secFetchSite: "same-origin" }),
    true,
  );
});

test("cross-site or sibling-subdomain POSTs are refused", () => {
  for (const origin of ["https://evil.example", "https://attacker.codephantom.example", "null"]) {
    assert.equal(isSameSiteRequest({ ...base, method: "POST", origin, secFetchSite: "cross-site" }), false, origin);
  }
  assert.equal(isSameSiteRequest({ ...base, method: "POST", origin: null, secFetchSite: "cross-site" }), false);
  assert.equal(isSameSiteRequest({ ...base, method: "POST", origin: null, secFetchSite: "same-site" }), false);
});

test("reads are never blocked", () => {
  assert.equal(isSameSiteRequest({ ...base, method: "GET", origin: "https://evil.example", secFetchSite: "cross-site" }), true);
});
