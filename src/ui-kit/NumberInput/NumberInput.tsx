import React, {ChangeEventHandler} from "react";

export type NumberInputProps = {
  value: number;
  onChange(value: number): void;
  }
  & Omit<React.ButtonHTMLAttributes<HTMLInputElement>, 'onChange'>

export function NumberInput({value, onChange, ...props}: NumberInputProps) {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e.target.valueAsNumber)
  }
  return <input {...props} type="number"  value={value} onChange={handleChange} />
}