"use client";

import type { ComponentProps } from "react";

type Props = ComponentProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md,0.75rem)] " +
    "transition-colors select-none";

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  }[size];

  const variants = {
    primary:
      "bg-[var(--color-brand-600,#0a7d57)] text-white " +
      "hover:bg-[var(--color-brand-500,#0e9f6e)] " +
      "active:bg-[var(--color-brand-700,#0a6447)] " +
      "border border-[color:color-mix(in_oklab,var(--color-brand-700,#0a6447)_20%,transparent)] " +
      "shadow-[var(--shadow-soft,0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.06))]",
    secondary:
      "bg-white text-[var(--color-charcoal-900,#0f1716)] " +
      "border border-[var(--color-border,#e6ecea)] " +
      "hover:bg-[var(--color-surface,#f6f8f7)]",
    ghost:
      "bg-transparent text-[var(--color-brand-600,#0a7d57)] " +
      "hover:bg-[color:color-mix(in_oklab,var(--color-brand-600,#0a7d57)_10%,transparent)]",
  }[variant];

  return (
    <button
      className={[base, sizes, variants, className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
