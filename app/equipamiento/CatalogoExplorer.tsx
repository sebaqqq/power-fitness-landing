"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "../components/Icon";
import {
  categorias,
  clp,
  productos,
  type CategoriaProducto,
} from "../data/productos";

type Filtro = "Todo" | CategoriaProducto;

export function CatalogoExplorer() {
  const [filtro, setFiltro] = useState<Filtro>("Todo");

  const visibles =
    filtro === "Todo"
      ? productos
      : productos.filter((p) => p.categoria === filtro);

  return (
    <section aria-label="Catálogo de equipamiento">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-1 w-6 bg-accent" />
            <h2 className="font-heading text-4xl font-extrabold leading-none">
              CATÁLOGO.
            </h2>
          </div>
        </div>
        <a
          href="#"
          className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.12em] text-accent transition-opacity hover:opacity-80"
        >
          VER TODO
          <Icon name="arrow-right" size={15} />
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5" role="group" aria-label="Filtrar por categoría">
        {(["Todo", ...categorias] as Filtro[]).map((cat) => {
          const active = filtro === cat;
          return (
            <button
              key={cat}
              onClick={() => setFiltro(cat)}
              aria-pressed={active}
              className={`rounded-full border px-[18px] py-2 text-[13px] font-semibold tracking-wider transition-colors duration-200 ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-muted hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          );
        })}
      </div>

      {visibles.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-8 py-16 text-center">
          <Icon name="timer" size={28} className="text-accent" />
          <p className="font-semibold">
            Pronto sumaremos productos de {filtro}.
          </p>
          <p className="text-sm text-muted">
            Escríbenos y te avisamos cuando estén disponibles.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_rgba(255,46,196,0.35)]"
            >
              <div className="relative h-52 overflow-hidden bg-surface-2">
                <Image
                  src={p.image}
                  alt={p.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2.5 p-5">
                <span className="text-[11px] font-bold tracking-[0.18em] text-muted-2">
                  {p.categoria.toUpperCase()}
                </span>
                <h3 className="text-[17px] font-semibold leading-snug">
                  {p.name}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <span className="font-heading text-2xl font-extrabold">
                    {clp(p.price)}
                  </span>
                  <button
                    aria-label={`Agregar ${p.name} al carro`}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white transition-transform duration-200 hover:scale-110 active:scale-95"
                  >
                    <Icon name="cart" size={17} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
