import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "./Icon";

const menu: [string, string][] = [
  ["Inicio", "/#inicio"],
  ["Sedes", "/sedes"],
  ["Planes", "/#planes"],
  ["Convenios", "/#convenios"],
  ["Equipamiento", "/equipamiento"],
  // TODO(negocio): crear páginas de Política de Privacidad y Términos y Condiciones
  ["Política de Privacidad", "#"],
  ["Términos y Condiciones", "#"],
];

const contacto: [string, string][] = [
  ["Atención al cliente", "https://wa.me/56900000000"],
  ["Corporativo", "/#convenios"],
  // TODO(negocio): definir canal de reclutamiento (correo o formulario)
  ["Reclutamiento", "#"],
];

// TODO(negocio): confirmar URLs oficiales de redes sociales
const redes: [IconName, string, string][] = [
  ["whatsapp", "Escríbenos por WhatsApp", "https://wa.me/56900000000"],
  ["instagram", "Síguenos en Instagram", "#"],
  ["facebook", "Síguenos en Facebook", "#"],
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/#inicio" aria-label="Power Fitness Chile — Inicio" className="w-fit">
              <Image
                src="/logo.png"
                alt="Power Fitness Chile"
                width={132}
                height={56}
                className="h-14 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              Especialistas en entrenamiento de alta exigencia. Red de 14 sedes
              en Chile con tecnología de vanguardia.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-bold tracking-wider">
              CONTACTO
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              {contacto.map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="transition-colors hover:text-foreground"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-bold tracking-wider">
              MENÚ
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              {menu.map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-bold tracking-wider">
              SÍGUENOS
            </h3>
            <div className="flex gap-3">
              {redes.map(([icon, label, href]) => (
                <a
                  key={icon}
                  href={href}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-muted transition duration-200 hover:scale-110 hover:border-accent/60 hover:text-foreground"
                >
                  <Icon name={icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[13px] text-muted-2">
          <p>© 2026 Power Fitness Chile. Todos los derechos reservados.</p>
          <p>Tu entrenamiento, sin límites.</p>
        </div>
      </div>
    </footer>
  );
}
