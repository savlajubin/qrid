"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateQrSvg, placeHolderSVG } from "../../../lib/qrEngine";
import { DEFAULT_SIZE } from "../../../lib/constants";
import { decodeBase64 } from "../../../lib/security";

export default function EmbedClient() {
  const searchParams = useSearchParams();
  const [svg, setSvg] = useState("");

  const encodedData = searchParams.get("data");
  const data = encodedData ? decodeBase64(encodedData) : null;
  const fg = searchParams.get("fg") || "000000";
  const bg = searchParams.get("bg") || "ffffff";

  useEffect(() => {
    if (!data) return;

    generateQrSvg(data, DEFAULT_SIZE, {
      fg: `#${fg}`,
      bg: `#${bg}`
    }).then(setSvg);
  }, [data, fg, bg]);

  if (!data) return null;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svg ? svg : placeHolderSVG)}`}
        alt="Generated QR Code"
        style={{
          width: '100%',
          maxWidth: '300px',
          height: 'auto',
          display: 'block'
        }}
        fetchPriority="high"
        decoding="async"
      />
    </div>
  );
}
