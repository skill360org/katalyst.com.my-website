import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const htmlFiles = readdirSync(resolve(".")).filter((name) =>
  name.endsWith(".html"),
);

const defaultFooterClass = "bg-alice-blue";
const defaultFooterCardClass =
  "bg-white/10 px-6 sm:px-12.5 pt-[50px] sm:pt-16.75 pb-8 sm:pb-[54px]";

const headerTemplate = readFileSync(
  resolve("partials/header.html"),
  "utf8",
).trim();
const footerTemplate = readFileSync(
  resolve("partials/footer.html"),
  "utf8",
).trim();

for (const file of htmlFiles) {
  const filePath = resolve(file);
  let html = readFileSync(filePath, "utf8");

  const hasHeaderPlaceholder = /<div\s+data-site-header\s*><\/div>/.test(html);
  const footerMatch = html.match(
    /<div\s+data-site-footer(?:\s+data-footer-class="([^"]*)")?(?:\s+data-footer-card-class="([^"]*)")?\s*><\/div>/,
  );

  if (!hasHeaderPlaceholder && !footerMatch) {
    continue;
  }

  if (hasHeaderPlaceholder) {
    html = html.replace(/<div\s+data-site-header\s*><\/div>/g, headerTemplate);
  }

  if (footerMatch) {
    const footerClass = footerMatch[1] || defaultFooterClass;
    const footerCardClass = footerMatch[2] || defaultFooterCardClass;
    const footer = footerTemplate
      .replace("{{FOOTER_CLASS}}", footerClass)
      .replace("{{FOOTER_CARD_CLASS}}", footerCardClass);

    html = html.replace(footerMatch[0], footer);
  }

  writeFileSync(filePath, html);
  console.log(`Synced layout for ${file}`);
}
