import { useCallback, useEffect, useState } from "react";
import { demoTutorials } from "../data/demoTutorials";
import { tutorialFromRow } from "../lib/dbMappers";
import { applyTutorialEnrollmentStatus } from "../lib/tutorials";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Tutorial } from "../lib/types";

function normalizeTutorials(list: Tutorial[]) {
  return list.map(applyTutorialEnrollmentStatus);
}

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
      setTutorials(normalizeTutorials(filtered));
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("tutorials")
      .select("*")
      .order("created_at", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setTutorials(
        normalizeTutorials(includeInactive ? demoTutorials : demoTutorials.filter((t) => t.is_active)),
      );
    } else {
      const mapped = (data ?? []).map((row) => tutorialFromRow(row));
      const filtered = includeInactive ? mapped : mapped.filter((t) => t.is_active);
      setTutorials(normalizeTutorials(filtered));
    }

    setLoading(false);
  }, [includeInactive]);

  useEffect(() => {
    fetchTutorials();
  }, [fetchTutorials]);

  return { tutorials, loading, error, refetch: fetchTutorials };
}
