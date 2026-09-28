import type React from "react";
import type { Category, ItemDetailsPatch } from "@lib/types";
import { CategoryHeader } from "@components/molecules/CategoryHeader";
import { ItemRow } from "@components/molecules/ItemRow";
import { AddEntryForm } from "@components/molecules/AddEntryForm";

export interface CategoryAccordionProps {
  category: Category;
  editing: boolean;
  onDeleteCategory: () => void;
  onAddItem: (name: string) => void;
  onDeleteItem: (itemId: string) => void;
  onCycleStatus: (itemId: string) => void;
  onUpdateDetails: (itemId: string, patch: ItemDetailsPatch) => void;
}

export const CategoryAccordion: React.FC<CategoryAccordionProps> = ({
  category,
  editing,
  onDeleteCategory,
  onAddItem,
  onDeleteItem,
  onCycleStatus,
  onUpdateDetails,
}) => {
  const toBuyCount = category.items.filter((item) => item.status !== "have").length;

  return (
    <details className="category" open>
      <CategoryHeader
        name={category.name}
        toBuyCount={toBuyCount}
        totalCount={category.items.length}
        editing={editing}
        onDelete={onDeleteCategory}
      />
      {category.items.map((item) => (
        <ItemRow
          key={item.id}
          item={item}
          editing={editing}
          onCycle={() => onCycleStatus(item.id)}
          onDelete={() => onDeleteItem(item.id)}
          onUpdateDetails={(patch) => onUpdateDetails(item.id, patch)}
        />
      ))}
      <AddEntryForm variant="inline" placeholder={`Dodaj do: ${category.name}`} onSubmit={onAddItem} />
    </details>
  );
};
