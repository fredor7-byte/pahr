"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
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

interface ExchangeRate {
  id: string;
  rate: number;
  notes: string | null;
  set_by: string | null;
  created_at: string;
  is_current: boolean;
}

export default function TasaPage() {
  const [newRate, setNewRate] = useState("");
  const [notes, setNotes] = useState("");
  const [history, setHistory] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRates = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("exchange_rates")
      .select("id, rate, notes, set_by, created_at, is_current")
      .order("created_at", { ascending: false })
      .limit(20);
    setHistory(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const currentRate = history.find((r) => r.is_current);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();

    // Mark all current rates as not current
    await supabase
      .from("exchange_rates")
      .update({ is_current: false })
      .eq("is_current", true);

    // Insert new rate
    const { error } = await supabase.from("exchange_rates").insert({
      rate: parseFloat(newRate),
      notes: notes || null,
      is_current: true,
    });

    if (error) {
      alert("Error al guardar la tasa: " + error.message);
      return;
    }

    setNewRate("");
    setNotes("");
    fetchRates();
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
          {currentRate && <Badge variant="success">Vigente</Badge>}
        </div>
        <p className="text-4xl font-heading font-bold text-charcoal-950">
          {loading ? "..." : currentRate?.rate ?? "Sin tasa"}{" "}
          <span className="text-lg text-charcoal-500">Bs/$</span>
        </p>
        <p className="text-xs text-charcoal-400 mt-1">
          {currentRate
            ? `Actualizada: ${new Date(currentRate.created_at).toLocaleString("es-VE")}${currentRate.notes ? ` — ${currentRate.notes}` : ""}`
            : "No se ha configurado una tasa aún"}
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-charcoal-400 py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : history.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-charcoal-400 py-8">
                  No hay historial de tasas
                </TableCell>
              </TableRow>
            ) : (
              history.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell className="font-mono font-medium">
                    {rate.rate}
                  </TableCell>
                  <TableCell className="text-sm text-charcoal-500">
                    {rate.notes ?? "—"}
                  </TableCell>
                  <TableCell className="text-sm">{rate.set_by ?? "—"}</TableCell>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
