"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "../components/Icon";
import {
  sedes,
  statusLabels,
  type Sede,
  type SedeStatus,
} from "../data/sedes";

type Filter = "todas" | SedeStatus;

const grupos: { status: SedeStatus; label: string }[] = [
  { status: "abierta", label: "SEDES ABIERTAS" },
  { status: "preventa", label: "EN PREVENTA · REÑACA" },
  { status: "espera", label: "PRÓXIMAMENTE · LISTA DE ESPERA" },
];

const dotClass: Record<SedeStatus, string> = {
  abierta: "bg-accent",
  preventa: "bg-foreground",
  espera: "bg-muted-2",
};

function mapsUrl(sede: Sede) {
  const query = encodeURIComponent(`${sede.address}, ${sede.comuna}, Chile`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

function pinIcon(
  L: typeof import("leaflet"),
  sede: Sede,
  isSelected: boolean,
) {
  const size = isSelected ? 22 : 18;
  return L.divIcon({
    className: "sede-pin-wrap",
    html: `<span class="sede-pin sede-pin--${sede.status}${
      isSelected ? " sede-pin--selected" : ""
    }" style="height:${size - 4}px;width:${size - 4}px"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function HorarioRow({
  dia,
  horas,
  last = false,
}: {
  dia: string;
  horas: string | null;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3.5 ${
        last ? "" : "border-b border-line"
      }`}
    >
      <span className="text-[15px] text-muted">{dia}</span>
      {horas ? (
        <span className="font-semibold tabular-nums">{horas}</span>
      ) : (
        <span className="font-medium text-muted-2">Cerrado</span>
      )}
    </div>
  );
}

export function SedesExplorer() {
  const [filter, setFilter] = useState<Filter>("todas");
  const [selectedId, setSelectedId] = useState(sedes[0].id);

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

  const visibles = useMemo(
    () => sedes.filter((s) => filter === "todas" || s.status === filter),
    [filter],
  );
  // Si el filtro deja fuera a la sede seleccionada, cae a la primera visible
  const selected =
    visibles.find((s) => s.id === selectedId) ?? visibles[0] ?? sedes[0];

  const counts = useMemo(() => {
    const base = { abierta: 0, preventa: 0, espera: 0 };
    for (const s of sedes) base[s.status] += 1;
    return base;
  }, []);

  // Inicializa el mapa y los markers una sola vez
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;

    (async () => {
      // Leaflet toca `window` al importarse, por eso se carga solo en cliente
      const L = (await import("leaflet")).default;
      if (cancelled) return;
      leafletRef.current = L;

      const map = L.map(container, { scrollWheelZoom: false });
      mapRef.current = map;
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      for (const sede of sedes) {
        const marker = L.marker([sede.lat, sede.lng], {
          icon: pinIcon(L, sede, false),
          title: `Sede ${sede.name}`,
        })
          .addTo(map)
          .on("click", () => setSelectedId(sede.id));
        markersRef.current[sede.id] = marker;
      }

      map.fitBounds(
        L.latLngBounds(sedes.map((s) => [s.lat, s.lng])),
        { padding: [40, 40] },
      );
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  // Filtro: muestra/oculta markers y reencuadra
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    for (const sede of sedes) {
      const marker = markersRef.current[sede.id];
      if (!marker) continue;
      const visible = filter === "todas" || sede.status === filter;
      if (visible) marker.addTo(map);
      else marker.remove();
    }
    const shown = sedes.filter(
      (s) => filter === "todas" || s.status === filter,
    );
    if (shown.length > 0) {
      map.fitBounds(
        L.latLngBounds(shown.map((s) => [s.lat, s.lng])),
        { padding: [40, 40] },
      );
    }
  }, [filter]);

  // Selección: destaca el pin y centra el mapa
  const selectedEffectiveId = selected.id;
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    for (const sede of sedes) {
      const marker = markersRef.current[sede.id];
      if (!marker) continue;
      marker.setIcon(pinIcon(L, sede, sede.id === selectedEffectiveId));
      marker.setZIndexOffset(sede.id === selectedEffectiveId ? 1000 : 0);
    }
    const sede = sedes.find((s) => s.id === selectedEffectiveId);
    if (sede) {
      map.flyTo([sede.lat, sede.lng], Math.max(map.getZoom(), 12), {
        duration: 0.8,
      });
    }
  }, [selectedEffectiveId]);

  const chips: { value: Filter; label: string; dot?: SedeStatus }[] = [
    { value: "todas", label: `TODAS (${sedes.length})` },
    { value: "abierta", label: `ABIERTAS (${counts.abierta})`, dot: "abierta" },
    {
      value: "preventa",
      label: `PREVENTA (${counts.preventa})`,
      dot: "preventa",
    },
    {
      value: "espera",
      label: `LISTA DE ESPERA (${counts.espera})`,
      dot: "espera",
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Filtros */}
      <div className="flex flex-wrap gap-2.5">
        {chips.map((chip) => {
          const active = filter === chip.value;
          return (
            <button
              key={chip.value}
              onClick={() => setFilter(chip.value)}
              className={`flex items-center gap-2 rounded-full border px-4.5 py-2 text-[13px] font-semibold tracking-wide transition-colors duration-200 ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-surface text-muted hover:border-accent/60"
              }`}
            >
              {chip.dot && (
                <span
                  className={`h-2 w-2 rounded-full ${
                    active ? "bg-white" : dotClass[chip.dot]
                  }`}
                />
              )}
              {chip.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-[400px_1fr]">
        {/* Lista de sedes */}
        <div className="order-2 flex flex-col gap-2.5 lg:order-none">
          {grupos.map((grupo) => {
            const items = visibles.filter((s) => s.status === grupo.status);
            if (items.length === 0) return null;
            return (
              <div key={grupo.status} className="flex flex-col gap-2.5">
                <div className="mt-3 flex items-center gap-2.5 first:mt-0">
                  <span className="h-0.75 w-6 bg-accent" />
                  <h3 className="text-xs font-semibold tracking-[0.2em] text-muted">
                    {grupo.label}
                  </h3>
                </div>
                {items.map((sede) => {
                  const isSelected = sede.id === selected.id;
                  return (
                    <button
                      key={sede.id}
                      onClick={() => setSelectedId(sede.id)}
                      aria-pressed={isSelected}
                      className={`flex items-center gap-3.5 rounded-xl border px-4.5 py-3.5 text-left transition duration-200 ${
                        isSelected
                          ? "border-accent bg-surface-2"
                          : "border-line bg-surface hover:border-accent/60"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${dotClass[sede.status]}`}
                      />
                      <span className="flex min-w-0 flex-col">
                        <span className="font-semibold">{sede.name}</span>
                        <span className="truncate text-[13px] text-muted-2">
                          {sede.address}, {sede.comuna}
                        </span>
                      </span>
                      <Icon
                        name="chevron-right"
                        size={16}
                        className={`ml-auto shrink-0 ${
                          isSelected ? "text-accent" : "text-muted-2"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Mapa + detalle */}
        <div className="order-1 flex flex-col gap-6 lg:order-none">
          <div
            ref={containerRef}
            aria-label="Mapa de sedes Power Fitness"
            className="map-dark h-105 w-full overflow-hidden rounded-2xl border border-line bg-surface"
          />

          <article className="rounded-2xl border border-line bg-surface p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex flex-col gap-2.5">
                <h2 className="font-heading text-3xl font-extrabold leading-none">
                  SEDE {selected.name.toUpperCase()}
                </h2>
                <p className="flex items-center gap-2 text-sm text-muted">
                  <Icon
                    name="map-pin"
                    size={15}
                    className="shrink-0 text-accent"
                  />
                  {selected.address}, {selected.comuna}
                </p>
              </div>
              <span
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wider ${
                  selected.status === "abierta"
                    ? "bg-accent text-white"
                    : selected.status === "preventa"
                      ? "border border-accent text-accent"
                      : "border border-line text-muted"
                }`}
              >
                {statusLabels[selected.status].toUpperCase()}
              </span>
            </div>

            <hr className="my-6 border-line" />

            <div className="flex items-center gap-2.5">
              <Icon name="clock" size={15} className="text-accent" />
              <h3 className="text-xs font-semibold tracking-[0.2em] text-muted">
                HORARIO DE ATENCIÓN
              </h3>
            </div>

            {selected.horario ? (
              <>
                <div className="mt-2">
                  <HorarioRow
                    dia="Lunes a viernes"
                    horas={selected.horario.lunesViernes}
                  />
                  <HorarioRow dia="Sábado" horas={selected.horario.sabado} />
                  <HorarioRow dia="Domingo" horas={selected.horario.domingo} />
                  <HorarioRow
                    dia="Festivos"
                    horas={selected.horario.festivos}
                    last
                  />
                </div>
                {selected.status === "preventa" && (
                  <p className="mt-3 text-[13px] text-muted-2">
                    * Horario vigente desde la inauguración de la sede.
                  </p>
                )}
              </>
            ) : (
              <p className="mt-4 leading-relaxed text-muted">
                Esta sede aún no publica sus horarios. Únete a la lista de
                espera y te avisaremos apenas confirmemos la apertura.
              </p>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={mapsUrl(selected)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 rounded-lg border border-foreground/40 px-6 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 hover:border-foreground hover:bg-foreground/5"
              >
                <Icon name="navigation" size={15} className="text-accent" />
                CÓMO LLEGAR
              </a>
              {selected.status === "espera" ? (
                <a
                  href="#"
                  className="btn-sheen rounded-lg bg-accent px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                >
                  UNIRME A LA LISTA DE ESPERA
                </a>
              ) : (
                <Link
                  href="/#planes"
                  className="btn-sheen rounded-lg bg-accent px-7 py-3.5 text-sm font-bold tracking-wide text-white transition-transform duration-200 hover:scale-[1.02] active:scale-95"
                >
                  INSCRÍBETE EN ESTA SEDE
                </Link>
              )}
            </div>
          </article>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-7 py-5">
            <div className="flex flex-col gap-1">
              <h3 className="font-heading text-xl font-extrabold">
                ¿TU SEDE AÚN NO ABRE?
              </h3>
              <p className="text-sm text-muted">
                Inscríbete en la lista de espera y te avisamos apenas abra.
              </p>
            </div>
            <a
              href="#"
              className="rounded-lg border border-foreground/40 px-5 py-3 text-[13px] font-semibold tracking-wide transition-colors duration-200 hover:border-foreground hover:bg-foreground/5"
            >
              UNIRME A LA LISTA
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
