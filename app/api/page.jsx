"use client";

import { useEffect, useRef } from "react";
import { generateQrSvg } from "../../lib/qrEngine";
import { qrDesigns } from "../../lib/qrDesigns";
import { DEFAULT_SIZE } from "../../lib/constants";

export default function ApiPage() {
  const ref = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    const size = Number(params.get("size") || DEFAULT_SIZE);
    const designKey = params.get("design") || "classic";

    if (!data || !ref.current) return;

    const design = qrDesigns[designKey] || qrDesigns.classic;

    generateQrSvg(data, size, design).then(svg => {
      ref.current.innerHTML = svg;
    });
  }, []);

  return <div ref={ref} />;
}
