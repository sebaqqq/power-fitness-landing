"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { sedes, statusLabels, type Sede } from "../data/sedes";

function popupHtml(sede: Sede) {
  const query = encodeURIComponent(
    `${sede.address}, ${sede.comuna}, Chile`,
  );
  return `
    <div class="sede-popup">
      <strong>Sede ${sede.name}</strong>
      <span>${sede.address}, ${sede.comuna}</span>
      <span class="sede-popup-status sede-popup-status--${sede.status}">${statusLabels[sede.status]}</span>
      <a href="https://www.google.com/maps/search/?api=1&query=${query}" target="_blank" rel="noopener noreferrer">Cómo llegar →</a>
    </div>`;
}

export function SedesMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let map: LeafletMap | undefined;
    let cancelled = false;

    (async () => {
      // Leaflet toca `window` al importarse, por eso se carga solo en cliente
      const L = (await import("leaflet")).default;
      if (cancelled) return;

      map = L.map(container, { scrollWheelZoom: false });
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
        L.marker([sede.lat, sede.lng], { icon, title: `Sede ${sede.name}` })
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
      map?.remove();
    };
  }, []);

  const counts = {
    abierta: sedes.filter((s) => s.status === "abierta").length,
    preventa: sedes.filter((s) => s.status === "preventa").length,
    espera: sedes.filter((s) => s.status === "espera").length,
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-label="Mapa de sedes Power Fitness"
        className="map-dark h-120 w-full overflow-hidden rounded-2xl border border-line bg-surface"
      />
      <div className="pointer-events-none absolute bottom-4 left-4 z-1000 flex flex-wrap gap-2">
        {(
          [
            ["abierta", `Abiertas (${counts.abierta})`],
            ["preventa", `Preventa (${counts.preventa})`],
            ["espera", `Lista de espera (${counts.espera})`],
          ] as const
        ).map(([status, label]) => (
          <span
            key={status}
            className="flex items-center gap-2 rounded-full border border-line bg-background/85 px-3.5 py-1.5 text-xs font-semibold tracking-wide backdrop-blur"
          >
            <span className={`sede-pin sede-pin--${status} h-2.5! w-2.5!`} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
