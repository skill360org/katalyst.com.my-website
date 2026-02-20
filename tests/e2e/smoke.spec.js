import { test, expect } from "@playwright/test";

const pages = [
  "/",
  "/solutions",
  "/contact-us",
  "/why-katalyst",
  "/product-portfolio",
  "/talent-acquisition",
  "/talent-development",
  "/talent-intelligence",
  "/succession-planning-agent",
  "/performance-management-agent",
];

for (const page of pages) {
  test(`${page} — loads and passes smoke checks`, async ({ page: p }) => {
    await p.goto(page);

    const title = await p.title();
    expect(title.trim().length).toBeGreaterThan(0);

    const htmlHrefs = await p.$$eval("a[href]", (links) =>
      links
        .map((a) => a.getAttribute("href"))
        .filter((href) => href && href.endsWith(".html")),
    );
    expect(htmlHrefs).toHaveLength(0);
  });
}
