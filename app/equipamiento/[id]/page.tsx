import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FloatingWidgets } from "../../components/FloatingWidgets";
import { Footer } from "../../components/Footer";
import { Icon } from "../../components/Icon";
import { Navbar } from "../../components/Navbar";
import {
  beneficiosCompra,
  clp,
  cuotas12,
  getProducto,
  productos,
} from "../../data/productos";
import { DetalleActions } from "./DetalleActions";

export function generateStaticParams() {
  return productos.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const producto = getProducto(id);
  if (!producto) return { title: "Producto no encontrado — Power Fitness Chile" };
  return {
    title: `${producto.name} — Power Fitness Chile`,
    description: producto.descripcion,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = getProducto(id);
  if (!producto) notFound();

  const relacionados = productos
    .filter((p) => p.id !== producto.id)
    .sort((a, b) =>
      a.categoria === producto.categoria && b.categoria !== producto.categoria
        ? -1
        : b.categoria === producto.categoria && a.categoria !== producto.categoria
          ? 1
          : 0,
    )
    .slice(0, 3);

  return (
    <div className="flex-1">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-36 lg:px-10">
        <Link
          href="/equipamiento"
          className="flex w-fit items-center gap-2 text-sm font-semibold tracking-wide text-muted transition-colors hover:text-foreground"
        >
          <Icon name="arrow-left" size={16} />
          VOLVER AL EQUIPAMIENTO
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-surface-2">
            <Image
              src={producto.image}
              alt={producto.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40rem, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.18em] text-muted-2">
                {producto.categoria.toUpperCase()}
              </span>
              <h1 className="font-heading text-4xl font-extrabold leading-none sm:text-5xl">
                {producto.name.toUpperCase()}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3.5">
              <span className="font-heading text-5xl font-extrabold leading-none">
                {clp(producto.price)}
              </span>
              <span className="text-sm text-muted-2">
                {cuotas12(producto.price)}
              </span>
            </div>

            <p className="max-w-lg leading-relaxed text-muted">
              {producto.descripcion}
            </p>

            <hr className="border-line" />

            <ul className="flex flex-col gap-3">
              {producto.specs.map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-sm text-muted">
                  <Icon
                    name="check-circle"
                    size={17}
                    className="shrink-0 text-accent"
                  />
                  {spec}
                </li>
              ))}
            </ul>

            <DetalleActions id={producto.id} />

            <div className="flex flex-col gap-2.5 rounded-xl border border-line bg-surface px-5 py-4 text-sm text-muted">
              <span className="flex items-center gap-2.5">
                <Icon name="truck" size={17} className="shrink-0 text-accent" />
                Despacho a todo Chile, calculado al pagar
              </span>
              <span className="flex items-center gap-2.5">
                <Icon name="map-pin" size={17} className="shrink-0 text-accent" />
                Retiro gratis en tu sede más cercana
              </span>
              <span className="flex items-center gap-2.5">
                <Icon name="shield" size={17} className="shrink-0 text-accent" />
                {beneficiosCompra[2].title} · {beneficiosCompra[2].text}
              </span>
            </div>
          </div>
        </div>

        <section aria-label="Productos relacionados" className="mt-20">
          <div className="flex items-center gap-3">
            <span className="h-1 w-6 bg-accent" />
            <h2 className="font-heading text-3xl font-extrabold leading-none">
              TAMBIÉN TE PUEDE SERVIR.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relacionados.map((p) => (
              <Link
                key={p.id}
                href={`/equipamiento/${p.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_rgba(255,46,196,0.35)]"
              >
                <div className="relative h-44 overflow-hidden bg-surface-2">
                  <Image
                    src={p.image}
                    alt={p.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-5">
                  <span className="text-[11px] font-bold tracking-[0.18em] text-muted-2">
                    {p.categoria.toUpperCase()}
                  </span>
                  <h3 className="text-[16px] font-semibold leading-snug">
                    {p.name}
                  </h3>
                  <span className="font-heading text-xl font-extrabold">
                    {clp(p.price)}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
