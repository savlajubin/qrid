import { NextResponse } from "next/server";
import { generateQrSvg } from "../../../lib/qrEngine";
import { sanitizeInput, sanitizeSvg } from "../../../lib/security";
import { qrDesigns } from "../../../lib/qrDesigns";
import { DEFAULT_SIZE } from "../../../lib/constants";

/**
 * GET /api/v1
 * Params:
 *  - data (required)
 *  - design (optional)
 *  - size (optional)
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const rawData = searchParams.get("data");
  const design = searchParams.get("design") || "classic";
  const size = Number(searchParams.get("size")) || DEFAULT_SIZE;

  if (!rawData) {
    return svgError("Missing `data` parameter");
  }

  if (!qrDesigns[design]) {
    return svgError("Invalid design");
  }

  if (size < 100 || size > 1000) {
    return svgError("Invalid size (100–1000)");
  }

  const data = sanitizeInput(rawData);

  try {
    const svg = await generateQrSvg(
      data,
      size,
      qrDesigns[design]
    );

    return new NextResponse(sanitizeSvg(svg), {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400"
      }
    });
  } catch {
    return svgError("Failed to generate QR");
  }
}

/* -----------------------------
   SVG Error Renderer
----------------------------- */

function svgError(message) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
  <rect width="100%" height="100%" fill="#f44336"/>
  <text x="50%" y="50%" fill="#fff" font-size="14"
        text-anchor="middle" dominant-baseline="middle">
    ${message}
  </text>
</svg>
  `.trim();

  return new NextResponse(svg, {
    status: 400,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-store"
    }
  });
}
