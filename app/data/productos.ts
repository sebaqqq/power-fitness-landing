// TODO(negocio): catálogo completo de placeholder — validar productos, modelos,
// precios, cuotas y taxonomía de categorías antes de publicar. Imágenes de
// referencia (stock), reemplazar por fotos reales de producto.

export type CategoriaProducto =
  | "Máquinas"
  | "Fuerza"
  | "Accesorios"
  | "Recuperación";

export interface Producto {
  id: string;
  name: string;
  categoria: CategoriaProducto;
  price: number;
  image: string;
  imageAlt: string;
}

export const categorias: CategoriaProducto[] = [
  "Máquinas",
  "Fuerza",
  "Accesorios",
  "Recuperación",
];

export const clp = (value: number) => `$${value.toLocaleString("es-CL")}`;

export const destacado = {
  id: "trotadora-t900",
  name: "TROTADORA POWER T-900",
  descripcion:
    "Motor de 3.5 HP, velocidad hasta 20 km/h y superficie de carrera de 152 × 51 cm. La misma línea que corre en nuestras 14 sedes.",
  price: 1_299_990,
  cuotas: "o 12 cuotas de $108.333",
  beneficios: [
    "Garantía 12 meses con servicio técnico en Chile",
    "Armado e instalación incluidos en RM",
    "Retiro gratis en tu sede más cercana",
  ],
  image: "/productos/trotadora-t900.jpg",
  imageAlt: "Trotadoras profesionales en un gimnasio Power Fitness",
};

export const productos: Producto[] = [
  {
    id: "rack-r300",
    name: "Rack de Sentadillas R-300",
    categoria: "Fuerza",
    price: 549_990,
    image: "/productos/rack-r300.jpg",
    imageAlt: "Rack de sentadillas profesional",
  },
  {
    id: "discos-olimpicos",
    name: "Set Discos Olímpicos 100 kg",
    categoria: "Fuerza",
    price: 329_990,
    image: "/productos/discos-olimpicos.jpg",
    imageAlt: "Discos olímpicos con barra",
  },
  {
    id: "mancuernas-ajustables",
    name: "Mancuernas Ajustables 24 kg",
    categoria: "Fuerza",
    price: 189_990,
    image: "/productos/mancuernas-ajustables.jpg",
    imageAlt: "Mancuernas en rack de gimnasio",
  },
  {
    id: "bicicleta-s200",
    name: "Bicicleta Spinning S-200",
    categoria: "Máquinas",
    price: 449_990,
    image: "/productos/bicicleta-s200.jpg",
    imageAlt: "Bicicletas de spinning en sala de ciclismo indoor",
  },
  {
    id: "banco-b100",
    name: "Banco Ajustable B-100",
    categoria: "Fuerza",
    price: 159_990,
    image: "/productos/banco-b100.jpg",
    imageAlt: "Banco de entrenamiento ajustable",
  },
  {
    id: "kit-kettlebell",
    name: "Kit Kettlebell + Bandas",
    categoria: "Accesorios",
    price: 59_990,
    image: "/productos/kit-kettlebell.jpg",
    imageAlt: "Kettlebell y accesorios de entrenamiento funcional",
  },
];

// TODO(negocio): confirmar política de despacho, retiro, garantía y medios de pago
export const beneficiosCompra = [
  {
    icon: "truck",
    title: "Despacho a todo Chile",
    text: "Envío calculado al pagar",
  },
  {
    icon: "map-pin",
    title: "Retiro en sede",
    text: "Gratis en tus 14 sedes",
  },
  {
    icon: "shield",
    title: "Garantía 12 meses",
    text: "Servicio técnico local",
  },
  {
    icon: "credit-card",
    title: "Hasta 12 cuotas",
    text: "Webpay y transferencia",
  },
] as const;
