import QRCode from "qrcode";

export async function generateQrSvg(
  data,
  size,
  options = {}
) {
  const {
    fg = "#000000",
    bg = "#ffffff",
    margin = 1
  } = options;

  return QRCode.toString(data, {
    type: "svg",
    width: size,
    margin,
    color: {
      dark: fg,
      light: bg
    }
  });
}
