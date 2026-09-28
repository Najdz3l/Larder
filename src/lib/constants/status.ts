import type { Status } from "@lib/types";

export const STATUS_ORDER: Record<Status, Status> = {
  have: "low",
  low: "out",
  out: "have",
};

export const STATUS_LABEL: Record<Status, string> = {
  have: "Mam",
  low: "Mało",
  out: "Brak",
};
