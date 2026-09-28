import type React from "react";
import type { List } from "@lib/types";
import { Chip } from "@components/atoms/Chip";
import { AddEntryForm } from "@components/molecules/AddEntryForm";

export interface ListSwitcherProps {
  lists: List[];
  activeListId: string | null;
  editing: boolean;
  onSelect: (listId: string) => void;
  onDelete: (listId: string) => void;
  onAdd: (name: string) => void;
}

export const ListSwitcher: React.FC<ListSwitcherProps> = ({
  lists,
  activeListId,
  editing,
  onSelect,
  onDelete,
  onAdd,
}) => {
  return (
    <>
      {lists.length > 0 && (
        <div className="chips">
          {lists.map((list) => (
            <Chip
              key={list.id}
              label={list.name}
              active={list.id === activeListId}
              onSelect={() => onSelect(list.id)}
              {...(editing ? { onDelete: () => onDelete(list.id) } : {})}
            />
          ))}
        </div>
      )}
      {(editing || lists.length === 0) && <AddEntryForm placeholder="Nowa lista, np. Jedzenie" onSubmit={onAdd} />}
    </>
  );
};
