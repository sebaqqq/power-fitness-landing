"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import { Icon } from "./Icon";

export function AddToCartButton({
  id,
  qty = 1,
  label = "AGREGAR AL CARRO",
  className = "",
}: {
  id: string;
  qty?: number;
  label?: string;
  className?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current);
    },
    [],
  );

  const onClick = () => {
    add(id, qty);
    setAdded(true);
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={onClick}
      className={`btn-sheen flex items-center justify-center gap-2.5 rounded-lg bg-accent px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95 ${className}`}
    >
      <Icon name={added ? "check-circle" : "cart"} size={17} />
      {added ? "AGREGADO" : label}
    </button>
  );
}
