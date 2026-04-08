import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatBs(amount: number): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "VES",
    minimumFractionDigits: 2,
  }).format(amount);
}

export function convertToBs(usd: number, rate: number): number {
  return usd * rate;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function generateSKU(
  brand: string,
  category: string,
  color: string,
  size: string
): string {
  const b = brand.substring(0, 4).toUpperCase();
  const cat = category.substring(0, 3).toUpperCase();
  const col = color.substring(0, 3).toUpperCase();
  const s = size.toUpperCase();
  return `${b}-${cat}-${col}-${s}`;
}
