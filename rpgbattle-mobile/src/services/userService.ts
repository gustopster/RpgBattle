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

export async function getUsers(): Promise<User[]> {
  try {
    const res = await api.get(`/users`);
    if (!res.data) return [];
    const users: User[] = res.data;
    return users;
  } catch (error) {
    console.error(error);
    return [];
  }
}
