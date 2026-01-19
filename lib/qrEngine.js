import QRCode from "qrcode";
import { DEFAULT_SIZE } from "./constants";

function getErrorCorrectionLevel(length) {
  if (length <= 800) return "H";
  if (length <= 1300) return "Q";
  if (length <= 2000) return "M";
  if (length <= 2950) return "L";
  return "null";
}

export async function generateQrSvg(
  data,
  size = DEFAULT_SIZE,
  options = {}
) {
  const {
    fg = "#000000",
    bg = "#ffffff",
    margin = 1
  } = options;

  const ecLevel = getErrorCorrectionLevel(data.length);

  if (!ecLevel) {
    throw new Error("QR data exceeds maximum capacity");
  }

  return QRCode.toString(data, {
    type: "svg",
    width: size,
    margin,
    errorCorrectionLevel: ecLevel,
    color: {
      dark: fg,
      light: bg
    }
  });
}

export const placeHolderSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${DEFAULT_SIZE}" height="${DEFAULT_SIZE}" viewBox="0 0 ${DEFAULT_SIZE} ${DEFAULT_SIZE}"><rect width="100%" height="100%" fill="#ffffff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#cccccc" font-size="20">No Data</text></svg>`;
