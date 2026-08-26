import { useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { MUG_DATA } from "../data/mugs";

function fromRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    stateId: row.state_id ?? undefined,
    lat: row.lat ?? undefined,
    lon: row.lon ?? undefined,
    group: row.group ?? undefined,
  };
}

export function useMugs() {
  const [mugs, setMugs] = useState(isSupabaseConfigured ? [] : MUG_DATA);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    let cancelled = false;

    async function load() {
      const { data, error: fetchError } = await supabase
        .from("mugs")
        .select("*")
        .order("sort_order", { ascending: true });

      if (cancelled) return;

      if (fetchError) {
        console.error("Failed to fetch mugs from Supabase:", fetchError);
        setError(fetchError);
        setMugs(MUG_DATA);
      } else {
        setError(null);
        setMugs(data.map(fromRow));
      }
      setLoading(false);
    }

    load();

    const channel = supabase
      .channel("mugs-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "mugs" },
        () => load()
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  return { mugs, loading, error };
}
