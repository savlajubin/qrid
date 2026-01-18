"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { generateQrSvg } from "../../../lib/qrEngine";
import { DEFAULT_SIZE } from "../../../lib/constants";

export default function EmbedPage() {
  const searchParams = useSearchParams();
  const [svg, setSvg] = useState("");

  const data = searchParams.get("data");
  const fg = searchParams.get("fg") || "000000";
  const bg = searchParams.get("bg") || "ffffff";

  useEffect(() => {
    if (!data) return;

    generateQrSvg(data, DEFAULT_SIZE, {
      fg: `#${fg}`,
      bg: `#${bg}`
    }).then(setSvg);
  }, [data, fg, bg]);

  if (!data) {
    return null;
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
