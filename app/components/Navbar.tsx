"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Sedes", href: "#sedes" },
  { label: "Planes", href: "#planes" },
  { label: "Convenios", href: "#convenios" },
  { label: "Equipamiento", href: "#equipamiento" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-line bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 lg:px-10 ${
          scrolled ? "py-3" : "py-5"
        }`}
      >
        <a href="#inicio" aria-label="Power Fitness Chile — Inicio">
          <Image
            src="/logo.png"
            alt="Power Fitness Chile"
            width={132}
            height={56}
            priority
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-11" : "h-14"
            }`}
          />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[15px] font-medium text-muted transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <button
            aria-label="Mi cuenta"
            className="hidden text-muted transition-colors hover:text-foreground sm:block"
          >
            <Icon name="user" size={19} />
          </button>
          <button
            aria-label="Carrito de compras"
            className="hidden text-muted transition-colors hover:text-foreground sm:block"
          >
            <Icon name="cart" size={19} />
          </button>
          <a
            href="#planes"
            className="btn-sheen hidden rounded-lg bg-accent px-5 py-2.5 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95 sm:block"
          >
            ¡INSCRÍBETE AHORA!
          </a>
          <button
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="text-foreground lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} size={24} />
          </button>
        </div>
      </nav>

      <div
        className={`grid overflow-hidden border-line bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden ${
          open ? "grid-rows-[1fr] border-b" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 font-medium text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#planes"
                onClick={() => setOpen(false)}
                className="mt-2 block rounded-lg bg-accent px-3 py-2.5 text-center font-bold text-white"
              >
                ¡INSCRÍBETE AHORA!
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
