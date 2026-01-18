import { sanitizeInput } from "./security";

export const DEFAULT_QR_TEXT = "https://github.com/savlajubin";

export function buildPayload(preset, data) {
  switch (preset) {
    case "url":
      return sanitizeInput(data.url) || DEFAULT_QR_TEXT;

    case "text":
      return sanitizeInput(data.text) || DEFAULT_QR_TEXT;

    case "upi":
      if (!data.upi?.pa) return "";
      return buildUpi(data.upi);

    case "wifi":
      if (!data.wifi?.ssid) return "";
      return buildWifi(data.wifi);

    case "vcard":
      if (!data.vcard?.name) return "";
      return buildVcard(data.vcard);

    default:
      return DEFAULT_QR_TEXT;
  }
}

function buildUpi({ pa, pn, am }) {
  const params = new URLSearchParams({
    pa,
    pn: pn || "",
    am: am || ""
  });
  return `upi://pay?${params.toString()}`;
}

function buildWifi({ ssid, password, security }) {
  return `WIFI:T:${security};S:${ssid};P:${password || ""};;`;
}

function buildVcard({ name, phone, email }) {
  return `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone || ""}
EMAIL:${email || ""}
END:VCARD
`.trim();
}
