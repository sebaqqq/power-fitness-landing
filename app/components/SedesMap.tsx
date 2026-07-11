"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import "leaflet/dist/leaflet.css";
import { sedes, statusLabels, type Sede, type SedeStatus } from "../data/sedes";

type Filter = "todas" | SedeStatus;

const dotClass: Record<SedeStatus, string> = {
  abierta: "bg-accent",
  preventa: "bg-foreground",
  espera: "bg-muted-2",
};

function popupHtml(sede: Sede) {
  const query = encodeURIComponent(`${sede.address}, ${sede.comuna}, Chile`);
  return `
    <div class="sede-popup">
      <strong>Sede ${sede.name}</strong>
      <span class="sede-popup-address">${sede.address}, ${sede.comuna}</span>
      <span class="sede-popup-status sede-popup-status--${sede.status}">${statusLabels[sede.status]}</span>
      <div class="sede-popup-links">
        <a href="https://www.google.com/maps/search/?api=1&query=${query}" target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
        <a href="/sedes">Ver horarios →</a>
      </div>
    </div>`;
}

export function SedesMap() {
  const [filter, setFilter] = useState<Filter>("todas");

  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const leafletRef = useRef<typeof import("leaflet") | null>(null);

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
        const icon = L.divIcon({
          className: "sede-pin-wrap",
          html: `<span class="sede-pin sede-pin--${sede.status}"></span>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
          popupAnchor: [0, -10],
        });
        markersRef.current[sede.id] = L.marker([sede.lat, sede.lng], {
          icon,
          title: `Sede ${sede.name}`,
        })
          .addTo(map)
          .bindPopup(popupHtml(sede));
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

  // Filtro: muestra/oculta markers y reencuadra el mapa
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (!L || !map) return;
    const shown: Sede[] = [];
    for (const sede of sedes) {
      const marker = markersRef.current[sede.id];
      if (!marker) continue;
      if (filter === "todas" || sede.status === filter) {
        marker.addTo(map);
        shown.push(sede);
      } else {
        marker.closePopup();
        marker.remove();
      }
    }
    if (shown.length > 0) {
      map.flyToBounds(
        L.latLngBounds(shown.map((s) => [s.lat, s.lng])),
        { padding: [40, 40], duration: 0.8 },
      );
    }
  }, [filter]);

  const chips: { value: Filter; label: string; dot?: SedeStatus }[] = [
    { value: "todas", label: `Todas (${sedes.length})` },
    { value: "abierta", label: `Abiertas (${counts.abierta})`, dot: "abierta" },
    {
      value: "preventa",
      label: `Preventa (${counts.preventa})`,
      dot: "preventa",
    },
    {
      value: "espera",
      label: `Lista de espera (${counts.espera})`,
      dot: "espera",
    },
  ];

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label="Mapa de sedes Power Fitness"
        className="map-dark h-120 w-full overflow-hidden rounded-2xl border border-line bg-surface"
      />
      <div className="absolute bottom-4 left-4 z-1000 flex flex-wrap gap-2">
        {chips.map((chip) => {
          const active = filter === chip.value;
          return (
            <button
              key={chip.value}
              onClick={() => setFilter(chip.value)}
              aria-pressed={active}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide backdrop-blur transition-colors duration-200 ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-line bg-background/85 text-muted hover:border-accent/60 hover:text-foreground"
              }`}
            >
              {chip.dot && (
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    active ? "bg-white" : dotClass[chip.dot]
                  }`}
                />
              )}
              {chip.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
