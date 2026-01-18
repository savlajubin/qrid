export const BASE_PATH =
  typeof window !== "undefined" &&
  window.__NEXT_DATA__?.assetPrefix
    ? window.__NEXT_DATA__.assetPrefix.replace(/\/$/, "")
    : "";
