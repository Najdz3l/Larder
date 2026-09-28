export type Status = "have" | "low" | "out";

export interface Item {
  id: string;
  name: string;
  status: Status;
  qty: number | null;
  unit: string | null;
  note: string | null;
}

export interface Category {
  id: string;
  name: string;
  items: Item[];
}

export interface List {
  id: string;
  name: string;
  categories: Category[];
}

export interface AppState {
  version: 1;
  lists: List[];
  cart: string[];
}

export interface ItemDetailsPatch {
  qty?: number | null;
  unit?: string | null;
  note?: string | null;
}
