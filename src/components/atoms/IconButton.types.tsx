export interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "danger" | "accent";
}
