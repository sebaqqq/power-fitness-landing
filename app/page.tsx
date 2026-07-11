import Image from "next/image";
import { Counter } from "./components/Counter";
import { FloatingWidgets } from "./components/FloatingWidgets";
import { Icon, type IconName } from "./components/Icon";
import { Navbar } from "./components/Navbar";
import { Reveal } from "./components/Reveal";
import { SedesMap } from "./components/SedesMap";
import { sedesEspera, sedesPreventa } from "./data/sedes";

const servicios: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "dumbbell",
    title: "ALTA EXIGENCIA",
    text: "Programas de entrenamiento intensos, diseñados para lograr resultados reales y medibles.",
  },
  {
    icon: "activity",
    title: "TECNOLOGÍA DE VANGUARDIA",
    text: "Equipamiento de última generación en todas nuestras sedes.",
  },
  {
    icon: "map-pin",
    title: "RED DE 14 SEDES",
    text: "Entrena en el gimnasio Power Fitness más cercano, donde estés.",
  },
  {
    icon: "briefcase",
    title: "CONVENIOS CORPORATIVOS",
    text: "Beneficios exclusivos para empresas y sus colaboradores.",
  },
];

// TODO(negocio): validar beneficios de cada plan contra condiciones comerciales vigentes
const planes = [
  {
    name: "PLAN FULL ANUAL",
    badge: "MEJOR PRECIO",
    featured: true,
    price: "$15.990",
    suffix: "/ mes",
    detail: "Total anual $191.880 · Activación $10.000",
    benefits: [
      "Acceso a las 14 sedes",
      "Vigencia anual, 12 meses",
      "Horario libre todos los días",
    ],
  },
  {
    name: "PLAN PREVENTA",
    badge: "PREVENTA",
    featured: false,
    price: "$129.990",
    suffix: "pago único",
    detail: "Sede Reñaca · Activación $10.000",
    benefits: [
      "Precio preferente de preventa",
      "Sede Reñaca",
      "Cupos limitados",
    ],
  },
];

function SectionHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="h-1 w-9 bg-accent" />
          <span className="text-sm font-semibold tracking-[0.2em] text-muted">
            {eyebrow}
          </span>
        </div>
        <h2 className="font-heading text-4xl font-extrabold leading-none sm:text-5xl">
          {title}
        </h2>
      </div>
      {right}
    </Reveal>
  );
}

export default function Home() {
  return (
    <div className="flex-1">
      <Navbar />

      {/* Hero */}
      <section id="inicio" className="relative flex min-h-svh items-center overflow-hidden">
        <div className="hero-zoom absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="Atleta entrenando con mancuernas en un gimnasio Power Fitness"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_25%]"
          />
        </div>
        <div className="absolute inset-0 bg-background/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-40 lg:px-10">
          <div className="anim-fade-up flex items-center gap-3" style={{ animationDelay: "100ms" }}>
            <span className="h-1 w-9 bg-accent" />
            <span className="text-sm font-semibold tracking-[0.2em] text-muted">
              GIMNASIOS DE ALTA EXIGENCIA · CHILE
            </span>
          </div>
          <h1
            className="anim-fade-up mt-7 font-heading text-5xl font-extrabold leading-[0.95] sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "250ms" }}
          >
            TU ENTRENAMIENTO,
            <br />
            SIN LÍMITES.
          </h1>
          <p
            className="anim-fade-up mt-7 max-w-xl text-lg leading-relaxed text-muted"
            style={{ animationDelay: "400ms" }}
          >
            14 sedes a lo largo de Chile. Un solo poder. Entrena con
            equipamiento de vanguardia y programas diseñados para llevarte al
            máximo.
          </p>
          <div
            className="anim-fade-up mt-9 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "550ms" }}
          >
            <a
              href="#planes"
              className="btn-sheen rounded-lg bg-accent px-8 py-4 text-[15px] font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              ¡INSCRÍBETE AHORA!
            </a>
            <a
              href="#planes"
              className="rounded-lg border border-foreground/40 px-8 py-4 text-[15px] font-semibold tracking-wide transition-colors duration-200 hover:border-foreground hover:bg-foreground/5"
            >
              CONOCE LOS PLANES
            </a>
          </div>
        </div>
      </section>

      {/* Franja de confianza */}
      <section className="border-y border-line">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 sm:grid-cols-3 lg:px-10">
          <Reveal className="flex items-center gap-4">
            <span className="font-heading text-5xl font-extrabold text-accent">
              <Counter to={14} />
            </span>
            <span className="flex flex-col">
              <span className="font-bold tracking-wide">SEDES OPERATIVAS</span>
              <span className="text-sm text-muted-2">A lo largo de Chile</span>
            </span>
          </Reveal>
          <Reveal delay={120} className="flex items-center gap-4">
            <span className="font-heading text-5xl font-extrabold text-accent">
              <Counter to={sedesPreventa.length + sedesEspera.length} />
            </span>
            <span className="flex flex-col">
              <span className="font-bold tracking-wide">PRÓXIMAS APERTURAS</span>
              <span className="text-sm text-muted-2">
                {sedesPreventa.length} en preventa · {sedesEspera.length} en
                lista de espera
              </span>
            </span>
          </Reveal>
          <Reveal delay={240} className="flex items-center gap-4">
            <Icon name="dumbbell" size={36} className="shrink-0 text-accent" />
            <span className="flex flex-col">
              <span className="font-bold tracking-wide">ALTA EXIGENCIA</span>
              <span className="text-sm text-muted-2">
                Entrenamiento profesional
              </span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeader eyebrow="NUESTROS SERVICIOS" title="MÁS QUE UN GIMNASIO." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {servicios.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="group h-full rounded-2xl border border-line bg-surface p-8 transition duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_12px_40px_-12px_rgba(255,46,196,0.35)]">
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon name={s.icon} size={24} />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-extrabold leading-none">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Planes */}
      <section id="planes" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeader
          eyebrow="PLANES Y PRECIOS"
          title="ELIGE TU PLAN."
          right={
            <p className="text-sm text-muted-2">
              Activación de $10.000 en todos los planes
            </p>
          }
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {planes.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 120}>
              <article
                className={`flex h-full flex-col gap-6 rounded-2xl border bg-surface p-10 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_48px_-12px_rgba(255,46,196,0.4)] ${
                  plan.featured ? "border-2 border-accent" : "border-line hover:border-accent/60"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-heading text-3xl font-extrabold">
                    {plan.name}
                  </h3>
                  <span
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wider ${
                      plan.featured
                        ? "bg-accent text-white"
                        : "border border-line text-muted"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
                <div className="flex items-end gap-2.5">
                  <span className="font-heading text-6xl font-extrabold leading-[0.9]">
                    {plan.price}
                  </span>
                  <span className="text-muted-2">{plan.suffix}</span>
                </div>
                <p className="text-sm text-muted-2">{plan.detail}</p>
                <hr className="border-line" />
                <ul className="flex flex-col gap-3.5">
                  {plan.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-muted">
                      <Icon
                        name="check-circle"
                        size={18}
                        className="shrink-0 text-accent"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`btn-sheen mt-auto rounded-lg px-6 py-4 text-center text-[15px] font-bold tracking-wide transition-transform duration-200 hover:scale-[1.02] active:scale-95 ${
                    plan.featured
                      ? "bg-accent text-white"
                      : "border border-foreground/40 hover:border-foreground"
                  }`}
                >
                  CONTRATAR PLAN
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sedes */}
      <section id="sedes" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <SectionHeader
          eyebrow="NUESTRAS SEDES"
          title="ENCUENTRA TU POWER FITNESS MÁS CERCANO."
          right={
            <a
              href="/sedes"
              className="flex items-center gap-2.5 rounded-lg border border-foreground/40 px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:border-foreground hover:bg-foreground/5"
            >
              <Icon name="map" size={17} className="text-accent" />
              VER MAPA Y HORARIOS
            </a>
          }
        />

        <Reveal className="mt-12">
          <SedesMap />
        </Reveal>
      </section>

      {/* Convenios */}
      <section id="convenios" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-line bg-surface lg:grid-cols-2">
            <div className="flex flex-col justify-center gap-6 p-10 lg:p-14">
              <div className="flex items-center gap-3">
                <span className="h-1 w-9 bg-accent" />
                <span className="text-sm font-semibold tracking-[0.2em] text-muted">
                  CONVENIOS CORPORATIVOS
                </span>
              </div>
              <h2 className="font-heading text-4xl font-extrabold leading-none sm:text-5xl">
                ¿BUSCAS CONVENIOS PARA TU EMPRESA?
              </h2>
              <p className="max-w-md leading-relaxed text-muted">
                Únete a las corporaciones que ya entrenan con nosotros y
                entrega a tu equipo un beneficio real.
              </p>
              <a
                href="#"
                className="btn-sheen w-fit rounded-lg bg-accent px-7 py-4 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              >
                SOLICITAR INFORMACIÓN CORPORATIVA
              </a>
            </div>
            <div className="group relative min-h-72 overflow-hidden">
              <Image
                src="/convenios.jpg"
                alt="Clase grupal de entrenamiento funcional"
                fill
                sizes="(min-width: 1024px) 40rem, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="flex flex-col gap-4">
              <span className="font-heading text-2xl font-extrabold tracking-wide">
                POWER<span className="text-accent">FITNESS</span>
              </span>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Especialistas en entrenamiento de alta exigencia. Red de 14
                sedes en Chile con tecnología de vanguardia.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg font-bold tracking-wider">
                CONTACTO
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-muted">
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Atención al cliente
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Corporativo
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-foreground">
                    Reclutamiento
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-lg font-bold tracking-wider">
                MENÚ
              </h3>
              <ul className="flex flex-col gap-3 text-sm text-muted">
                {[
                  ["Inicio", "#inicio"],
                  ["Sedes", "#sedes"],
                  ["Planes", "#planes"],
                  ["Convenios", "#convenios"],
                  ["Equipamiento", "/equipamiento"],
                  ["Política de Privacidad", "#"],
                  ["Términos y Condiciones", "#"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
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
                SÍGUENOS
              </h3>
              <div className="flex gap-3">
                {(
                  [
                    ["whatsapp", "Escríbenos por WhatsApp"],
                    ["instagram", "Síguenos en Instagram"],
                    ["facebook", "Síguenos en Facebook"],
                  ] as [IconName, string][]
                ).map(([icon, label]) => (
                  <a
                    key={icon}
                    href="#"
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

      <FloatingWidgets />
    </div>
  );
}
