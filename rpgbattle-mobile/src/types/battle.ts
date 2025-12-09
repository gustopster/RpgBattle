export interface Battle {
  id: number;
  player1Id: number;
  player2Id?: number | null;
  player1Hp: number;
  player2Hp: number;
  turnUserId: number;
  status: string;
  createdAt: string;
  finishedAt?: string | null;
  turnStartedAt?: string | null;
  expiresAt?: string | null;
}
