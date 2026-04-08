import type { OrderStatus, PaymentMethod } from "@/lib/constants";

export interface Order {
  id: string;
  order_number: string;
  customer_id: string;
  status: OrderStatus;
  payment_method: PaymentMethod;
  subtotal_usd: number;
  exchange_rate_id: string;
  exchange_rate_snapshot: number;
  total_usd: number;
  total_bs: number;
  shipping_address: ShippingAddress;
  notes: string | null;
  admin_notes: string | null;
  verified_at: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  created_at: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  zip?: string;
  reference?: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  variant_id: string;
  product_name: string;
  variant_desc: string;
  quantity: number;
  unit_price_usd: number;
  subtotal_usd: number;
}

export interface PaymentProof {
  id: string;
  order_id: string;
  image_url: string;
  reference_number: string | null;
  declared_amount: number | null;
  declared_currency: "VES" | "USD";
  is_verified: boolean;
  verified_at: string | null;
  rejection_reason: string | null;
}

export interface CheckoutFormData {
  full_name: string;
  email: string;
  phone: string;
  cedula: string;
  address: ShippingAddress;
  payment_method: PaymentMethod;
  notes?: string;
  reference_number: string;
  declared_amount: number;
}
