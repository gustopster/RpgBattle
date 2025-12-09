import { User } from "../types/uset";

export async function getUsers(): Promise<User[]> {
  return [
    { id: 1, nickname: "PlayerOne" },
    { id: 2, nickname: "PlayerTwo" },
  ];
}
