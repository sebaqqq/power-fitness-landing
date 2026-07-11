"use client";

import { useState } from "react";
import { AddToCartButton } from "../../components/AddToCartButton";
import { Icon } from "../../components/Icon";

export function DetalleActions({ id }: { id: string }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center rounded-lg border border-line">
        <button
          aria-label="Disminuir cantidad"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex h-12 w-11 items-center justify-center text-muted transition-colors hover:text-foreground disabled:opacity-40"
          disabled={qty <= 1}
        >
          <Icon name="minus" size={16} />
        </button>
        <span
          aria-live="polite"
          className="w-10 text-center font-heading text-xl font-bold"
        >
          {qty}
        </span>
        <button
          aria-label="Aumentar cantidad"
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          className="flex h-12 w-11 items-center justify-center text-muted transition-colors hover:text-foreground"
        >
          <Icon name="plus" size={16} />
        </button>
      </div>
      <AddToCartButton id={id} qty={qty} className="px-8 py-[15px]" />
    </div>
  );
}
