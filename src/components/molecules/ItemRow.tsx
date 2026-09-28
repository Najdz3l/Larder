import type React from "react";
import { useState } from "react";
import type { Item, ItemDetailsPatch } from "@lib/types";
import { StatusPill } from "@components/atoms/StatusPill";
import { IconButton } from "@components/atoms/IconButton";
import { TextField } from "@components/atoms/TextField";
import { formatQty } from "@lib/helpers/formatQty";

export interface ItemRowProps {
  item: Item;
  editing: boolean;
  onCycle: () => void;
  onDelete: () => void;
  onUpdateDetails: (patch: ItemDetailsPatch) => void;
}

export const ItemRow: React.FC<ItemRowProps> = ({ item, editing, onCycle, onDelete, onUpdateDetails }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasMeta = item.qty !== null || Boolean(item.note);

  return (
    <div className={`row ${item.status}`}>
      <div className="row-line">
        <button type="button" className="row-main" onClick={onCycle}>
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
        <IconButton icon="✎" label="Szczegóły pozycji" onClick={() => setDetailsOpen((open) => !open)} />
        {editing && <IconButton icon="✕" label="Usuń pozycję" variant="danger" onClick={onDelete} />}
      </div>
      {detailsOpen && (
        <div className="idet">
          <div className="idet-r">
            <TextField
              type="number"
              min={0}
              step="any"
              inputMode="decimal"
              placeholder="Ilość"
              defaultValue={item.qty ?? ""}
              onBlur={(event) => {
                const value = event.target.value.trim();
                onUpdateDetails({ qty: value === "" ? null : Number(value) });
              }}
            />
            <TextField
              list="units"
              placeholder="Jednostka"
              defaultValue={item.unit ?? ""}
              onBlur={(event) => {
                const value = event.target.value.trim();
                onUpdateDetails({ unit: value === "" ? null : value });
              }}
            />
          </div>
          <TextField
            className="idet-note"
            placeholder="Notatka, np. otwarte, kończy się"
            defaultValue={item.note ?? ""}
            onBlur={(event) => {
              const value = event.target.value.trim();
              onUpdateDetails({ note: value === "" ? null : value });
            }}
          />
        </div>
      )}
    </div>
  );
};
