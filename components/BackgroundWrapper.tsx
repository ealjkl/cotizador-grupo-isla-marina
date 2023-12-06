"use client";
import { SpotsData } from "@/app/page";
import Background from "./Background";
import { useContext } from "react";
import { SpotContext } from "@/features/spots";

type BackgroundWrapperProps = {
  spotsData?: SpotsData;
  onClick?: (spot: string | null) => void;
};

export default function BackgroundWrapper({
  spotsData,
}: BackgroundWrapperProps) {
  const { setSelected } = useContext(SpotContext)!;
  return (
    <Background
      spotsData={spotsData}
      onClick={(spot) => {
        setSelected(spot);
      }}
    />
  );
}
