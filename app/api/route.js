import { NextResponse } from "next/server";
import { generateQrSvg } from "../../lib/qrEngine";
import { sanitizeInput, sanitizeSvg } from "../../lib/security";
import { DEFAULT_SIZE } from "../../lib/constants";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const rawData = searchParams.get("data");
  const size = Number(searchParams.get("size")) || DEFAULT_SIZE;

  const fg = searchParams.get("fg")
    ? `#${searchParams.get("fg")}`
    : "#000000";

  const bg = searchParams.get("bg")
    ? `#${searchParams.get("bg")}`
    : "#ffffff";

  if (!rawData) {
    return svgError("Missing data");
  }

  if (!isValidHex(fg) || !isValidHex(bg)) {
    return svgError("Invalid color value");
  }

  const data = sanitizeInput(rawData);

  try {
    const svg = await generateQrSvg(data, size, {
      fg,
      bg
    });

    return new NextResponse(sanitizeSvg(svg), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch {
    return svgError("QR generation failed");
  }
}

/* -----------------------------
   Helpers
----------------------------- */

function isValidHex(color) {
  return /^#[0-9a-fA-F]{6}$/.test(color);
}

function svgError(message) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <rect width="100%" height="100%" fill="#d32f2f"/>
  <text x="50%" y="50%" fill="#fff" font-size="14"
        text-anchor="middle" dominant-baseline="middle">
    ${message}
  </text>
</svg>
  `.trim();

  return new NextResponse(svg, {
    status: 400,
    headers: {
      "Content-Type": "image/svg+xml"
    }
  });
}
