// Coordenadas geocodificadas con Nominatim/OpenStreetMap el 2026-07-11.
// geoAprox: OSM no tiene el número de la dirección; el pin cae en la calle
// correcta pero no necesariamente frente al local. Validar contra Google Maps.
export type SedeStatus = "abierta" | "preventa" | "espera";

export type Horario = {
  lunesViernes: string;
  sabado: string;
  /** null = sin atención los domingos */
  domingo: string | null;
  festivos: string;
};

export type Sede = {
  id: string;
  name: string;
  address: string;
  comuna: string;
  status: SedeStatus;
  lat: number;
  lng: number;
  /** null = horarios aún no publicados (lista de espera) */
  horario: Horario | null;
  geoAprox?: boolean;
};

export const statusLabels: Record<SedeStatus, string> = {
  abierta: "Abierta",
  preventa: "En preventa",
  espera: "Próximamente · Lista de espera",
};

// Horario base compartido por todas las sedes operativas y en preventa;
// solo cambia la atención de los domingos.
const horarioGeneral: Horario = {
  lunesViernes: "06:00 – 23:00",
  sabado: "09:00 – 21:00",
  domingo: null,
  festivos: "09:00 – 14:00",
};

const conDomingo = (domingo: string): Horario => ({
  ...horarioGeneral,
  domingo,
});

export const sedes: Sede[] = [
  // Sedes abiertas
  {
    id: "vicuna-mackenna",
    name: "Vicuña Mackenna",
    address: "Av. Vicuña Mackenna #2996",
    comuna: "Peñaflor",
    status: "abierta",
    lat: -33.611302,
    lng: -70.901439,
    horario: conDomingo("09:00 – 16:00"),
    geoAprox: true,
  },
  {
    id: "miraflores",
    name: "Miraflores",
    address: "Miraflores #936",
    comuna: "Peñaflor",
    status: "abierta",
    lat: -33.600225,
    lng: -70.870115,
    horario: conDomingo("09:00 – 14:00"),
    geoAprox: true,
  },
  {
    id: "talagante",
    name: "Talagante",
    address: "Lucas Pacheco #869",
    comuna: "Talagante",
    status: "abierta",
    lat: -33.660784,
    lng: -70.925444,
    horario: conDomingo("09:00 – 16:00"),
    geoAprox: true,
  },
  {
    id: "el-monte",
    name: "El Monte",
    address: "Av. Los Libertadores #581",
    comuna: "El Monte",
    status: "abierta",
    lat: -33.685549,
    lng: -71.104148,
    horario: conDomingo("09:00 – 16:00"),
    geoAprox: true,
  },
  {
    id: "padre-hurtado",
    name: "Padre Hurtado",
    address: "Camino a Melipilla #2830",
    comuna: "Padre Hurtado",
    status: "abierta",
    lat: -33.587663,
    lng: -70.837242,
    horario: conDomingo("09:00 – 16:00"),
    geoAprox: true,
  },
  {
    id: "bollenar",
    name: "Bollenar",
    address: "Anselmo Alarcón #1232",
    comuna: "Bollenar",
    status: "abierta",
    lat: -33.569743,
    lng: -71.207068,
    horario: horarioGeneral,
    geoAprox: true,
  },
  {
    id: "san-antonio",
    name: "San Antonio",
    address: "Centenario #396",
    comuna: "San Antonio",
    status: "abierta",
    lat: -33.577068,
    lng: -71.604061,
    horario: horarioGeneral,
    geoAprox: true,
  },
  {
    id: "exequiel",
    name: "Exequiel",
    address: "Exequiel Fernández #653",
    comuna: "Ñuñoa",
    status: "abierta",
    lat: -33.460649,
    lng: -70.600119,
    horario: horarioGeneral,
  },
  {
    id: "merced",
    name: "Merced",
    address: "Merced #838, piso -1, Edif. Casa Colorada",
    comuna: "Santiago",
    status: "abierta",
    lat: -33.438363,
    lng: -70.64887,
    horario: horarioGeneral,
  },
  {
    id: "chacabuco",
    name: "Chacabuco",
    address: "Chacabuco #511",
    comuna: "Santiago",
    status: "abierta",
    lat: -33.439919,
    lng: -70.678656,
    horario: horarioGeneral,
  },
  {
    id: "carmen",
    name: "Carmen",
    address: "Carmen #1291",
    comuna: "Santiago",
    status: "abierta",
    lat: -33.460476,
    lng: -70.638875,
    horario: horarioGeneral,
  },
  {
    id: "lord-cochrane",
    name: "Lord Cochrane",
    address: "Lord Cochrane #568",
    comuna: "Santiago",
    status: "abierta",
    lat: -33.453178,
    lng: -70.654077,
    horario: horarioGeneral,
  },
  {
    id: "irarrazaval",
    name: "Irarrázaval",
    address: "Irarrázaval #4938",
    comuna: "Ñuñoa",
    status: "abierta",
    lat: -33.453564,
    lng: -70.622384,
    horario: horarioGeneral,
    geoAprox: true,
  },
  {
    id: "macul",
    name: "Macul",
    address: "Av. Macul #3403",
    comuna: "Macul",
    status: "abierta",
    lat: -33.485935,
    lng: -70.599597,
    horario: horarioGeneral,
  },
  // Sedes en preventa (Reñaca) — horario vigente desde la inauguración
  {
    id: "renaca-1",
    name: "Reñaca 1",
    address: "Los Mirlos #181",
    comuna: "Reñaca",
    status: "preventa",
    lat: -32.95666,
    lng: -71.543224,
    horario: horarioGeneral,
  },
  {
    id: "renaca-2",
    name: "Reñaca 2",
    address: "Av. Borgoño #14912",
    comuna: "Reñaca",
    status: "preventa",
    lat: -32.968971,
    lng: -71.545034,
    horario: horarioGeneral,
  },
  // Próximamente (lista de espera) — sin horarios publicados
  {
    id: "quillota",
    name: "Quillota",
    address: "San Martín #801",
    comuna: "Quillota",
    status: "espera",
    lat: -32.879919,
    lng: -71.248077,
    horario: null,
    geoAprox: true,
  },
  {
    id: "quilpue",
    name: "Quilpué",
    address: "Zenteno #741-749",
    comuna: "Quilpué",
    status: "espera",
    lat: -33.045612,
    lng: -71.43817,
    horario: null,
  },
  {
    id: "linares",
    name: "Linares",
    address: "Av. Brasil #93",
    comuna: "Linares",
    status: "espera",
    lat: -35.846912,
    lng: -71.591162,
    horario: null,
    geoAprox: true,
  },
  {
    id: "isla-de-maipo",
    name: "Isla de Maipo",
    address: "Izaga #1133",
    comuna: "Isla de Maipo",
    status: "espera",
    lat: -33.753344,
    lng: -70.907542,
    horario: null,
  },
];

export const sedesAbiertas = sedes.filter((s) => s.status === "abierta");
export const sedesPreventa = sedes.filter((s) => s.status === "preventa");
export const sedesEspera = sedes.filter((s) => s.status === "espera");
