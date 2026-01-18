import { generateQrSvg } from "./qrEngine";
import { sanitizeSvg } from "./security";
import { DEFAULT_SIZE } from "./constants";

export async function generateQr({ data, colors }) {
  const svg = await generateQrSvg(data, DEFAULT_SIZE, {
    fg: colors?.fg
      ? `#${colors?.fg.replace("#", "")}`
      : "#000000",
    bg: colors?.bg
      ? `#${colors?.bg.replace("#", "")}`
      : "#ffffff"
  });
  return sanitizeSvg(svg);
}
