import { useState } from "react";
import { useLarderStore } from "@lib/store/larderStore";
import { UNIT_SUGGESTIONS } from "@lib/constants/units";
import { MainLayout } from "@components/templates/layouts/MainLayout";
import { ToBuyLayout } from "@components/templates/layouts/ToBuyLayout";
import { BottomNav } from "@components/organisms/BottomNav";
import type { Tab } from "@components/organisms/BottomNav";

const App = () => {
  const [tab, setTab] = useState<Tab>("lists");
  const toBuyCount = useLarderStore((state) =>
    state.lists.reduce(
      (sum, list) =>
        sum +
        list.categories.reduce(
          (categorySum, category) => categorySum + category.items.filter((item) => item.status !== "have").length,
          0,
        ),
      0,
    ),
  );

  return (
    <>
      <main className="app">{tab === "lists" ? <MainLayout /> : <ToBuyLayout />}</main>
      <datalist id="units">
        {UNIT_SUGGESTIONS.map((unit) => (
          <option key={unit} value={unit} />
        ))}
      </datalist>
      <BottomNav tab={tab} toBuyCount={toBuyCount} onChange={setTab} />
    </>
  );
};

export default App;
