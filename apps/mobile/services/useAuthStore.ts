import { create } from "zustand";
import { Platform } from "react-native";
import { api } from "./api";

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "@setpoint:auth";

interface User {
  username: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  tokenTimestamp: number | null;
  isLoading: boolean;
  isHydrated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

function saveToStorage(token: string, user: User, tokenTimestamp: number) {
  if (Platform.OS !== "web") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ token, user, tokenTimestamp }),
    );
  } catch {}
}

function clearStorage() {
  if (Platform.OS !== "web") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

function loadFromStorage(): {
  token: string;
  user: User;
  tokenTimestamp: number;
} | null {
  if (Platform.OS !== "web") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  tokenTimestamp: null,
  isLoading: false,
  isHydrated: false,

  hydrate: () => {
    const saved = loadFromStorage();

    if (!saved) {
      set({ isHydrated: true });
      return;
    }

    const expired = Date.now() - saved.tokenTimestamp > ONE_DAY_MS;
    if (expired) {
      clearStorage();
      set({ isHydrated: true });
      return;
    }

    set({
      token: saved.token,
      user: saved.user,
      tokenTimestamp: saved.tokenTimestamp,
      isHydrated: true,
    });
  },

  login: async (username, password) => {
    set({ isLoading: true });
    try {
      const { token, user } = await api.auth.login(username, password);

      const tokenTimestamp = Date.now();
      saveToStorage(token, user, tokenTimestamp);

      set({ token, user, tokenTimestamp, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: () => {
    clearStorage();
    set({ token: null, user: null, tokenTimestamp: null });
  },
}));
