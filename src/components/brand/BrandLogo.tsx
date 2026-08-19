import Image from "next/image";
import { BRAND_LOGO } from "@/lib/brand/assets";

const sizeMap = {
  xs: 28,
  sm: 40,
  header: 72,
  md: 72,
  lg: 128,
  hero: 220,
} as const;

type BrandLogoProps = {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
};

export function BrandLogo({
  size = "sm",
  className = "",
  priority = false,
}: BrandLogoProps) {
  const width = sizeMap[size];
  const height = Math.round((width * BRAND_LOGO.height) / BRAND_LOGO.width);

  return (
    <Image
      src={BRAND_LOGO.webp}
      alt={BRAND_LOGO.alt}
      width={width}
      height={height}
      priority={priority}
      className={`brand-logo ${className}`.trim()}
      sizes={`${width}px`}
    />
  );
}
