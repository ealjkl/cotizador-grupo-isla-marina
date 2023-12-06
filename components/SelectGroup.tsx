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
export type SelectGroupProps = {
  label: string;
  inputProps: SelectProps & { id: string };
  options: SelectOption[];
};

export function SelectGroup({ label, inputProps, options }: SelectGroupProps) {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={inputProps.id} className="text-lg">
        {label}
      </label>
      <select
        name=""
        {...inputProps}
        id={inputProps.id}
        className="rounded-full text-black px-3 py-1 mx-3 text-lg h-10 w-[100%]"
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
