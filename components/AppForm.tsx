"use client";
import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { DateRangePickerAria } from "@react-aria/datepicker";
import { AppDateRangePicker } from "./datepicker/AppDateRangePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDatePickerState, useDateRangePickerState } from "react-stately";
import { formatMoney } from "@/utils/moneyFormater";

type BoatKind = "Multi Hull" | "Mono Hull" | "Power Boat";
const pricingMapping = {
  "Multi Hull": 220,
  "Mono Hull": 200,
  "Power Boat": 200,
} as const;

export default function AppForm() {
  const rangeDatePickerProps = {
    label: "Estancia: ",
    minValue: today(getLocalTimeZone()),
  };
  const rangeDateState = useDateRangePickerState(rangeDatePickerProps);
  const days =
    rangeDateState.value?.end?.compare(rangeDateState.value.start) ?? 0;
  const [piesString, setPiesString] = useState("100");
  const [boatKind, setBoatKind] = useState<BoatKind>("Mono Hull");
  const piesParsed = parseFloat(piesString);
  const pies = !Number.isNaN(piesParsed) ? piesParsed : 0;
  const price = days * pies * (pricingMapping[boatKind] / 30) + 0;

  return (
    <div className="bg-lime-700 bg-opacity-80 p-8 row-auto rounded-2xl">
      <h2 className="text-4xl text-center font-medium">Cotizar</h2>
      <form
        className="p-2 flex flex-col gap-2 "
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <AppDateRangePicker
          label="Estancia:"
          minValue={today(getLocalTimeZone())}
          state={rangeDateState}
        />
        <div className="flex flex-row gap-2 justify-between">
          <InputGroup
            label="Pies del barco:"
            inputProps={{
              id: "pies",
              type: "text",
              value: piesString,
              onChange: (ev) => {
                setPiesString(ev.currentTarget.value);
              },
            }}
          />
          <SelectGroup
            label="Tipo de barco:"
            options={[
              {
                display: "Mono Hull",
                value: "Mono Hull",
              },
              {
                display: "Multi Hull",
                value: "Multi Hull",
              },
              {
                display: "Power Boat",
                value: "Power Boat",
              },
            ]}
            inputProps={{
              id: "tipo-de-barco",
              onChange: (ev) => {
                const val = ev.currentTarget.value;
                setBoatKind(val as BoatKind);
              },
            }}
          />
        </div>
        <section className="flex flex-row justify-end">
          <p className="text-5xl my-7">{formatMoney(price)}</p>
        </section>
        <button className="bg-sky-900 hover:bg-sky-800 rounded-full py-2 text-xl uppercase font-bold px-6 self-center">
          Reservar
        </button>
      </form>
    </div>
  );
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type InputGroupProps = {
  label: string;
  icon?: React.ReactNode;
  iconProps?: {};
  inputProps: InputProps & { id: string };
};

function InputGroup({ inputProps, label, icon }: InputGroupProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={inputProps.id} className="text-lg">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          {...inputProps}
          className="rounded-full text-black px-3 -mx-3 tabular-nums h-10 w-[120%] text-right"
        />
        <div className="absolute right-0 ">{icon}</div>
      </div>
    </div>
  );
}

type SelectOption = {
  value: string;
  display: string;
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;
type SelectGroupProps = {
  label: string;
  inputProps: SelectProps & { id: string };
  options: SelectOption[];
};
function SelectGroup({ label, inputProps, options }: SelectGroupProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={inputProps.id} className="text-lg">
        {label}
      </label>
      <select
        name=""
        {...inputProps}
        id={inputProps.id}
        className="rounded-full text-black px-3 py-1 -mx-3 text-lg h-10"
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
