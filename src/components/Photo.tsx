import { useState } from "react";
import type { BusinessImage } from "../types/business";
export function Photo({
  image,
  className = "",
  eager = false,
  fallbackLabel = "Photo unavailable",
}: {
  image?: BusinessImage;
  className?: string;
  eager?: boolean;
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);
  return image && !failed ? (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width="1200"
      height="900"
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  ) : (
    <div
      className={`photo-fallback ${className}`}
      role="img"
      aria-label={fallbackLabel}
    >
      <span>☕</span>
      <small>A moment for coffee</small>
    </div>
  );
}

