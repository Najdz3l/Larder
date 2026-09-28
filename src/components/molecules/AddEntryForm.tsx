import type React from "react";
import { useRef } from "react";
import { TextField } from "@components/atoms/TextField";

export interface AddEntryFormProps {
  placeholder: string;
  onSubmit: (value: string) => void;
  variant?: "inline" | "block";
}

export const AddEntryForm: React.FC<AddEntryFormProps> = ({ placeholder, onSubmit, variant = "block" }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const value = inputRef.current?.value.trim();
    if (!value) return;
    onSubmit(value);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <form className={variant === "inline" ? "form-add" : "form-new"} onSubmit={handleSubmit}>
      <TextField ref={inputRef} placeholder={placeholder} required />
      <button type="submit">Dodaj</button>
    </form>
  );
};
