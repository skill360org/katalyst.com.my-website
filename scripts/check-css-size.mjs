import { gzipSync } from "node:zlib";
import { readFileSync } from "node:fs";

const cssPath = new URL("../assets/css/output.css", import.meta.url);
const cssContent = readFileSync(cssPath, "utf8");

const rawBytes = Buffer.byteLength(cssContent);
const gzipBytes = gzipSync(cssContent).byteLength;
const MAX_GZIP_BYTES = 30 * 1024;

const toKb = (bytes) => (bytes / 1024).toFixed(2);

console.log(
  `CSS bundle size: ${toKb(rawBytes)} KB (raw), ${toKb(gzipBytes)} KB (gzip)`,
);

if (gzipBytes > MAX_GZIP_BYTES) {
  console.error(
    `CSS bundle exceeds gzip budget of ${toKb(MAX_GZIP_BYTES)} KB. Please remove unused utilities or custom layers.`,
  );
  process.exit(1);
}
