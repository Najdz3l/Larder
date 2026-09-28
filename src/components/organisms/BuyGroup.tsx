import type React from "react";
import type { Item } from "@lib/types";
import { BuyRow } from "@components/molecules/BuyRow";

export interface BuyGroupProps {
  title: string;
  items: Item[];
  cart: string[];
  onToggle: (itemId: string) => void;
}

export const BuyGroup: React.FC<BuyGroupProps> = ({ title, items, cart, onToggle }) => {
  return (
    <section>
      <div className="grp">{title}</div>
      <div className="buy-list">
        {items.map((item) => (
          <BuyRow key={item.id} item={item} checked={cart.includes(item.id)} onToggle={() => onToggle(item.id)} />
        ))}
      </div>
    </section>
  );
};
