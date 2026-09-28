import type React from "react";
import type { Item } from "@lib/types";
import { StatusPill } from "@components/atoms/StatusPill";
import { formatQty } from "@lib/helpers/formatQty";

export interface BuyRowProps {
  item: Item;
  checked: boolean;
  onToggle: () => void;
}

export const BuyRow: React.FC<BuyRowProps> = ({ item, checked, onToggle }) => {
  const hasMeta = item.qty !== null || Boolean(item.note);

  return (
    <button
      type="button"
      className={`buy-row${checked ? " buy-row-checked" : ""}`}
      aria-pressed={checked}
      onClick={onToggle}
    >
      <span className={`checkbox${checked ? " checkbox-on" : ""}`} aria-hidden="true" />
      <span className="nm">
        <span className="nmtxt">{item.name}</span>
        {hasMeta && (
          <span className="meta">
            {item.qty !== null && (
              <span className="qty">
                {formatQty(item.qty)}
                {item.unit ? ` ${item.unit}` : ""}
              </span>
            )}
            {item.note && <span className="note">{item.note}</span>}
          </span>
        )}
      </span>
      <StatusPill status={item.status} />
    </button>
  );
};
