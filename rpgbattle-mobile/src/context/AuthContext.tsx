import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/uset";

interface AuthContextData {
  accounts: User[];
  activeUser: User | null;
  addAccount: (user: User) => Promise<void>;
  switchAccount: (userId: number) => Promise<void>;
  removeAccount: (userId: number) => Promise<void>;
  logoutAll: () => Promise<void>;
  loading: boolean;
  openAccountModal: () => void;
  closeAccountModal: () => void;
  isAccountModalOpen: boolean;
  loginMode: "login" | "add";
  setLoginMode: (mode: "login" | "add") => void;
  setActiveUser: (user: User | null) => void;
}

const STORAGE_KEY = "@auth_state";

const AuthContext = createContext({} as AuthContextData);

interface StoredAuthState {
  accounts: User[];
  activeUserId: number | null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accounts, setAccounts] = useState<User[]>([]);
  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [loginMode, setLoginMode] = useState<"login" | "add">("login");

  useEffect(() => {
    loadAuthState();
  }, []);

  async function loadAuthState() {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed: StoredAuthState = JSON.parse(stored);
      setAccounts(parsed.accounts);

      const user = parsed.accounts.find(
        u => u.id === parsed.activeUserId
      );

      setActiveUser(user ?? null);
    } finally {
      setLoading(false);
    }
  }

  async function persistState(
    nextAccounts: User[],
    activeUserId: number | null
  ) {
    const data: StoredAuthState = {
      accounts: nextAccounts,
      activeUserId,
    };

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  async function addAccount(user: User) {
    setAccounts(prev => {
      const exists = prev.some(u => u.id === user.id);
      const updated = exists ? prev : [...prev, user];
      persistState(updated, user.id);
      return updated;
    });

    setActiveUser(user);
  }

  async function switchAccount(userId: number) {
    const user = accounts.find(u => u.id === userId);
    if (!user) return;

    setActiveUser(user);
    await persistState(accounts, userId);
  }

  async function removeAccount(userId: number) {
    const updated = accounts.filter(u => u.id !== userId);

    const nextActive =
      updated.length > 0 ? updated[0] : null;

    setAccounts(updated);
    setActiveUser(nextActive);

    await persistState(updated, nextActive?.id ?? null);
  }


  async function logoutAll() {
    setAccounts([]);
    setActiveUser(null);
    closeAccountModal();
    await AsyncStorage.removeItem(STORAGE_KEY);
  }


  const [isAccountModalOpen, setAccountModalOpen] = useState(false);

  function openAccountModal() {
    setAccountModalOpen(true);
  }

  function closeAccountModal() {
    setAccountModalOpen(false);
  }

  return (
    <AuthContext.Provider
      value={{
        accounts,
        activeUser,
        addAccount,
        switchAccount,
        removeAccount,
        logoutAll,
        loading,
        openAccountModal,
        closeAccountModal,
        isAccountModalOpen,
        loginMode,
        setLoginMode,
        setActiveUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
