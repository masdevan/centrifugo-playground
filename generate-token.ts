import "dotenv/config";
import { createHmac } from "crypto";

const secret = process.env.CENTRIFUGO_HMAC_SECRET ?? "";
if (!secret) {
  console.error("CENTRIFUGO_HMAC_SECRET not set in .env");
  process.exit(1);
}
const sub = process.argv[2] ?? "user123";

function base64url(s: string) {
  return Buffer.from(s).toString("base64url");
}

const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
const ch = process.argv[3] ?? process.env.CENTRIFUGO_CHANNEL ?? "test";
const payload = base64url(JSON.stringify({ sub, channels: [ch] }));
const signature = createHmac("sha256", secret)
  .update(`${header}.${payload}`)
  .digest("base64url");

const jwt = `${header}.${payload}.${signature}`;
console.log(jwt);
