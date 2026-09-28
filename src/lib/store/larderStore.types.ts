import type { AppState, ItemDetailsPatch } from "@lib/types";

export interface LarderActions {
  addList: (name: string) => void;
  deleteList: (listId: string) => void;
  addCategory: (listId: string, name: string) => void;
  deleteCategory: (listId: string, categoryId: string) => void;
  addItem: (listId: string, categoryId: string, name: string) => void;
  deleteItem: (listId: string, categoryId: string, itemId: string) => void;
  cycleStatus: (itemId: string) => void;
  setItemDetails: (itemId: string, patch: ItemDetailsPatch) => void;
  toggleCartItem: (itemId: string) => void;
  confirmCart: () => void;
  addToShoppingList: (name: string) => void;
}

export type LarderStore = AppState & LarderActions;
