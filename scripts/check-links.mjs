import fs from "node:fs/promises";

const pages = (await fs.readdir(".")).filter((name) => name.endsWith(".html"));

// Build valid slug set from filenames
const validSlugs = new Set(
  pages.map((name) => {
    const base = name.replace(/\.html$/, "");
    return base === "index" ? "/" : `/${base}`;
  }),
);

let hasError = false;

for (const page of pages) {
  const content = await fs.readFile(page, "utf8");
  const hrefMatches = [...content.matchAll(/href=["']([^"']+)["']/g)];

  for (const match of hrefMatches) {
    const href = match[1];
    // Only check site-relative links (start with /)
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    // Strip query strings and hash fragments
    const slug = href.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    if (!validSlugs.has(slug)) {
      console.error(`${page}: broken internal link: ${href}`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log(
  `Checked internal links across ${pages.length} HTML files. All valid.`,
);
