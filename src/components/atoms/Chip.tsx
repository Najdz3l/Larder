import type React from "react";
import type { ChipProps } from "./Chip.types";

export const Chip: React.FC<ChipProps> = ({ label, active, onSelect, onDelete }) => {
  return (
    <span className={`chip${active ? " chip-on" : ""}`}>
      <button type="button" onClick={onSelect}>
        {label}
      </button>
      {onDelete && (
        <button type="button" className="chip-remove" aria-label={`Usuń listę ${label}`} onClick={onDelete}>
          ✕
        </button>
      )}
    </span>
  );
};
