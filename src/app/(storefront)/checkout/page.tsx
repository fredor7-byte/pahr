"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { useExchangeRate } from "@/hooks/use-exchange-rate";
import { formatUSD, formatBs, convertToBs } from "@/lib/utils";
import { VENEZUELAN_STATES, type PaymentMethod } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PaymentMethodSelector } from "@/components/storefront/payment-method-selector";
import { PaymentProofUpload } from "@/components/storefront/payment-proof-upload";
import { createOrder } from "@/actions/orders";
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

type Step = "datos" | "pago" | "comprobante";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalUSD, clearCart } = useCartStore();
  const { rate } = useExchangeRate();
  const total = totalUSD();
  const totalBs = convertToBs(total, rate);

  const [step, setStep] = useState<Step>("datos");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Customer data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cedula, setCedula] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | "">("");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [refNumber, setRefNumber] = useState("");
  const [declaredAmount, setDeclaredAmount] = useState(0);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-2xl font-semibold mb-4">
          Tu carrito está vacío
        </h1>
        <Link href="/catalogo">
          <Button>Ir al catálogo</Button>
        </Link>
      </div>
    );
  }

  const canAdvanceToPayment =
    fullName && email && phone && cedula && street && city && state;
  const canAdvanceToProof = paymentMethod !== "";
  const canSubmit = proofFile && refNumber && declaredAmount > 0;

  const handleSubmit = async () => {
    if (!paymentMethod || !proofFile) return;
    setIsSubmitting(true);
    setError(null);

    const result = await createOrder({
      full_name: fullName,
      email,
      phone,
      cedula,
      address: { street, city, state, zip, reference },
      payment_method: paymentMethod,
      notes: notes || undefined,
      reference_number: refNumber,
      declared_amount: declaredAmount,
      items: items.map((item) => ({
        variant_id: item.variant.id,
        quantity: item.quantity,
      })),
    });

    setIsSubmitting(false);

    if (result.success && result.order_number) {
      clearCart();
      router.push(`/checkout/confirmacion?order=${result.order_number}`);
    } else {
      setError(result.error ?? "Error desconocido");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/carrito"
        className="inline-flex items-center gap-1 text-sm text-charcoal-500 hover:text-charcoal-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver al carrito
      </Link>

      <h1 className="font-heading text-3xl font-semibold text-charcoal-950 mb-8">
        Checkout
      </h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {(["datos", "pago", "comprobante"] as Step[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step === s
                  ? "bg-forest-700 text-white"
                  : i <
                      ["datos", "pago", "comprobante"].indexOf(step)
                    ? "bg-forest-200 text-forest-800"
                    : "bg-charcoal-200 text-charcoal-500"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm hidden sm:inline ${
                step === s ? "text-charcoal-900 font-medium" : "text-charcoal-400"
              }`}
            >
              {s === "datos"
                ? "Datos"
                : s === "pago"
                  ? "Pago"
                  : "Comprobante"}
            </span>
            {i < 2 && (
              <div className="w-8 h-px bg-charcoal-300 hidden sm:block" />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {/* Step 1: Customer Data */}
          {step === "datos" && (
            <div className="space-y-4">
              <h2 className="font-heading text-xl font-semibold mb-4">
                Datos personales
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="fullName"
                  label="Nombre completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Pérez"
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="phone"
                  label="Teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0412-000-0000"
                />
                <Input
                  id="cedula"
                  label="Cédula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  placeholder="V-00.000.000"
                />
              </div>

              <h2 className="font-heading text-xl font-semibold mt-6 mb-4">
                Dirección de envío
              </h2>
              <Input
                id="street"
                label="Dirección"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Calle, edificio, piso, apto"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="city"
                  label="Ciudad"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Caracas"
                />
                <Select
                  id="state"
                  label="Estado"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="Seleccionar estado"
                  options={VENEZUELAN_STATES.map((s) => ({
                    value: s,
                    label: s,
                  }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="zip"
                  label="Código postal (opcional)"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="1010"
                />
                <Input
                  id="reference"
                  label="Punto de referencia (opcional)"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Cerca de..."
                />
              </div>
              <Textarea
                id="notes"
                label="Notas adicionales (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Instrucciones especiales para tu pedido"
                rows={3}
              />

              <Button
                size="lg"
                className="w-full mt-4"
                disabled={!canAdvanceToPayment}
                onClick={() => setStep("pago")}
              >
                Continuar al pago
              </Button>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === "pago" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">
                  Método de pago
                </h2>
                <button
                  onClick={() => setStep("datos")}
                  className="text-sm text-forest-700 hover:underline"
                >
                  Editar datos
                </button>
              </div>

              <div className="bg-sand-100 rounded-lg p-4 text-sm">
                <p className="font-medium text-charcoal-800 mb-1">
                  Total a pagar
                </p>
                <p className="text-2xl font-heading font-bold text-charcoal-950">
                  {formatUSD(total)}
                </p>
                <p className="text-charcoal-500">
                  {formatBs(totalBs)} (Tasa: {rate} Bs/$)
                </p>
              </div>

              <PaymentMethodSelector
                selected={paymentMethod}
                onSelect={setPaymentMethod}
              />

              <Button
                size="lg"
                className="w-full"
                disabled={!canAdvanceToProof}
                onClick={() => setStep("comprobante")}
              >
                Continuar
              </Button>
            </div>
          )}

          {/* Step 3: Payment Proof */}
          {step === "comprobante" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl font-semibold">
                  Comprobante de pago
                </h2>
                <button
                  onClick={() => setStep("pago")}
                  className="text-sm text-forest-700 hover:underline"
                >
                  Cambiar método
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p>
                  Realiza tu pago con los datos mostrados en el paso anterior y
                  luego sube el comprobante aquí. Verificaremos tu pago en un
                  máximo de 24 horas.
                </p>
              </div>

              {paymentMethod && (
                <PaymentProofUpload
                  paymentMethod={paymentMethod}
                  onFileChange={setProofFile}
                  onReferenceChange={setRefNumber}
                  onAmountChange={setDeclaredAmount}
                  reference={refNumber}
                  amount={declaredAmount}
                />
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-800">
                  {error}
                </div>
              )}

              <Button
                size="lg"
                className="w-full"
                disabled={!canSubmit || isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Confirmar pedido
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="bg-white rounded-lg border border-charcoal-200 p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-heading text-lg font-semibold mb-4">
            Tu pedido
          </h3>
          <div className="space-y-3 mb-4">
            {items.map((item) => {
              const price =
                item.variant.price_override_usd ?? item.product.base_price_usd;
              return (
                <div
                  key={item.variant.id}
                  className="flex justify-between text-sm"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <p className="text-charcoal-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-charcoal-500">
                      {item.variant.color} / {item.variant.size} x{" "}
                      {item.quantity}
                    </p>
                  </div>
                  <span className="font-medium shrink-0">
                    {formatUSD(price * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-charcoal-200 pt-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-charcoal-500">Subtotal</span>
              <span>{formatUSD(total)}</span>
            </div>
            <div className="flex justify-between text-sm text-charcoal-500">
              <span>En bolívares</span>
              <span>{formatBs(totalBs)}</span>
            </div>
            <div className="text-xs text-charcoal-400">Tasa: {rate} Bs/$</div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t border-charcoal-200">
              <span>Total</span>
              <span className="font-heading">{formatUSD(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
