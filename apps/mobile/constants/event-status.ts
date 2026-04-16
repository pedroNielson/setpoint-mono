export type EventoStatus = "pending" | "cancelled" | "scheduled" | "completed";

export interface StatusConfig {
  label: string;
  backgroundColor: string;
  textColor: string;
  dotColor: string;
  borderColor: string;
}

export const STATUS_CONFIG: Record<EventoStatus, StatusConfig> = {
  pending: {
    label: "Pendente",
    backgroundColor: "#FFF8E1",
    textColor: "#E65100",
    dotColor: "#FFB300",
    borderColor: "#FFB300",
  },
  scheduled: {
    label: "Agendado",
    backgroundColor: "#E8F5E9",
    textColor: "#1B5E20",
    dotColor: "#43A047",
    borderColor: "#43A047",
  },
  completed: {
    label: "Concluído",
    backgroundColor: "#E3F2FD",
    textColor: "#0D47A1",
    dotColor: "#1E88E5",
    borderColor: "#1E88E5",
  },
  cancelled: {
    label: "Cancelado",
    backgroundColor: "#FFEBEE",
    textColor: "#B71C1C",
    dotColor: "#E53935",
    borderColor: "#E53935",
  },
};

export const FALLBACK_STATUS: StatusConfig = {
  label: "Indefinido",
  backgroundColor: "#F5F5F5",
  textColor: "#424242",
  dotColor: "#BDBDBD",
  borderColor: "#BDBDBD",
};

export function getStatusConfig(status: string): StatusConfig {
  return STATUS_CONFIG[status as EventoStatus] ?? FALLBACK_STATUS;
}
