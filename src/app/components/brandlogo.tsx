"use client";

import Image from "next/image";
import Link from "next/link";

export default function BrandLogo({ size = 32 }: { size?: number }) {
  return (
    <Link href="/" className="inline-flex items-center gap-3">
      <Image
        src="/branding/growth-line-logo.svg"
        alt="Growth Line"
        width={size}
        height={size}
        className="rounded-sm"
        priority
      />
      <span className="text-lg font-semibold text-[--color-charcoal-900]">
        Growth Line
      </span>
    </Link>
  );
}
