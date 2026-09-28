import type React from "react";
import { IconButton } from "@components/atoms/IconButton";

export interface CategoryHeaderProps {
  name: string;
  toBuyCount: number;
  totalCount: number;
  editing: boolean;
  onDelete: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ name, toBuyCount, totalCount, editing, onDelete }) => {
  return (
    <summary>
      {name}
      <span className={`count${toBuyCount ? " count-warn" : ""}`}>
        {toBuyCount ? `${toBuyCount} do kupienia` : `${totalCount} poz.`}
      </span>
      {editing && <IconButton icon="✕" label={`Usuń kategorię ${name}`} variant="danger" onClick={onDelete} />}
    </summary>
  );
};
