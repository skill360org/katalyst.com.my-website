export const normalizePath = (path) => {
  if (!path) return "/";
  const cleanPath = path.split("?")[0].split("#")[0];
  const withoutHtml = cleanPath.replace(/\.html$/, "");
  return withoutHtml.replace(/\/$/, "") || "/";
};

export const isActivePath = (href, currentPath) =>
  normalizePath(href) === currentPath;
