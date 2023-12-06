"use client";
import React, { useContext, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { DateRangePickerAria } from "@react-aria/datepicker";
import { AppDateRangePicker } from "./datepicker/AppDateRangePicker";
import { today, getLocalTimeZone } from "@internationalized/date";
import { useDatePickerState, useDateRangePickerState } from "react-stately";
import { formatMoney } from "@/utils/moneyFormater";
import formatNumber from "@/utils/formatNumber";
import WhatsappButton from "./WhatsappButton";
import type { SpotsData } from "@/app/page";
import { SelectGroup } from "./SelectGroup";
import { InputGroup } from "./InputGroup";
import useNumericValue from "@/utils/useNumericValue";
import { SpotContext } from "@/features/spots";
import { useMediaSize } from "@/utils/useMediaSize";
import { IoCloseOutline } from "react-icons/io5";

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

export default function AppForm({
  pricingData,
  generalData,
  spotsData,
}: AppFormProps) {
  const { selected, setSelected } = useContext(SpotContext)!;
  const { isExtraLargeDevice, isLargeDevice, isMediumDevice, isSmallDevice } =
    useMediaSize();
  return (
    <ShowIf
      condition={
        isLargeDevice ||
        isExtraLargeDevice ||
        isMediumDevice ||
        selected != null
      }
    >
      <div
        className={`bg-lime-700 lg:bg-opacity-80 px-2 py-8 sm:p-8 row-auto lg:rounded-2xl z-10 lg:mx-[calc(10%)] justify-self-center w-full lg:w-auto h-[100vh] lg:h-fit flex flex-col flex-wrap justify-end sm:justify-center items-center relative`}
      >
        {selected != null ? (
          <ContentSpotSelected
            generalData={generalData}
            pricingData={pricingData}
            spotsData={spotsData}
          />
        ) : (
          <ContentSpotNotSelected
            generalData={generalData}
            pricingData={pricingData}
            spotsData={spotsData}
          />
        )}
      </div>
    </ShowIf>
  );
}

type ContentSpotSelectedProps = {} & AppFormProps;
function ContentSpotSelected({
  generalData,
  pricingData,
  spotsData,
}: ContentSpotSelectedProps) {
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
    <>
      <div className="flex justify-end self-end">
        <button
          className="text-5xl"
          onClick={() => {
            setSelected(null);
          }}
        >
          <IoCloseOutline />
        </button>
      </div>
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
    </>
  );
}

type ContentSpotNotSelectedProps = {} & AppFormProps;
function ContentSpotNotSelected({
  generalData,
  pricingData,
  spotsData,
}: ContentSpotNotSelectedProps) {
  return (
    <>
      <h2 className="text-3xl">Selecciona un amarre para cotizar.</h2>
    </>
  );
}

type ShowIfProps = {
  condition: boolean;
  children: React.ReactNode;
};
function ShowIf({ children, condition }: ShowIfProps) {
  return condition ? children : null;
}
