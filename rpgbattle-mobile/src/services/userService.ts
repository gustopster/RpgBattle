import { User } from "../types/uset";
import { api } from "./api"
export async function loginUser(nickname: string): Promise<User | null> {
  try {
    const res = await api.get(`/Users/login`, { params: { nickname } });
    if (!res.data) return null;
    const user: User = res.data;
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
