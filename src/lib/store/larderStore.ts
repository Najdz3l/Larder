import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AppState, Category, Item, List, Status } from "@lib/types";
import type { LarderStore } from "./larderStore.types";
import { STATUS_ORDER } from "@lib/constants/status";

const STORAGE_KEY = "larder-storage";
const MISC_CATEGORY_NAME = "Inne";

const uid = (): string => Math.random().toString(36).slice(2, 9);

const createItem = (name: string, status: Status = "have"): Item => ({
  id: uid(),
  name,
  status,
  qty: null,
  unit: null,
  note: null,
});

const createCategory = (name: string): Category => ({
  id: uid(),
  name,
  items: [],
});

const createList = (name: string): List => ({
  id: uid(),
  name,
  categories: [],
});

const initialState: AppState = {
  version: 1,
  lists: [],
  cart: [],
};

export const useLarderStore = create<LarderStore>()(
  persist(
    (set) => ({
      ...initialState,

      addList: (name) => set((state) => ({ lists: [...state.lists, createList(name)] })),

      deleteList: (listId) =>
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== listId),
        })),

      addCategory: (listId, name) =>
        set((state) => ({
          lists: state.lists.map(
            (list): List =>
              list.id === listId ? { ...list, categories: [...list.categories, createCategory(name)] } : list,
          ),
        })),

      deleteCategory: (listId, categoryId) =>
        set((state) => ({
          lists: state.lists.map(
            (list): List =>
              list.id === listId
                ? {
                    ...list,
                    categories: list.categories.filter((category) => category.id !== categoryId),
                  }
                : list,
          ),
        })),

      addItem: (listId, categoryId, name) =>
        set((state) => ({
          lists: state.lists.map(
            (list): List =>
              list.id === listId
                ? {
                    ...list,
                    categories: list.categories.map(
                      (category): Category =>
                        category.id === categoryId
                          ? { ...category, items: [...category.items, createItem(name)] }
                          : category,
                    ),
                  }
                : list,
          ),
        })),

      deleteItem: (listId, categoryId, itemId) =>
        set((state) => ({
          lists: state.lists.map(
            (list): List =>
              list.id === listId
                ? {
                    ...list,
                    categories: list.categories.map(
                      (category): Category =>
                        category.id === categoryId
                          ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
                          : category,
                    ),
                  }
                : list,
          ),
          cart: state.cart.filter((id) => id !== itemId),
        })),

      cycleStatus: (itemId) =>
        set((state) => ({
          lists: state.lists.map(
            (list): List => ({
              ...list,
              categories: list.categories.map(
                (category): Category => ({
                  ...category,
                  items: category.items.map(
                    (item): Item => (item.id === itemId ? { ...item, status: STATUS_ORDER[item.status] } : item),
                  ),
                }),
              ),
            }),
          ),
        })),

      setItemDetails: (itemId, patch) =>
        set((state) => ({
          lists: state.lists.map(
            (list): List => ({
              ...list,
              categories: list.categories.map(
                (category): Category => ({
                  ...category,
                  items: category.items.map((item): Item => (item.id === itemId ? { ...item, ...patch } : item)),
                }),
              ),
            }),
          ),
        })),

      toggleCartItem: (itemId) =>
        set((state) => ({
          cart: state.cart.includes(itemId) ? state.cart.filter((id) => id !== itemId) : [...state.cart, itemId],
        })),

      confirmCart: () =>
        set((state) => ({
          lists: state.lists.map(
            (list): List => ({
              ...list,
              categories: list.categories.map(
                (category): Category => ({
                  ...category,
                  items: category.items.map(
                    (item): Item => (state.cart.includes(item.id) ? { ...item, status: "have" } : item),
                  ),
                }),
              ),
            }),
          ),
          cart: [],
        })),

      addToShoppingList: (name) =>
        set((state) => {
          const targetList = state.lists[0];

          if (!targetList) {
            const category = createCategory(MISC_CATEGORY_NAME);
            category.items.push(createItem(name, "out"));
            const list = createList("Zakupy");
            list.categories.push(category);
            return { lists: [list] };
          }

          const existingMisc = targetList.categories.find((category) => category.name === MISC_CATEGORY_NAME);

          const updatedCategories: Category[] = existingMisc
            ? targetList.categories.map(
                (category): Category =>
                  category.id === existingMisc.id
                    ? { ...category, items: [...category.items, createItem(name, "out")] }
                    : category,
              )
            : [
                ...targetList.categories,
                (() => {
                  const category = createCategory(MISC_CATEGORY_NAME);
                  category.items.push(createItem(name, "out"));
                  return category;
                })(),
              ];

          return {
            lists: state.lists.map(
              (list): List => (list.id === targetList.id ? { ...list, categories: updatedCategories } : list),
            ),
          };
        }),
    }),
    { name: STORAGE_KEY },
  ),
);
