import { z } from "zod";
import { VENEZUELAN_STATES } from "./constants";

export const customerSchema = z.object({
  full_name: z.string().min(2, "Nombre es requerido"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Teléfono inválido"),
  cedula: z.string().min(6, "Cédula inválida"),
  address: z.object({
    street: z.string().min(3, "Dirección es requerida"),
    city: z.string().min(2, "Ciudad es requerida"),
    state: z.enum(VENEZUELAN_STATES as unknown as [string, ...string[]]),
    zip: z.string().optional(),
    reference: z.string().optional(),
  }),
});

export const checkoutSchema = customerSchema.extend({
  payment_method: z.enum(["pago_movil", "zelle", "binance"]),
  notes: z.string().optional(),
});

export const paymentProofSchema = z.object({
  reference_number: z.string().min(4, "Número de referencia es requerido"),
  declared_amount: z.number().positive("Monto debe ser positivo"),
  declared_currency: z.enum(["VES", "USD"]),
});

export const productSchema = z.object({
  name: z.string().min(2, "Nombre es requerido"),
  slug: z.string().min(2, "Slug es requerido"),
  category_id: z.string().uuid("Categoría inválida"),
  description: z.string().optional(),
  base_price_usd: z.number().positive("Precio debe ser positivo"),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const variantSchema = z.object({
  size: z.string().min(1, "Talla es requerida"),
  color: z.string().min(1, "Color es requerido"),
  color_hex: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Color hex inválido").optional(),
  sku: z.string().min(3, "SKU es requerido"),
  stock: z.number().int().min(0, "Stock no puede ser negativo"),
  low_stock_threshold: z.number().int().min(0).default(5),
  price_override_usd: z.number().positive().optional(),
});

export const exchangeRateSchema = z.object({
  rate_bs_per_usd: z.number().positive("Tasa debe ser positiva"),
  notes: z.string().optional(),
});

export const shipmentSchema = z.object({
  order_id: z.string().uuid(),
  carrier: z.string().min(1, "Carrier es requerido"),
  tracking_number: z.string().optional(),
  tracking_url: z.string().url().optional().or(z.literal("")),
  notes: z.string().optional(),
});
