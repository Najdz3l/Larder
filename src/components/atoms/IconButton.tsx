import type React from "react";
import type { IconButtonProps } from "./IconButton.types";

export const IconButton: React.FC<IconButtonProps> = ({ icon, label, onClick, variant = "accent" }) => {
  return (
    <button type="button" className={`icon-btn icon-btn-${variant}`} aria-label={label} onClick={onClick}>
      {icon}
    </button>
  );
};
