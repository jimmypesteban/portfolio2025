export function resolveImage(url) {
  if (!url || url.startsWith("http")) return url;
  if (/\.(mp4|webm|mov)$/i.test(url)) return `/images${url}`;
  return `/images${url.replace(/\.(jpg|jpeg|png)$/i, ".webp")}`;
}
