import type { ComponentProps, ReactNode } from "react";

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={[
        "bg-[var(--color-panel,#ffffff)]",
        "border border-[var(--color-border,#e6ecea)]",
        "rounded-[var(--radius-lg,1.25rem)]",
        "shadow-[var(--shadow-soft,0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.06))]",
        "p-5",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div className={["mb-3", className].filter(Boolean).join(" ")} {...props} />;
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={[
        "text-lg font-semibold",
        "text-[var(--color-charcoal-900,#0f1716)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CardSubtitle({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={[
        "text-sm",
        "text-[var(--color-charcoal-500,#4a5a59)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div className={className} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div className={["mt-4", className].filter(Boolean).join(" ")} {...props} />;
}
