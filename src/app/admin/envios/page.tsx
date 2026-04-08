"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Truck } from "lucide-react";

const mockShipments = [
  { order_number: "PAHR-00002", customer: "María González", status: "preparando", carrier: "—", tracking: "—", date: "2024-04-06" },
  { order_number: "PAHR-00003", customer: "Andrés Martínez", status: "en_transito", carrier: "MRW", tracking: "MRW-123456", date: "2024-04-05" },
  { order_number: "PAHR-00005", customer: "Diego Herrera", status: "preparando", carrier: "—", tracking: "—", date: "2024-04-07" },
];

const statusBadge: Record<string, { label: string; variant: "warning" | "info" | "success" }> = {
  preparando: { label: "Preparando", variant: "warning" },
  en_transito: { label: "En tránsito", variant: "info" },
  entregado: { label: "Entregado", variant: "success" },
};

export default function EnviosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Envíos
        </h1>
        <p className="text-sm text-charcoal-500">
          Gestiona tracking y estado de envíos
        </p>
      </div>

      <div className="bg-white rounded-lg border border-charcoal-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pedido</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Carrier</TableHead>
              <TableHead>Tracking</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockShipments.map((s) => (
              <TableRow key={s.order_number}>
                <TableCell className="font-mono text-sm text-forest-700">
                  {s.order_number}
                </TableCell>
                <TableCell className="text-sm">{s.customer}</TableCell>
                <TableCell>
                  <Badge variant={statusBadge[s.status].variant}>
                    {statusBadge[s.status].label}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{s.carrier}</TableCell>
                <TableCell className="font-mono text-xs text-charcoal-500">
                  {s.tracking}
                </TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {new Date(s.date).toLocaleDateString("es-VE", {
                    day: "2-digit",
                    month: "short",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      alert(`Agregar tracking a ${s.order_number} (mock)`)
                    }
                  >
                    <Truck className="h-3.5 w-3.5 mr-1" />
                    {s.status === "preparando" ? "Agregar tracking" : "Actualizar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
