"use client";

import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";

export default function EnviosActions({
  orderNumber,
  status,
}: {
  orderNumber: string;
  status: string;
}) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() =>
        alert(`Agregar tracking a ${orderNumber}`)
      }
    >
      <Truck className="h-3.5 w-3.5 mr-1" />
      {status === "pago_verificado" || status === "en_preparacion"
        ? "Agregar tracking"
        : "Actualizar"}
    </Button>
  );
}
