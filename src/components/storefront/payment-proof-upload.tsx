"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/lib/constants";

interface PaymentProofUploadProps {
  paymentMethod: PaymentMethod;
  onFileChange: (file: File | null) => void;
  onReferenceChange: (reference: string) => void;
  onAmountChange: (amount: number) => void;
  reference: string;
  amount: number;
}

export function PaymentProofUpload({
  paymentMethod,
  onFileChange,
  onReferenceChange,
  onAmountChange,
  reference,
  amount,
}: PaymentProofUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const currency = paymentMethod === "zelle" ? "USD" : "Bs";

  const handleFile = useCallback(
    (file: File) => {
      if (file.size > 10 * 1024 * 1024) {
        alert("El archivo excede 10MB");
        return;
      }
      onFileChange(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    },
    [onFileChange]
  );

  const handleRemove = () => {
    onFileChange(null);
    setPreview(null);
    setFileName(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-charcoal-700">
        Comprobante de pago
      </h3>

      {/* File upload */}
      {preview ? (
        <div className="relative">
          <div className="rounded-lg border border-charcoal-200 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Comprobante"
              className="w-full max-h-64 object-contain bg-charcoal-50"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm text-charcoal-600">
              <FileImage className="h-4 w-4" />
              <span className="truncate max-w-xs">{fileName}</span>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <label
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors",
            isDragging
              ? "border-forest-500 bg-forest-50"
              : "border-charcoal-300 hover:border-forest-400 hover:bg-sand-50"
          )}
        >
          <Upload className="h-10 w-10 text-charcoal-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-charcoal-700">
              Sube tu comprobante de pago
            </p>
            <p className="text-xs text-charcoal-400 mt-1">
              Arrastra o haz clic para seleccionar (Max. 10MB)
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="sr-only"
          />
        </label>
      )}

      {/* Reference number */}
      <Input
        id="reference"
        label="Número de referencia"
        placeholder="Ej: 1234567890"
        value={reference}
        onChange={(e) => onReferenceChange(e.target.value)}
      />

      {/* Declared amount */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-charcoal-700">
          Monto pagado ({currency})
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-charcoal-400">
            {currency === "Bs" ? "Bs." : "$"}
          </span>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount || ""}
            onChange={(e) => onAmountChange(parseFloat(e.target.value) || 0)}
            className="flex h-10 w-full rounded-md border border-charcoal-300 bg-white pl-10 pr-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500 focus-visible:ring-offset-1"
          />
        </div>
      </div>
    </div>
  );
}
