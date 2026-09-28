import type React from "react";
import { H1 } from "@components/atoms/h1";

export interface TopProps {
  title: string;
  editing?: boolean;
  onToggleEdit?: () => void;
}

export const Top: React.FC<TopProps> = ({ title, editing, onToggleEdit }) => {
  return (
    <div className="top">
      <H1>{title}</H1>
      {onToggleEdit && (
        <button type="button" className="link" onClick={onToggleEdit}>
          {editing ? "Gotowe" : "Edytuj"}
        </button>
      )}
    </div>
  );
};
