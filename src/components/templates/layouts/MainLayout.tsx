import type React from "react";
import { useState } from "react";
import { useLarderStore } from "@lib/store/larderStore";
import { Top } from "@components/molecules/Top";
import { AddEntryForm } from "@components/molecules/AddEntryForm";
import { ListSwitcher } from "@components/organisms/ListSwitcher";
import { CategoryAccordion } from "@components/organisms/CategoryAccordion";

export const MainLayout: React.FC = () => {
  const lists = useLarderStore((state) => state.lists);
  const addList = useLarderStore((state) => state.addList);
  const deleteList = useLarderStore((state) => state.deleteList);
  const addCategory = useLarderStore((state) => state.addCategory);
  const deleteCategory = useLarderStore((state) => state.deleteCategory);
  const addItem = useLarderStore((state) => state.addItem);
  const deleteItem = useLarderStore((state) => state.deleteItem);
  const cycleStatus = useLarderStore((state) => state.cycleStatus);
  const setItemDetails = useLarderStore((state) => state.setItemDetails);

  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);

  const activeList = lists.find((list) => list.id === selectedListId) ?? lists[0];

  return (
    <>
      <Top title="Larder" editing={editing} onToggleEdit={() => setEditing((value) => !value)} />
      <ListSwitcher
        lists={lists}
        activeListId={activeList?.id ?? null}
        editing={editing}
        onSelect={setSelectedListId}
        onDelete={deleteList}
        onAdd={addList}
      />
      {activeList && (
        <>
          {activeList.categories.length === 0 && (
            <div className="empty">Ta lista jest pusta. Dodaj pierwszą kategorię na dole.</div>
          )}
          {activeList.categories.map((category) => (
            <CategoryAccordion
              key={category.id}
              category={category}
              editing={editing}
              onDeleteCategory={() => deleteCategory(activeList.id, category.id)}
              onAddItem={(name) => addItem(activeList.id, category.id, name)}
              onDeleteItem={(itemId) => deleteItem(activeList.id, category.id, itemId)}
              onCycleStatus={cycleStatus}
              onUpdateDetails={setItemDetails}
            />
          ))}
          <AddEntryForm placeholder="Nowa kategoria, np. Mięso" onSubmit={(name) => addCategory(activeList.id, name)} />
        </>
      )}
    </>
  );
};
