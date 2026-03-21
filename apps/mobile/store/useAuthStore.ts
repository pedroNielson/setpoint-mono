import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:3001";
const TOKEN_KEY = "@setpoint:token";
const TOKEN_TIMESTAMP_KEY = "@setpoint:token_timestamp";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

interface User {
  username: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  isHydrated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: false,
  isHydrated: false,

  hydrate: async () => {
    try {
      const [tokenEntry, timestampEntry] = await AsyncStorage.multiGet([
        TOKEN_KEY,
        TOKEN_TIMESTAMP_KEY,
      ]);

      const token = tokenEntry[1];
      const timestamp = timestampEntry[1];

      if (!token || !timestamp) {
        set({ isHydrated: true });
        return;
      }

      const age = Date.now() - parseInt(timestamp, 10);
      if (age > ONE_DAY_MS) {
        await AsyncStorage.multiRemove([TOKEN_KEY, TOKEN_TIMESTAMP_KEY]);
        set({ isHydrated: true });
        return;
      }

      // Token ainda válido — busca os dados do usuário
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        await AsyncStorage.multiRemove([TOKEN_KEY, TOKEN_TIMESTAMP_KEY]);
        set({ isHydrated: true });
        return;
      }

      const data = await res.json();
      set({ token, user: data.user, isHydrated: true });
    } catch {
      set({ isHydrated: true });
    }
  },

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao fazer login");

      await AsyncStorage.multiSet([
        [TOKEN_KEY, data.token],
        [TOKEN_TIMESTAMP_KEY, Date.now().toString()],
      ]);

      set({ token: data.token, user: data.user, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    await AsyncStorage.multiRemove([TOKEN_KEY, TOKEN_TIMESTAMP_KEY]);
    set({ token: null, user: null });
  },
}));
