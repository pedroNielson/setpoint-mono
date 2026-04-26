type Categoria = {
  id: string;
  type: TipoCategoria;
  category: string;
  slots: number;
  price: number;
  selected: boolean;
};

type TipoCategoria = "masculino" | "feminino" | "mista";

export type { Categoria, TipoCategoria };

export type EventForm = {
  name: string;
  description: string;
  type: string;
  date: string;
  hour: string;
  receipt: number;
  payed_receipt: number;
  confirmed_players: number;
  max_slots: number;
  progress?: number;
  duration?: number;
  categories: Categoria[];
  status?: "scheduled" | "pending" | "completed" | "cancelled";
};

export type Evento = EventForm & {
  _id: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
};
