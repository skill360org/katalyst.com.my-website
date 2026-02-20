import fs from "node:fs/promises";

const pages = (await fs.readdir(".")).filter((name) => name.endsWith(".html"));
let hasError = false;

for (const page of pages) {
  const content = await fs.readFile(page, "utf8");

  if (!/<meta\s+name=["']description["']/i.test(content)) {
    console.error(`${page}: missing meta description`);
    hasError = true;
  }

  const htmlHrefMatches = [...content.matchAll(/href=["']([^"']+\.html)["']/g)];
  if (htmlHrefMatches.length > 0) {
    console.error(
      `${page}: contains .html href(s): ${htmlHrefMatches.map((match) => match[1]).join(", ")}`,
    );
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`Validated ${pages.length} HTML files.`);
