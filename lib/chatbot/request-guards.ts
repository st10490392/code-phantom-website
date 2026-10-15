/** Process-wide safety ceiling. Multi-instance hosting needs a shared limiter before rollout. */
export function createLimiter(limit = 60, windowMs = 60_000) {
  let start = 0;
  let count = 0;
  return (now = Date.now()): boolean => {
    if (now - start >= windowMs || now < start) { start = now; count = 0; }
    if (count >= limit) return false;
    count += 1;
    return true;
  };
}

export async function boundedJson(request: Request, maxBytes = 4096): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new Error("content-type");
  if (Number(request.headers.get("content-length")) > maxBytes) throw new Error("body-size");
  if (!request.body) throw new Error("body");
  const reader = request.body.getReader();
  let expired = false;
  const deadline = setTimeout(() => { expired = true; void reader.cancel().catch(() => undefined); }, 5000);
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (expired) throw new Error("body-timeout");
      if (done) break;
      size += value.byteLength;
      if (size > maxBytes) { await reader.cancel(); throw new Error("body-size"); }
      chunks.push(value);
    }
  } finally { clearTimeout(deadline); reader.releaseLock(); }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}
