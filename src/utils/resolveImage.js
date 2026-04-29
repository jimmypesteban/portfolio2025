export function resolveImage(url) {
  if (!url || url.startsWith("http")) return url;
  return `/images${url.replace(/\.(jpg|jpeg|png)$/i, ".webp")}`;
}
