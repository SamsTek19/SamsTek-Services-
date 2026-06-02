import { useCallback, useEffect, useState } from "react";
import { demoTutorials } from "../data/demoTutorials";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Tutorial } from "../lib/types";

export function useTutorials(includeInactive = false) {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTutorials = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured || !supabase) {
      const filtered = includeInactive
        ? demoTutorials
        : demoTutorials.filter((t) => t.is_active);
      setTutorials(filtered);
      setLoading(false);
      return;
    }

    let query = supabase.from("tutorials").select("*").order("created_at", { ascending: true });

    if (!includeInactive) {
      query = query.eq("is_active", true);
    }

    const { data, error: fetchError } = await query;

    if (fetchError) {
      setError(fetchError.message);
      setTutorials(includeInactive ? demoTutorials : demoTutorials.filter((t) => t.is_active));
    } else {
      setTutorials((data as Tutorial[]) ?? []);
    }

    setLoading(false);
  }, [includeInactive]);

  useEffect(() => {
    fetchTutorials();
  }, [fetchTutorials]);

  return { tutorials, loading, error, refetch: fetchTutorials };
}
