"use client";

import { cn } from "@/lib/utils";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useState, type ChangeEvent, type DragEvent } from "react";

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  preview?: string | null;
  onRemove?: () => void;
  className?: string;
  label?: string;
}

export function ImageUpload({
  onFileSelect,
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
  preview,
  onRemove,
  className,
  label = "Arrastra una imagen o haz clic para seleccionar",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      setError(null);
      if (file.size > maxSize) {
        setError(
          `El archivo excede el tamaño máximo de ${Math.round(maxSize / 1024 / 1024)}MB`
        );
        return;
      }
      onFileSelect(file);
    },
    [maxSize, onFileSelect]
  );

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  if (preview) {
    return (
      <div className={cn("relative rounded-md overflow-hidden", className)}>
        <Image
          src={preview}
          alt="Preview"
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        {onRemove && (
          <button
            onClick={onRemove}
            className="absolute top-2 right-2 rounded-full bg-charcoal-900/70 p-1 text-white hover:bg-charcoal-900"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed p-6 cursor-pointer transition-colors",
          isDragging
            ? "border-forest-500 bg-forest-50"
            : "border-charcoal-300 hover:border-forest-400 hover:bg-sand-100",
          className
        )}
      >
        <Upload className="h-8 w-8 text-charcoal-400" />
        <span className="text-sm text-charcoal-500 text-center">{label}</span>
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          className="sr-only"
        />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
