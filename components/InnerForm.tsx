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
import { useTexts } from "@/features/translation";
import useMyLocale from "@/utils/useMyLocale";
import range from "@/utils/range";
const currencyMap = {
  "es-MX": "MXN",
  "en-US": "USD",
} as const;

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
    initialValue: 10,
    maxValue: maxPies,
    minValue: minPies,
  });

  const price =
    days *
      Math.max(Math.min(pies, maxPies), minPies) *
      pricingMapping[boatKind] +
    0;

  const { t } = useTexts();

  const message = t("message")({
    pies: String(pies),
    piesHasError,
    hasSelectedDateRange,
    startDate: rangeDateState.value?.start?.toString(),
    endDate: rangeDateState.value?.end?.toString(),
  });
  const locale = useMyLocale();

  return (
    <form
      className="lg:p-2 flex flex-col gap-2 w-[80%] lg:min-w-[400px]"
      onSubmit={(ev) => {
        ev.preventDefault();
      }}
    >
      <AppDateRangePicker
        label={t("estanciaInput")}
        minValue={today(getLocalTimeZone())}
        state={rangeDateState}
      />
      <div className="flex flex-row justify-start items-end">
        {/* <InputGroup
          label={t("piesInput")}
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
        /> */}
        <SelectGroup
          label={t("piesInput")}
          options={range(10, 65).map((val) => {
            return {
              display: String(val),
              value: String(val),
            };
          })}
          inputProps={{
            id: "pies",
            // className: `text-right ${piesHasError ? "outline-red-400" : ""}`,
            className: `-mx-3`,
            value: piesString,
            // onChange: handleInputChange,
            onChange: (ev) => {
              //TODO: deleting the string comma sends you to the last character
              setPiesString(ev.currentTarget.value);
            },
          }}
        />
        <SelectGroup
          label={t("tipoDeBarcoInput")}
          labelProps={{
            className: "ml-6",
          }}
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
            className: "mx-3",
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
            {formatMoney(
              rangeDateState.isInvalid ? 0 : price,
              locale,
              (generalData as any).exchange
            )}
          </p>
        }
        <p className="pb-2 self-end mb-2">
          {currencyMap[locale as keyof typeof currencyMap]}
        </p>
        {/* <p className="text-5xl my-7">{formatMoney(price)}</p> */}
      </section>
      <WhatsappButton
        phoneNumber={generalData.phone.value}
        message={message}
        target="_blank"
        className="bg-sky-900 hover:bg-sky-800 rounded-full py-2 text-xl uppercase font-bold px-6 self-center"
      >
        {t("reservar")}
      </WhatsappButton>
    </form>
  );
}
