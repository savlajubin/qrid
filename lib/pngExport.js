export const downloadSvg = (svgString, fileName = "qrido.svg") => {
  const blob = new Blob([svgString], {
    type: "image/svg+xml"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Converts and Downloads an SVG string to a PNG image and triggers a download.
 * @param {string} svgString - The raw SVG content.
 * @param {string} fileName - The name of the file to be saved.
 */
export const downloadPngFromSvg = (svgString, fileName = "qrido.png") => {
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8"
  });

  const url = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(blob => {
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = fileName;
      a.click();

      URL.revokeObjectURL(pngUrl);
    });

    URL.revokeObjectURL(url);
  };

  img.src = url;
}


/**
 * Converts and Downloads an SVG string to a JPG image and triggers a download.
 * @param {string} svgString - The raw SVG content.
 * @param {string} fileName - The name of the file to be saved.
 */
export const downloadJpgFromSvg = (svgString, fileName = "qrido.jpg") => {
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8"
  });

  const url = URL.createObjectURL(svgBlob);
  const img = new Image();

  img.onload = () => {
    const canvas = document.createElement("canvas");
    
    // Set canvas dimensions to match the SVG
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");

    // 1. MUST FILL WHITE: JPG does not support transparency. 
    // Without this, the QR code background would turn black and be unscannable.
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the QR code SVG on top of the white background
    ctx.drawImage(img, 0, 0);

    // 3. Export as JPEG with high quality (1.0)
    canvas.toBlob((blob) => {
      if (!blob) return;
      const jpgUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = jpgUrl;
      a.download = fileName.endsWith(".jpg") ? fileName : `${fileName}.jpg`;
      a.click();

      // Clean up the generated JPG URL
      URL.revokeObjectURL(jpgUrl);
    }, "image/jpeg", 1.0);

    // Clean up the initial SVG URL
    URL.revokeObjectURL(url);
  };

  img.src = url;
};