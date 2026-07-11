"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { getProducto } from "../data/productos";

export interface CartItem {
  id: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "pf-carro";
const MAX_QTY = 99;

const clampQty = (qty: number) =>
  Math.min(MAX_QTY, Math.max(1, Math.round(qty)));

// Store module-level sincronizado con localStorage vía useSyncExternalStore:
// en SSR/hidratación el carro parte vacío y se rellena tras el primer snapshot
// del cliente, sin mismatch de hidratación.
const EMPTY: CartItem[] = [];
let cache: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function loadFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed
      .filter(
        (i): i is CartItem =>
          typeof i === "object" &&
          i !== null &&
          typeof (i as CartItem).id === "string" &&
          typeof (i as CartItem).qty === "number" &&
          getProducto((i as CartItem).id) !== undefined,
      )
      .map((i) => ({ id: i.id, qty: clampQty(i.qty) }));
  } catch {
    // storage corrupto o bloqueado: se parte con carro vacío
    return EMPTY;
  }
}

function getSnapshot(): CartItem[] {
  if (!loaded) {
    cache = loadFromStorage();
    loaded = true;
  }
  return cache;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function setCart(next: CartItem[]) {
  cache = next;
  loaded = true;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage lleno o bloqueado: el carro sigue funcionando en memoria
  }
  listeners.forEach((l) => l());
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const add = useCallback((id: string, qty = 1) => {
    if (!getProducto(id)) return;
    const current = getSnapshot();
    const existing = current.find((i) => i.id === id);
    setCart(
      existing
        ? current.map((i) =>
            i.id === id ? { ...i, qty: clampQty(i.qty + qty) } : i,
          )
        : [...current, { id, qty: clampQty(qty) }],
    );
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const current = getSnapshot();
    setCart(
      qty < 1
        ? current.filter((i) => i.id !== id)
        : current.map((i) => (i.id === id ? { ...i, qty: clampQty(qty) } : i)),
    );
  }, []);

  const remove = useCallback((id: string) => {
    setCart(getSnapshot().filter((i) => i.id !== id));
  }, []);

  const clear = useCallback(() => setCart([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce(
      (sum, i) => sum + (getProducto(i.id)?.price ?? 0) * i.qty,
      0,
    );
    return { items, count, subtotal, add, setQty, remove, clear };
  }, [items, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de <CartProvider>");
  }
  return ctx;
}
