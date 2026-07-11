// TODO(negocio): catálogo completo de placeholder — validar productos, modelos,
// precios, descripciones, specs, cuotas y taxonomía de categorías antes de
// publicar. Imágenes de referencia (stock), reemplazar por fotos reales.

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
  descripcion: string;
  specs: string[];
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

export const cuotas12 = (price: number) =>
  `o 12 cuotas de ${clp(Math.round(price / 12))}`;

export const productos: Producto[] = [
  {
    id: "trotadora-t900",
    name: "Trotadora Power T-900",
    categoria: "Máquinas",
    price: 1_299_990,
    descripcion:
      "Motor de 3.5 HP, velocidad hasta 20 km/h y superficie de carrera de 152 × 51 cm. La misma línea que corre en nuestras 14 sedes.",
    specs: [
      "Motor 3.5 HP de uso continuo",
      "Velocidad 1–20 km/h",
      "Superficie de carrera 152 × 51 cm",
      "Inclinación eléctrica 0–15%",
      "Peso máximo de usuario 150 kg",
      "Plegable, con sistema de amortiguación",
    ],
    image: "/productos/trotadora-t900.jpg",
    imageAlt: "Trotadoras profesionales en un gimnasio Power Fitness",
  },
  {
    id: "rack-r300",
    name: "Rack de Sentadillas R-300",
    categoria: "Fuerza",
    price: 549_990,
    descripcion:
      "Rack de sentadillas de acero estructural con soportes ajustables y barras de seguridad, pensado para entrenamiento pesado en casa.",
    specs: [
      "Acero estructural de 3 mm",
      "Altura 220 cm",
      "Capacidad de carga 350 kg",
      "Soportes J-cup ajustables",
      "Barra de dominadas incluida",
    ],
    image: "/productos/rack-r300.jpg",
    imageAlt: "Rack de sentadillas profesional",
  },
  {
    id: "discos-olimpicos",
    name: "Set Discos Olímpicos 100 kg",
    categoria: "Fuerza",
    price: 329_990,
    descripcion:
      "Set de 100 kg en discos engomados de 50 mm con agarre ergonómico, compatibles con cualquier barra olímpica estándar.",
    specs: [
      "2 × 25 kg, 2 × 15 kg y 2 × 10 kg",
      "Encastre olímpico 50 mm",
      "Recubrimiento de goma anti-impacto",
      "Agarre ergonómico de 3 puntos",
    ],
    image: "/productos/discos-olimpicos.jpg",
    imageAlt: "Discos olímpicos con barra",
  },
  {
    id: "mancuernas-ajustables",
    name: "Mancuernas Ajustables 24 kg",
    categoria: "Fuerza",
    price: 189_990,
    descripcion:
      "Par de mancuernas ajustables de 2.5 a 24 kg por lado. Reemplazan un rack completo en menos de medio metro cuadrado.",
    specs: [
      "Rango 2.5–24 kg por mancuerna",
      "Ajuste por dial, 15 niveles",
      "Bases de apoyo incluidas",
      "Empuñadura antideslizante",
    ],
    image: "/productos/mancuernas-ajustables.jpg",
    imageAlt: "Mancuernas en rack de gimnasio",
  },
  {
    id: "bicicleta-s200",
    name: "Bicicleta Spinning S-200",
    categoria: "Máquinas",
    price: 449_990,
    descripcion:
      "Bicicleta de ciclismo indoor con resistencia magnética silenciosa y volante de inercia de 18 kg, ideal para entrenar en departamento.",
    specs: [
      "Volante de inercia 18 kg",
      "Resistencia magnética silenciosa",
      "Monitor LCD con cadencia y distancia",
      "Asiento y manubrio ajustables en 4 direcciones",
      "Peso máximo de usuario 130 kg",
    ],
    image: "/productos/bicicleta-s200.jpg",
    imageAlt: "Persona entrenando en bicicleta de spinning",
  },
  {
    id: "banco-b100",
    name: "Banco Ajustable B-100",
    categoria: "Fuerza",
    price: 159_990,
    descripcion:
      "Banco de entrenamiento con respaldo ajustable plano, inclinado y declinado. La base de cualquier home gym.",
    specs: [
      "7 posiciones de respaldo",
      "Capacidad de carga 300 kg",
      "Plegable para guardado vertical",
      "Tapiz de alta densidad",
    ],
    image: "/productos/banco-b100.jpg",
    imageAlt: "Banco de entrenamiento ajustable",
  },
  {
    id: "kit-kettlebell",
    name: "Kit Kettlebell + Bandas",
    categoria: "Accesorios",
    price: 59_990,
    descripcion:
      "Kettlebell de hierro fundido de 16 kg más set de 5 bandas de resistencia. Todo lo necesario para entrenamiento funcional en casa.",
    specs: [
      "Kettlebell hierro fundido 16 kg",
      "5 bandas de resistencia (5–40 kg)",
      "Bolso de transporte incluido",
    ],
    image: "/productos/kit-kettlebell.jpg",
    imageAlt: "Kettlebell y accesorios de entrenamiento funcional",
  },
];

export const getProducto = (id: string) =>
  productos.find((p) => p.id === id);

const trotadora = productos[0];

export const destacado = {
  ...trotadora,
  cuotas: cuotas12(trotadora.price),
  beneficios: [
    "Garantía 12 meses con servicio técnico en Chile",
    "Armado e instalación incluidos en RM",
    "Retiro gratis en tu sede más cercana",
  ],
};

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
