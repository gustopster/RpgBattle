import { api } from "./api";
import { Battle } from "../types/battle";

export const battleService = {
  async getBattles(): Promise<Battle[]> {
    const response = await api.get("/battles");
    return response.data;
  },
};
