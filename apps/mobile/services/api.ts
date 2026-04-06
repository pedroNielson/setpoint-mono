// services/api.ts

import { EventForm, Evento } from "../constants/types";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001";

function headers(token?: string) {
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function handle<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Erro na requisição");
  return data.data ?? data;
}

export const api = {
  auth: {
    login: (username: string, password: string) =>
      fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ username, password }),
      }).then((res) =>
        handle<{ token: string; user: { username: string; role: string } }>(
          res,
        ),
      ),

    me: (token: string) =>
      fetch(`${API_URL}/auth/me`, {
        headers: headers(token),
      }).then((res) =>
        handle<{ user: { username: string; role: string } }>(res),
      ),
  },

  events: {
    getAll: (token: string) =>
      fetch(`${API_URL}/events`, {
        headers: headers(token),
      }).then((res) => handle<Evento[]>(res)),

    getById: (token: string, id: string) =>
      fetch(`${API_URL}/events/${id}`, {
        headers: headers(token),
      }).then((res) => handle<Evento>(res)),

    create: (token: string, form: EventForm) =>
      fetch(`${API_URL}/events`, {
        method: "POST",
        headers: headers(token),
        body: JSON.stringify(form),
      }).then((res) => handle<Evento>(res)),

    update: (token: string, id: string, form: Partial<EventForm>) =>
      fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: headers(token),
        body: JSON.stringify(form),
      }).then((res) => handle<Evento>(res)),

    remove: (token: string, id: string) =>
      fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: headers(token),
      }).then((res) => handle<void>(res)),
  },
};
