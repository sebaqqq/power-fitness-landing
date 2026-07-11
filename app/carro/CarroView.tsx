"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/CartProvider";
import { Icon } from "../components/Icon";
import { clp, getProducto } from "../data/productos";

export function CarroView() {
  const { items, count, subtotal, setQty, remove, clear } = useCart();

  const lineas = items
    .map((item) => {
      const producto = getProducto(item.id);
      return producto ? { ...item, producto } : null;
    })
    .filter((l) => l !== null);

  if (lineas.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface px-8 py-20 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
          <Icon name="cart" size={26} />
        </span>
        <p className="font-heading text-2xl font-extrabold">
          TU CARRO ESTÁ VACÍO.
        </p>
        <p className="max-w-sm text-sm text-muted">
          Explora el equipamiento y agrega los productos que quieras llevar.
        </p>
        <Link
          href="/equipamiento"
          className="btn-sheen mt-2 rounded-lg bg-accent px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
        >
          IR AL EQUIPAMIENTO
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-12 grid items-start gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col gap-4">
        {lineas.map(({ id, qty, producto }) => (
          <article
            key={id}
            className="flex flex-wrap items-center gap-5 rounded-2xl border border-line bg-surface p-5"
          >
            <Link
              href={`/equipamiento/${id}`}
              className="relative h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-surface-2"
            >
              <Image
                src={producto.image}
                alt={producto.imageAlt}
                fill
                sizes="8rem"
                className="object-cover"
              />
            </Link>
            <div className="flex min-w-40 flex-1 flex-col gap-1">
              <span className="text-[11px] font-bold tracking-[0.18em] text-muted-2">
                {producto.categoria.toUpperCase()}
              </span>
              <Link
                href={`/equipamiento/${id}`}
                className="font-semibold leading-snug transition-colors hover:text-accent"
              >
                {producto.name}
              </Link>
              <span className="text-sm text-muted-2">
                {clp(producto.price)} c/u
              </span>
            </div>
            <div className="flex items-center rounded-lg border border-line">
              <button
                aria-label={`Disminuir cantidad de ${producto.name}`}
                onClick={() => setQty(id, qty - 1)}
                className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-foreground"
              >
                <Icon name="minus" size={15} />
              </button>
              <span className="w-8 text-center font-heading text-lg font-bold">
                {qty}
              </span>
              <button
                aria-label={`Aumentar cantidad de ${producto.name}`}
                onClick={() => setQty(id, qty + 1)}
                className="flex h-10 w-10 items-center justify-center text-muted transition-colors hover:text-foreground"
              >
                <Icon name="plus" size={15} />
              </button>
            </div>
            <span className="w-28 text-right font-heading text-2xl font-extrabold">
              {clp(producto.price * qty)}
            </span>
            <button
              aria-label={`Quitar ${producto.name} del carro`}
              onClick={() => remove(id)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-2 transition-colors hover:bg-surface-2 hover:text-foreground"
            >
              <Icon name="trash" size={17} />
            </button>
          </article>
        ))}
        <button
          onClick={clear}
          className="w-fit text-sm font-semibold text-muted-2 transition-colors hover:text-foreground"
        >
          Vaciar carro
        </button>
      </div>

      <aside className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-7 lg:sticky lg:top-28">
        <h2 className="font-heading text-2xl font-extrabold">
          RESUMEN DEL PEDIDO
        </h2>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between text-muted">
            <span>
              Subtotal ({count} {count === 1 ? "producto" : "productos"})
            </span>
            <span className="font-semibold text-foreground">
              {clp(subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-muted">
            <span>Despacho</span>
            <span>Se calcula al pagar</span>
          </div>
        </div>
        <hr className="border-line" />
        <div className="flex items-center justify-between">
          <span className="font-bold tracking-wide">TOTAL</span>
          <span className="font-heading text-4xl font-extrabold">
            {clp(subtotal)}
          </span>
        </div>
        {/* TODO(negocio): integrar checkout (Webpay / transferencia); botón deshabilitado hasta entonces */}
        <button
          disabled
          title="Checkout en integración"
          className="cursor-not-allowed rounded-lg bg-accent/40 px-7 py-4 text-center text-[15px] font-bold tracking-wide text-white/70"
        >
          IR A PAGAR
        </button>
        <p className="text-center text-xs text-muted-2">
          Pago en línea disponible próximamente. Mientras tanto, envíanos tu
          pedido por WhatsApp.
        </p>
        <Link
          href="/equipamiento"
          className="rounded-lg border border-foreground/40 px-7 py-3.5 text-center text-sm font-semibold tracking-wide transition-colors duration-200 hover:border-foreground hover:bg-foreground/5"
        >
          SEGUIR COMPRANDO
        </Link>
      </aside>
    </div>
  );
}
