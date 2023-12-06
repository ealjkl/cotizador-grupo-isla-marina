"use client";
import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
export type InputGroupProps = {
  label: string;
  icon?: React.ReactNode;
  iconProps?: {};
  inputProps: InputProps & { id: string };
};

export function InputGroup({ inputProps, label, icon }: InputGroupProps) {
  return (
    <div className="flex flex-col flex-1">
      <label htmlFor={inputProps.id} className="text-lg">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          {...inputProps}
          className={`rounded-full text-black px-3 -mx-3 tabular-nums h-10 block w-[100%]  ${inputProps.className}`}
        />
        <div className="absolute right-0 ">{icon}</div>
      </div>
    </div>
  );
}
