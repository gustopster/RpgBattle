import { useEffect, useState } from "react";
import { Battle } from "../types/battle";
import { battleService } from "../services/battleService";

export function useBattles() {
  const [battles, setBattles] = useState<Battle[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadBattles() {
    try {
      setLoading(true);
      const data = await battleService.getBattles();
      setBattles(data);
    } catch (error) {
      console.error("Erro ao buscar batalhas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBattles();
  }, []);

  return {
    battles,
    loading,
    reload: loadBattles,
  };
}
