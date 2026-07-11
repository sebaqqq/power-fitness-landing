import type { Metadata } from "next";
import { FloatingWidgets } from "../components/FloatingWidgets";
import { Navbar } from "../components/Navbar";
import { SedesExplorer } from "./SedesExplorer";

export const metadata: Metadata = {
  title: "Sedes y Horarios — Power Fitness Chile",
  description:
    "Encuentra tu gimnasio Power Fitness más cercano: direcciones, horarios de atención y mapa de las 20 sedes en Chile.",
};

export default function SedesPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-36 lg:px-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-1 w-9 bg-accent" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted">
              NUESTRAS SEDES
            </span>
          </div>
          <h1 className="font-heading text-5xl font-extrabold leading-none sm:text-6xl">
            SEDES Y HORARIOS.
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-muted">
            Elige tu sede para ver su dirección, horarios de atención y cómo
            llegar.
          </p>
        </div>

        <div className="mt-10">
          <SedesExplorer />
        </div>
      </main>
      <FloatingWidgets />
    </div>
  );
}
