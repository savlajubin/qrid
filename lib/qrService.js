import { generateQrSvg } from "./qrEngine";
import { sanitizeSvg } from "./security";
import { DEFAULT_SIZE } from "./constants";
import { qrDesigns } from "./qrDesigns";

export async function generateQr({ data, design }) {
  const svg = await generateQrSvg(
    data,
    DEFAULT_SIZE,
    qrDesigns[design]
  );
  return sanitizeSvg(svg);
}
