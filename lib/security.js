export function sanitizeInput(text) {
  if (typeof text !== "string") return "";
  return text.trim().slice(0, 2048);
}

export function sanitizeSvg(svg) {
  if (typeof svg !== "string") return "";
  return svg
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/g, "");
}
