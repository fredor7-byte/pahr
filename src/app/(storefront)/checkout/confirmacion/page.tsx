"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Mail } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

function ConfirmacionContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") ?? "PAHR-00000";

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="mb-8">
        <div className="w-16 h-16 bg-forest-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-forest-600" />
        </div>
        <h1 className="font-heading text-3xl font-semibold text-charcoal-950 mb-2">
          Pedido recibido
        </h1>
        <p className="text-charcoal-500">
          Gracias por tu compra. Tu pedido ha sido registrado exitosamente.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-charcoal-200 p-6 mb-8 text-left">
        <div className="text-center mb-6">
          <p className="text-sm text-charcoal-500">Número de pedido</p>
          <p className="font-heading text-2xl font-bold text-forest-700 mt-1">
            {orderNumber}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 p-3 bg-sand-50 rounded-lg">
            <Mail className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-charcoal-900">
                Verificación de pago
              </p>
              <p className="text-sm text-charcoal-500">
                Estamos verificando tu comprobante de pago. Te notificaremos por
                email cuando sea aprobado. Este proceso puede tomar hasta 24
                horas hábiles.
              </p>
            </div>
          </div>

          <div className="flex gap-3 p-3 bg-sand-50 rounded-lg">
            <Package className="h-5 w-5 text-forest-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm text-charcoal-900">
                Preparación y envío
              </p>
              <p className="text-sm text-charcoal-500">
                Una vez verificado el pago, prepararemos tu pedido y te
                enviaremos los datos de tracking por email.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href={`/pedido/${orderNumber}`}>
          <Button variant="outline">Seguir mi pedido</Button>
        </Link>
        <Link href="/catalogo">
          <Button>Seguir comprando</Button>
        </Link>
      </div>
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <Skeleton className="w-16 h-16 rounded-full mx-auto mb-6" />
          <Skeleton className="h-8 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      }
    >
      <ConfirmacionContent />
    </Suspense>
  );
}
