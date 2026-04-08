"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { DollarSign, Save } from "lucide-react";

const mockHistory = [
  { id: "r1", rate: 36.50, notes: "Tasa del día", set_by: "Admin", created_at: "2024-04-07T09:00:00", is_current: true },
  { id: "r2", rate: 36.20, notes: "Actualización matutina", set_by: "Admin", created_at: "2024-04-06T08:30:00", is_current: false },
  { id: "r3", rate: 35.80, notes: "Tasa BCV", set_by: "Admin", created_at: "2024-04-05T09:15:00", is_current: false },
  { id: "r4", rate: 35.50, notes: null, set_by: "Admin", created_at: "2024-04-04T10:00:00", is_current: false },
  { id: "r5", rate: 35.30, notes: "Tasa de apertura", set_by: "Admin", created_at: "2024-04-03T08:45:00", is_current: false },
];

export default function TasaPage() {
  const [newRate, setNewRate] = useState("");
  const [notes, setNotes] = useState("");
  const currentRate = mockHistory.find((r) => r.is_current);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Tasa actualizada a ${newRate} Bs/$ (mock)`);
    setNewRate("");
    setNotes("");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-semibold text-charcoal-950">
          Tasa Bs/$
        </h1>
        <p className="text-sm text-charcoal-500">
          Actualiza la tasa de cambio para los precios en bolívares
        </p>
      </div>

      {/* Current Rate */}
      <div className="bg-white rounded-lg border-2 border-forest-300 p-6">
        <div className="flex items-center gap-3 mb-1">
          <DollarSign className="h-6 w-6 text-forest-600" />
          <span className="text-sm text-charcoal-500">Tasa actual</span>
          <Badge variant="success">Vigente</Badge>
        </div>
        <p className="text-4xl font-heading font-bold text-charcoal-950">
          {currentRate?.rate} <span className="text-lg text-charcoal-500">Bs/$</span>
        </p>
        <p className="text-xs text-charcoal-400 mt-1">
          Actualizada: {currentRate && new Date(currentRate.created_at).toLocaleString("es-VE")}
          {currentRate?.notes && ` — ${currentRate.notes}`}
        </p>
      </div>

      {/* Update Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg border border-charcoal-200 p-6 space-y-4"
      >
        <h2 className="font-heading text-lg font-semibold">
          Actualizar tasa
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-charcoal-700">
              Nueva tasa (Bs/$)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-charcoal-400">
                Bs.
              </span>
              <input
                type="number"
                step="0.01"
                min="0"
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                placeholder="36.50"
                className="flex h-10 w-full rounded-md border border-charcoal-300 bg-white pl-10 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-1"
                required
              />
            </div>
          </div>
          <Textarea
            id="notes"
            label="Notas (opcional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Ej: Tasa BCV del día"
            rows={1}
          />
        </div>
        <Button type="submit" disabled={!newRate}>
          <Save className="h-4 w-4 mr-2" />
          Guardar nueva tasa
        </Button>
      </form>

      {/* History */}
      <div className="bg-white rounded-lg border border-charcoal-200">
        <div className="p-4 border-b border-charcoal-200">
          <h3 className="font-heading text-lg font-semibold">
            Historial de tasas
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tasa (Bs/$)</TableHead>
              <TableHead>Notas</TableHead>
              <TableHead>Actualizada por</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((rate) => (
              <TableRow key={rate.id}>
                <TableCell className="font-mono font-medium">
                  {rate.rate}
                </TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {rate.notes ?? "—"}
                </TableCell>
                <TableCell className="text-sm">{rate.set_by}</TableCell>
                <TableCell className="text-sm text-charcoal-500">
                  {new Date(rate.created_at).toLocaleString("es-VE", {
                    day: "2-digit",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  {rate.is_current && <Badge variant="success">Vigente</Badge>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
