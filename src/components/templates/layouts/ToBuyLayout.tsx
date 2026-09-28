import type React from "react";
import type { Item } from "@lib/types";
import { useLarderStore } from "@lib/store/larderStore";
import { Top } from "@components/molecules/Top";
import { AddEntryForm } from "@components/molecules/AddEntryForm";
import { BuyGroup } from "@components/organisms/BuyGroup";

const byMissingFirst = (a: Item, b: Item): number => Number(b.status === "out") - Number(a.status === "out");

export const ToBuyLayout: React.FC = () => {
  const lists = useLarderStore((state) => state.lists);
  const cart = useLarderStore((state) => state.cart);
  const toggleCartItem = useLarderStore((state) => state.toggleCartItem);
  const confirmCart = useLarderStore((state) => state.confirmCart);
  const addToShoppingList = useLarderStore((state) => state.addToShoppingList);

  const groups = lists.flatMap((list) =>
    list.categories
      .map((category) => ({
        key: category.id,
        title: `${list.name}, ${category.name}`,
        items: category.items.filter((item) => item.status !== "have").sort(byMissingFirst),
      }))
      .filter((group) => group.items.length > 0),
  );

  return (
    <>
      <Top title="Do kupienia" />
      <AddEntryForm placeholder="Dopisz coś, czego nie ma na listach" onSubmit={addToShoppingList} />
      {cart.length > 0 && (
        <button type="button" className="confirm-btn" onClick={confirmCart}>
          Zatwierdź zakupy ({cart.length})
        </button>
      )}
      {groups.length === 0 ? (
        <div className="empty">Wszystko masz. Nic do kupienia.</div>
      ) : (
        <>
          {groups.map((group) => (
            <BuyGroup key={group.key} title={group.title} items={group.items} cart={cart} onToggle={toggleCartItem} />
          ))}
          <div className="hint">
            Zaznacz to, co włożysz do koszyka. Możesz odznaczyć w każdej chwili, a na koniec zatwierdź zakupy.
          </div>
        </>
      )}
    </>
  );
};
