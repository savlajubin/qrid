import QRCode from "qrcode";

export async function generateQrSvg(text, size, design) {
  return QRCode.toString(text, {
    type: "svg",
    width: size,
    margin: design.margin,
    color: {
      dark: design.color,
      light: design.background
    }
  });
}
