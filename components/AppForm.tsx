"use client";
import React, { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { DateRangePickerAria } from "@react-aria/datepicker";
import { AppDateRangePicker } from "./datepicker/AppDateRangePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDatePickerState, useDateRangePickerState } from "react-stately";
import { formatMoney } from "@/utils/moneyFormater";
import formatNumber from "@/utils/formatNumber";
import WhatsappButton from "./WhatsappButton";
import type { SpotsData } from "@/app/page";

type BoatKind = "Multi Hull" | "Mono Hull" | "Power Boat";
// const pricingMapping = {
//   "Multi Hull": 220,
//   "Mono Hull": 200,
//   "Power Boat": 200,
// } as const;

type PricingData = {
  [id: string]: {
    id: string;
    price: string;
  };
};

type GeneralData = {
  phone: {
    value: string;
  };
};

type AppFormProps = {
  spotsData?: SpotsData;
  pricingData: PricingData;
  generalData: GeneralData;
};

export default function AppForm({ pricingData, generalData }: AppFormProps) {
  const rangeDatePickerProps = {
    label: "Estancia: ",
    minValue: today(getLocalTimeZone()),
  };
  const pricingMapping = Object.fromEntries(
    Object.values(pricingData).map(({ id, price }) => [id, parseFloat(price)])
  );
  const rangeDateState = useDateRangePickerState(rangeDatePickerProps);
  const days =
    (rangeDateState.value?.start &&
      rangeDateState.value.end &&
      rangeDateState.value.end.compare(rangeDateState.value.start)) ??
    0;
  const [boatKind, setBoatKind] = useState<BoatKind>("Mono Hull");
  const hasSelectedDateRange =
    rangeDateState.value?.start != null && rangeDateState.value?.end != null;

  const maxPies = 9999;
  const minPies = 0;
  const {
    value: pies,
    valueParsed: piesParsed,
    valueString: piesString,
    setValueString: setPiesString,
    simpleError,
    hasError: piesHasError,
    errors,
  } = useNumericValue({
    initialValue: 100,
    maxValue: maxPies,
    minValue: minPies,
  });

  const price =
    days *
      Math.max(Math.min(pies, maxPies), minPies) *
      pricingMapping[boatKind] +
    0;

  const phoneNumber = "9996586910";
  const message = `Hola! Me gustaría reservar un lote ${
    !piesHasError ? `de ${pies} pies` : ""
  } ${
    hasSelectedDateRange
      ? `del ${rangeDateState.value?.start?.toString()} al ${rangeDateState.value?.end?.toString()}`
      : ""
  } `;

  return (
    <div className="bg-lime-700 md:bg-opacity-80 px-2 py-8 sm:p-8 row-auto md:rounded-2xl z-10 md:mx-[calc(10%)] justify-self-center w-full md:w-fit h-[100vh] lg:h-fit flex flex-col justify-end sm:justify-center items-center">
      <h2 className="text-6xl sm:text-4xl text-center font-medium uppercase mb-auto sm:mb-0">
        Cotizar
      </h2>
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
        <div className="flex flex-row justify-end">
          <InputGroup
            label="Pies del barco:"
            inputProps={{
              id: "pies",
              type: "text",
              className: `text-right ${piesHasError ? "outline-red-400" : ""}`,
              value: piesString,
              // onChange: handleInputChange,
              onChange: (ev) => {
                //TODO: deleting the string comma sends you to the last character
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
          {
            <p className="text-5xl my-7">
              {rangeDateState.isInvalid ? formatMoney(0) : formatMoney(price)}
            </p>
          }
          {/* <p className="text-5xl my-7">{formatMoney(price)}</p> */}
        </section>
        <WhatsappButton
          phoneNumber={generalData.phone.value}
          message={message}
          target="_blank"
          className="bg-sky-900 hover:bg-sky-800 rounded-full py-2 text-xl uppercase font-bold px-6 self-center"
        >
          Reservar
        </WhatsappButton>
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

function useNumericValue({
  initialValue,
  minValue = -Infinity,
  maxValue = Infinity,
}: {
  initialValue: number | string;
  maxValue?: number;
  minValue?: number;
}) {
  const [valueString, setValueString] = useState<string>(
    initialValue.toString()
  );

  const valueParsed = parseFloat(valueString.replaceAll(" ", ""));
  const value = !Number.isNaN(valueParsed) ? valueParsed : 0;

  const isInvalidNumber =
    valueString.replaceAll(" ", "") != "" && Number.isNaN(valueParsed);
  const isLtMin = value < minValue;
  const isGtMax = value > maxValue;
  let simpleError: null | string = null;
  if (isInvalidNumber) {
    simpleError = "Por favor, provea un número válido";
  } else if (isGtMax || isLtMin) {
    simpleError = `${
      isLtMin ? `El número debe ser menor a ${minValue}.` : ""
    } ${isGtMax ? `El número debe ser mayor a ${maxValue}` : ""}`;
  }

  return {
    value,
    valueParsed,
    valueString,
    setValueString,
    simpleError,
    hasError: isGtMax || isInvalidNumber || isLtMin,
    errors: {
      isInvalidNumber,
      isLtMin,
      isGtMax,
    },
  };
}
