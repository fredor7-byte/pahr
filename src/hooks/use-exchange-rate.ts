"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const DEFAULT_RATE = 86.5;

export function useExchangeRate() {
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("exchange_rates")
          .select("rate_bs_per_usd")
          .eq("is_current", true)
          .single();

        if (!error && data) {
          setRate(data.rate_bs_per_usd);
        }
      } catch {
        // Use default rate
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, []);

  return { rate, loading };
}
