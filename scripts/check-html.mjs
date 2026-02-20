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

  if (!/<title>[^<]+<\/title>/i.test(content)) {
    console.error(`${page}: missing or empty <title>`);
    hasError = true;
  }

  const canonicalMatch = content.match(
    /<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>|<link[^>]+href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i,
  );
  if (!canonicalMatch) {
    console.error(`${page}: missing <link rel="canonical">`);
    hasError = true;
  } else {
    const canonicalHref = canonicalMatch[1] || canonicalMatch[2];
    if (canonicalHref.endsWith(".html")) {
      console.error(
        `${page}: canonical href ends with .html: ${canonicalHref}`,
      );
      hasError = true;
    }
  }

  if (!/<meta[^>]+property=["']og:title["']/i.test(content)) {
    console.error(`${page}: missing <meta property="og:title">`);
    hasError = true;
  }

  if (!/<meta[^>]+property=["']og:description["']/i.test(content)) {
    console.error(`${page}: missing <meta property="og:description">`);
    hasError = true;
  }

  if (!/<meta[^>]+property=["']og:type["']/i.test(content)) {
    console.error(`${page}: missing <meta property="og:type">`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
}

console.log(`Validated ${pages.length} HTML files.`);
