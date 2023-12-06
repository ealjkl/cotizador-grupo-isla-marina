"use client";
import React, { useContext } from "react";
import type { SpotsData } from "@/app/page";
import { SpotContext } from "@/features/spots";
import { useMediaSize } from "@/utils/useMediaSize";
import { IoCloseOutline } from "react-icons/io5";
import ShowIf from "./ShowIf";
import { InnerForm } from "./InnerForm";
import {
  Modal,
  Dialog as AriaDialog,
  ModalOverlay,
  Button,
  DialogTrigger,
  Heading,
} from "react-aria-components";
import { texts } from "@/texts";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useTexts } from "@/features/translation";
import { Acotaciones } from "./Acotaciones";
import { Dialog as MyDialog } from "./datepicker/Dialog";

export type BoatKind = "Multi Hull" | "Mono Hull" | "Power Boat";
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

export type AppFormProps = {
  spotsData?: SpotsData;
  pricingData: PricingData;
  generalData: GeneralData;
};

export default function AppForm({
  pricingData,
  generalData,
  spotsData,
}: AppFormProps) {
  const { isExtraLargeDevice, isLargeDevice, isMediumDevice, isSmallDevice } =
    useMediaSize();

  const innerForm = (
    <InnerForm
      key="inner-form"
      generalData={generalData}
      pricingData={pricingData}
      spotsData={spotsData}
    />
  );
  return (
    <>
      <ShowIf condition={isSmallDevice || isMediumDevice}>
        <MediumVersion
          innerForm={innerForm}
          generalData={generalData}
          pricingData={pricingData}
          spotsData={spotsData}
        />
      </ShowIf>
      {/* <ShowIf condition={isMediumDevice}>
        <MediumVersion
          innerForm={innerForm}
          generalData={generalData}
          pricingData={pricingData}
          spotsData={spotsData}
        />
      </ShowIf> */}
      <ShowIf condition={isLargeDevice}>
        <LargeVersion
          generalData={generalData}
          pricingData={pricingData}
          spotsData={spotsData}
        />
      </ShowIf>
      <ShowIf condition={isExtraLargeDevice}>
        <LargeVersion
          generalData={generalData}
          pricingData={pricingData}
          spotsData={spotsData}
        />
      </ShowIf>
    </>
  );
}

function LargeVersion({ generalData, pricingData, spotsData }: AppFormProps) {
  const { selected, setSelected } = useContext(SpotContext)!;
  return selected != null ? (
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
  );
}

function MediumVersion({
  generalData,
  pricingData,
  spotsData,
  innerForm,
}: AppFormProps & { innerForm: React.ReactNode }) {
  const { selected, setSelected } = useContext(SpotContext)!;
  const { t } = useTexts();
  const isOpen = selected != null;
  console.log("renderig medium");
  return (
    <>
      <h2 className="text-6xl m-8 text-center">{t("cotizar")}</h2>
      <Modal isOpen={isOpen}>
        <AriaDialog aria-label="cotizador">
          <div
            className={`bg-lime-700 lg:bg-opacity-80 px-1 py-8 sm:p-8 row-auto lg:rounded-2xl lg:mx-[calc(10%)] justify-self-center w-full lg:w-auto h-[100svh] lg:h-fit flex flex-col  justify-end sm:justify-center items-center fixed top-0 left-0 z-1`}
          >
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
            <CotizarTitle />
            {innerForm}
          </div>
        </AriaDialog>
      </Modal>
    </>
  );
}

type ContentSpotSelectedProps = {} & AppFormProps;
function ContentSpotSelected({
  generalData,
  pricingData,
  spotsData,
}: ContentSpotSelectedProps) {
  const { selected, setSelected } = useContext(SpotContext)!;
  return (
    <>
      <div
        className={`bg-lime-700 lg:bg-opacity-80 px-2 py-8 sm:p-8 row-auto lg:rounded-2xl z-10 lg:mx-[calc(16%)] justify-self-center w-full lg:w-auto h-[100svh] lg:h-fit flex flex-col flex-wrap justify-end sm:justify-center items-center relative`}
      >
        <CotizarTitle />
        <InnerForm
          generalData={generalData}
          pricingData={pricingData}
          spotsData={spotsData}
        />
      </div>
    </>
  );
}

type ContentSpotNotSelectedProps = {} & AppFormProps;
function ContentSpotNotSelected({
  generalData,
  pricingData,
  spotsData,
}: ContentSpotNotSelectedProps) {
  const { t } = useTexts();
  return (
    <>
      <div
        className={`bg-lime-700 lg:bg-opacity-80 px-2 py-8 sm:p-8 row-auto lg:rounded-2xl z-10 lg:mx-[calc(20%)] justify-self-center w-full lg:w-80 h-[100svh] lg:h-fit flex flex-col flex-wrap justify-end sm:justify-center items-center relative`}
      >
        <h2 className="text-3xl">{t("selecciona")}</h2>
      </div>
    </>
  );
}

function CotizarTitle() {
  const { t } = useTexts();
  return (
    <h2 className="text-6xl sm:text-4xl text-center font-medium uppercase mb-auto mt-10 sm:mb-0 flex-shrink-0">
      {t("cotizar")}
    </h2>
  );
}
