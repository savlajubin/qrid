import { Suspense } from "react";
import EmbedClient from "./embedClient";

export default function EmbedPage() {
  return (
    <Suspense fallback={null}>
      <EmbedClient />
    </Suspense>
  );
}
