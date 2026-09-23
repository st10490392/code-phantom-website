import { test } from "node:test";
import assert from "node:assert/strict";
import { parseWhatsAppInvite } from "../lib/site-config";
import { androidRelease } from "../lib/releases";
import { company, contractingPartyName, isRegisteredCompany, legalEntityNotice } from "../lib/company";
import { founder } from "../lib/founder";
import { scannerMarketPacks } from "../lib/products";

test("the supplied CodePhantom Traders invite link is accepted and canonicalised", () => {
  assert.equal(
    parseWhatsAppInvite("https://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4?s=cl&p=a&mlu=4&ilr=4"),
    "https://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4",
  );
  assert.equal(parseWhatsAppInvite("  https://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4/  "), "https://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4");
});

test("unrelated or malicious URLs are rejected", () => {
  for (const bad of [
    undefined,
    "",
    "http://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4",
    "https://chat.whatsapp.com.evil.example/CGUao6NoNZfB80xoCChoq4",
    "https://evil.example/?u=https://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4",
    "https://user:pw@chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4",
    "https://chat.whatsapp.com:8443/CGUao6NoNZfB80xoCChoq4",
    "https://chat.whatsapp.com/CGUao6NoNZfB80xoCChoq4/extra",
    "https://chat.whatsapp.com/short",
    "https://chat.whatsapp.com/<script>",
    "https://wa.me/27000000000",
    "javascript:alert(1)",
    "not a url",
  ]) {
    assert.equal(parseWhatsAppInvite(bad), null, String(bad));
  }
});

test("no APK is offered unless a complete, valid release is configured", () => {
  assert.equal(androidRelease({}), null);
  const ok = {
    version: "0.2.0",
    url: "https://github.com/st10490392/code-phantom-App/releases/download/v0.2.0/app-release.apk",
    sha256: "a".repeat(64),
    date: "2026-10-01",
    channel: "beta",
  };
  assert.deepEqual(androidRelease(ok)?.version, "0.2.0");
  assert.equal(androidRelease({ ...ok, sha256: "" }), null);
  assert.equal(androidRelease({ ...ok, url: "https://evil.example/app.apk" }), null);
  assert.equal(androidRelease({ ...ok, url: "http://github.com/st10490392/code-phantom-App/releases/download/v0.2.0/app-release.apk" }), null);
  assert.equal(androidRelease({ ...ok, channel: "nightly" }), null);
});

test("founder identity: GingerCodePhantom alias + Ripfumelo Ngobeni; no legal entity claimed yet", () => {
  assert.equal(company.founder.alias, "GingerCodePhantom");
  assert.equal(company.founder.personName, "Ripfumelo Ngobeni");
  assert.equal(founder.alias, "GingerCodePhantom");
  assert.equal(founder.name, "Ripfumelo Ngobeni");
  assert.equal(founder.displayName, "GingerCodePhantom (Ripfumelo Ngobeni)");
  assert.equal(founder.role, "Founder · CodePhantom Technologies");
  assert.match(legalEntityNotice(), /GingerCodePhantom \(Ripfumelo Ngobeni\)/);
  assert.equal(isRegisteredCompany(), false);
  assert.equal(contractingPartyName(), "CodePhantom Technologies");
  assert.doesNotMatch(legalEntityNotice(), /Pty|Ltd/);
});

test("Scanner packs mirror the backend plan catalog", () => {
  assert.deepEqual(scannerMarketPacks.map((p) => p.planCode), [
    "scanner_forex",
    "scanner_indices",
    "scanner_synthetics",
    "scanner_forex_indices",
    "scanner_forex_synthetics",
    "scanner_indices_synthetics",
    "scanner_full",
  ]);
});
