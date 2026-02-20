import { describe, it, expect } from "vitest";
import { normalizePath, isActivePath } from "./nav-utils.js";

describe("normalizePath", () => {
  it('returns "/" for "/"', () => {
    expect(normalizePath("/")).toBe("/");
  });

  it('returns "/solutions" for "/solutions"', () => {
    expect(normalizePath("/solutions")).toBe("/solutions");
  });

  it('strips .html extension', () => {
    expect(normalizePath("/solutions.html")).toBe("/solutions");
  });

  it('strips trailing slash', () => {
    expect(normalizePath("/solutions/")).toBe("/solutions");
  });

  it('strips query string', () => {
    expect(normalizePath("/solutions?foo=bar")).toBe("/solutions");
  });

  it('strips hash fragment', () => {
    expect(normalizePath("/solutions#anchor")).toBe("/solutions");
  });

  it('returns "/" for empty string', () => {
    expect(normalizePath("")).toBe("/");
  });

  it('returns "/" for null', () => {
    expect(normalizePath(null)).toBe("/");
  });

  it('returns "/" for undefined', () => {
    expect(normalizePath(undefined)).toBe("/");
  });
});

describe("isActivePath", () => {
  it("returns true when href matches current path", () => {
    expect(isActivePath("/solutions", "/solutions")).toBe(true);
  });

  it("returns true when href with .html matches current path", () => {
    expect(isActivePath("/solutions.html", "/solutions")).toBe(true);
  });

  it("returns false when href does not match current path", () => {
    expect(isActivePath("/solutions", "/contact-us")).toBe(false);
  });

  it('returns true for "/" matching "/"', () => {
    expect(isActivePath("/", "/")).toBe(true);
  });
});
