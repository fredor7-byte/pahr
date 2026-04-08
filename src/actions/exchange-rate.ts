"use server";

import { createClient } from "@/lib/supabase/server";

export async function getCurrentExchangeRate(): Promise<{
  id: string;
  rate_bs_per_usd: number;
  is_current: boolean;
  created_at: string;
} | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("exchange_rates")
    .select("*")
    .eq("is_current", true)
    .single();

  if (error || !data) {
    // Fallback: return a default rate if none is set
    return {
      id: "default",
      rate_bs_per_usd: 86.5,
      is_current: true,
      created_at: new Date().toISOString(),
    };
  }

  return data;
}
