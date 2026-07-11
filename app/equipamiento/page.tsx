import type { Metadata } from "next";
import Image from "next/image";
import { FloatingWidgets } from "../components/FloatingWidgets";
import { Icon } from "../components/Icon";
import { Navbar } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import { beneficiosCompra, clp, destacado } from "../data/productos";
import { CatalogoExplorer } from "./CatalogoExplorer";

export const metadata: Metadata = {
  title: "Equipamiento — Power Fitness Chile",
  description:
    "Máquinas, fuerza y accesorios de nivel profesional. Las mismas líneas que entrenas en nuestras sedes, con despacho a todo Chile y retiro en sede.",
};

export default function EquipamientoPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-36 lg:px-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-1 w-9 bg-accent" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted">
              TIENDA OFICIAL · DESPACHO A TODO CHILE
            </span>
          </div>
          <h1 className="font-heading text-5xl font-extrabold leading-none sm:text-6xl">
            EQUIPAMIENTO PROFESIONAL.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Las mismas máquinas y accesorios que entrenas en nuestras sedes,
            ahora para tu casa o tu empresa.
          </p>
        </div>

        {/* Destacado del mes */}
        <Reveal className="mt-12">
          <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 p-10 lg:p-14">
              <span className="w-fit rounded-full bg-accent px-3.5 py-1.5 text-xs font-bold tracking-wider text-white">
                DESTACADO DEL MES
              </span>
              <div className="flex flex-col gap-3">
                <h2 className="font-heading text-4xl font-extrabold leading-none sm:text-5xl">
                  {destacado.name}
                </h2>
                <p className="max-w-md leading-relaxed text-muted">
                  {destacado.descripcion}
                </p>
              </div>
              <ul className="flex flex-col gap-3">
                {destacado.beneficios.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-muted">
                    <Icon
                      name="check-circle"
                      size={17}
                      className="shrink-0 text-accent"
                    />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-3.5">
                <span className="font-heading text-5xl font-extrabold leading-none">
                  {clp(destacado.price)}
                </span>
                <span className="text-sm text-muted-2">{destacado.cuotas}</span>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-sheen flex items-center gap-2.5 rounded-lg bg-accent px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95">
                  <Icon name="cart" size={17} />
                  AGREGAR AL CARRO
                </button>
                <button className="rounded-lg border border-foreground/40 px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:border-foreground hover:bg-foreground/5">
                  VER DETALLE
                </button>
              </div>
            </div>
            <div className="group relative min-h-72 overflow-hidden">
              <Image
                src={destacado.image}
                alt={destacado.imageAlt}
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>

        {/* Catálogo con filtros */}
        <div className="mt-16">
          <CatalogoExplorer />
        </div>

        {/* Beneficios de compra */}
        <Reveal className="mt-16">
          <div className="grid gap-8 rounded-2xl border border-line bg-surface px-9 py-7 sm:grid-cols-2 lg:grid-cols-4">
            {beneficiosCompra.map((b) => (
              <div key={b.title} className="flex items-center gap-3.5">
                <Icon name={b.icon} size={26} className="shrink-0 text-accent" />
                <span className="flex flex-col gap-0.5">
                  <span className="text-[15px] font-semibold">{b.title}</span>
                  <span className="text-[13px] text-muted">{b.text}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </main>
      <FloatingWidgets />
    </div>
  );
}
