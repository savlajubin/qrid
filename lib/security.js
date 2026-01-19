export function sanitizeInput(text) {
  if (typeof text !== "string") return "";
  return text.trim().slice(0, 2950); // Max QR data length for lowest EC level
}

export function sanitizeSvg(svg) {
  if (typeof svg !== "string") return "";
  return svg
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/on\w+="[^"]*"/g, "");
}

// Encode: Text -> Base64
export function encodeBase64(str) {
  const bytes = new TextEncoder().encode(str);
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}

// Decode: Base64 -> Text
export function decodeBase64(base64) {
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
  return new TextDecoder().decode(bytes);
}
