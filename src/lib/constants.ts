export const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export const ORDER_STATUSES = {
  pendiente: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800" },
  pago_verificado: {
    label: "Pago Verificado",
    color: "bg-green-100 text-green-800",
  },
  en_preparacion: {
    label: "En Preparación",
    color: "bg-blue-100 text-blue-800",
  },
  enviado: { label: "Enviado", color: "bg-purple-100 text-purple-800" },
  entregado: { label: "Entregado", color: "bg-forest-100 text-forest-800" },
  cancelado: { label: "Cancelado", color: "bg-red-100 text-red-800" },
} as const;

export type OrderStatus = keyof typeof ORDER_STATUSES;

export const PAYMENT_METHODS = {
  pago_movil: { label: "Pago Móvil", currency: "VES" },
  transferencia: { label: "Transferencia Bancaria", currency: "VES" },
  zelle: { label: "Zelle", currency: "USD" },
} as const;

export type PaymentMethod = keyof typeof PAYMENT_METHODS;

export const CARRIERS = [
  "MRW",
  "Zoom",
  "Tealca",
  "DOMESA",
  "Otro",
] as const;

export const VENEZUELAN_STATES = [
  "Amazonas",
  "Anzoátegui",
  "Apure",
  "Aragua",
  "Barinas",
  "Bolívar",
  "Carabobo",
  "Cojedes",
  "Delta Amacuro",
  "Distrito Capital",
  "Falcón",
  "Guárico",
  "Lara",
  "Mérida",
  "Miranda",
  "Monagas",
  "Nueva Esparta",
  "Portuguesa",
  "Sucre",
  "Táchira",
  "Trujillo",
  "Vargas",
  "Yaracuy",
  "Zulia",
] as const;

export const CATEGORIES = [
  { name: "Hoodies", slug: "hoodies" },
  { name: "Jerseys", slug: "jerseys" },
  { name: "Tees", slug: "tees" },
  { name: "Polos", slug: "polos" },
  { name: "Pants", slug: "pants" },
] as const;
