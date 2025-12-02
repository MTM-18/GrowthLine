"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  wide?: boolean;
};

export default function Modal({ open, onClose, children, wide }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // lock scroll
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />
      {/* dialog */}
      <div className="absolute inset-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className={`mx-auto ${wide ? "max-w-3xl" : "max-w-2xl"}`}>
          <div className="bg-white rounded-2xl shadow-2xl ring-1 ring-black/5 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
