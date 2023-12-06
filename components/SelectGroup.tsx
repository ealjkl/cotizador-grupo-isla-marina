"use client";
import React from "react";

type SelectOption = {
  value: string;
  display: string;
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>;
export type SelectGroupProps = {
  label: string;
  inputProps: SelectProps & { id: string };
  labelProps?: LabelProps;
  options: SelectOption[];
};

export function SelectGroup({
  label,
  inputProps,
  options,
  labelProps = {},
}: SelectGroupProps) {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={inputProps.id} className="text-lg" {...labelProps}>
        {label}
      </label>
      <select
        name=""
        {...inputProps}
        id={inputProps.id}
        className={`rounded-full text-black px-3 py-1 text-lg h-10 w-[100%] ${inputProps.className}`}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-center"
          >
            {option.display}
          </option>
        ))}
      </select>
    </div>
  );
}
