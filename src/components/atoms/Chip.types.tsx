export interface ChipProps {
  label: string;
  active: boolean;
  onSelect: () => void;
  onDelete?: () => void;
}
