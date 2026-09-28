import type React from "react";

export type Tab = "lists" | "buy";

export interface BottomNavProps {
  tab: Tab;
  toBuyCount: number;
  onChange: (tab: Tab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ tab, toBuyCount, onChange }) => {
  return (
    <nav className="bottom-nav">
      <button type="button" className={tab === "lists" ? "on" : ""} onClick={() => onChange("lists")}>
        Listy
      </button>
      <button type="button" className={tab === "buy" ? "on" : ""} onClick={() => onChange("buy")}>
        Do kupienia
        {toBuyCount > 0 && <span className="badge">{toBuyCount}</span>}
      </button>
    </nav>
  );
};
