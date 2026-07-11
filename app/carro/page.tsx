import type { Metadata } from "next";
import { FloatingWidgets } from "../components/FloatingWidgets";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { CarroView } from "./CarroView";

export const metadata: Metadata = {
  title: "Carro de compras — Power Fitness Chile",
  description:
    "Revisa los productos de equipamiento que agregaste a tu carro de compras Power Fitness.",
};

export default function CarroPage() {
  return (
    <div className="flex-1">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-6 pb-24 pt-36 lg:px-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="h-1 w-9 bg-accent" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted">
              TIENDA POWER FITNESS
            </span>
          </div>
          <h1 className="font-heading text-5xl font-extrabold leading-none sm:text-6xl">
            TU CARRO.
          </h1>
        </div>
        <CarroView />
      </main>
      <Footer />
      <FloatingWidgets />
    </div>
  );
}
