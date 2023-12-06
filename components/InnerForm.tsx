"use client";
import React, { useContext, useState } from "react";
import { AppDateRangePicker } from "./datepicker/AppDateRangePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDateRangePickerState } from "react-stately";
import { formatMoney } from "@/utils/moneyFormater";
import WhatsappButton from "./WhatsappButton";
import { SelectGroup } from "./SelectGroup";
import { InputGroup } from "./InputGroup";
import useNumericValue from "@/utils/useNumericValue";
import { SpotContext } from "@/features/spots";
import { AppFormProps, BoatKind } from "./AppForm";

export function InnerForm({
  generalData,
  pricingData,
  spotsData,
}: AppFormProps) {
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
  const { selected, setSelected } = useContext(SpotContext)!;

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

  const message = `Hola! Me gustaría reservar un lote ${
    !piesHasError ? `de ${pies} pies` : ""
  } ${
    hasSelectedDateRange
      ? `del ${rangeDateState.value?.start?.toString()} al ${rangeDateState.value?.end?.toString()}`
      : ""
  } `;

  return (
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
  );
}
