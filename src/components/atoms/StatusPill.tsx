import type React from "react";
import { STATUS_LABEL } from "@lib/constants/status";
import type { StatusPillProps } from "./StatusPill.types";

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  return <span className={`pill pill-${status}`}>{STATUS_LABEL[status]}</span>;
};
