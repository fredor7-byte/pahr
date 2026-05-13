"use client";

import { cn } from "@/lib/utils";
import { PAYMENT_METHODS, type PaymentMethod } from "@/lib/constants";
import { Banknote, DollarSign, Bitcoin } from "lucide-react";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod | "";
  onSelect: (method: PaymentMethod) => void;
}

const icons: Record<PaymentMethod, React.ReactNode> = {
  pago_movil: <Banknote className="h-5 w-5" />,
  zelle: <DollarSign className="h-5 w-5" />,
  binance: <Bitcoin className="h-5 w-5" />,
};

const paymentDetails: Record<PaymentMethod, { fields: { label: string; value: string }[] }> = {
  pago_movil: {
    fields: [
      { label: "Banco", value: "BNC" },
      { label: "Cédula", value: "V-21.482.111" },
      { label: "Teléfono", value: "0412-2779627" },
    ],
  },
  zelle: {
    fields: [
      { label: "Email", value: "Fjsantos1993@gmail.com" },
    ],
  },
  binance: {
    fields: [
      { label: "Binance ID", value: "912451272" },
      { label: "Alias", value: "Pahr Shop" },
    ],
  },
};

export function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-charcoal-700">
        Método de pago
      </h3>
      <div className="grid gap-3">
        {(Object.entries(PAYMENT_METHODS) as [PaymentMethod, (typeof PAYMENT_METHODS)[PaymentMethod]][]).map(
          ([key, method]) => (
            <div key={key}>
              <button
                type="button"
                onClick={() => onSelect(key)}
                className={cn(
                  "w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all text-left",
                  selected === key
                    ? "border-gold-500 bg-amber-50"
                    : "border-charcoal-200 hover:border-charcoal-300"
                )}
              >
                <div
                  className={cn(
                    "shrink-0",
                    selected === key ? "text-gold-600" : "text-charcoal-400"
                  )}
                >
                  {icons[key]}
                </div>
                <div>
                  <p className="font-medium text-charcoal-900">
                    {method.label}
                  </p>
                  <p className="text-xs text-charcoal-500">
                    {method.currency === "VES" ? "Bolívares" : "Dólares"}
                  </p>
                </div>
              </button>

              {/* Payment details */}
              {selected === key && (
                <div className="mt-2 ml-1 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs font-medium text-charcoal-700 mb-2 uppercase tracking-wider">
                    Datos para el pago
                  </p>
                  <div className="space-y-1.5">
                    {paymentDetails[key].fields.map((field) => (
                      <div key={field.label} className="flex justify-between text-sm gap-3">
                        <span className="text-charcoal-500 shrink-0">{field.label}</span>
                        <span className="font-mono text-charcoal-900 select-all text-right break-all">
                          {field.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
