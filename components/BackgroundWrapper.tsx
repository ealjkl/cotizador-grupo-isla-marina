"use client";
import { SpotsData } from "@/app/page";
// import Background from "./Background";
import { useContext } from "react";
import { SpotContext } from "@/features/spots";
import dynamic from "next/dynamic";

type BackgroundWrapperProps = {
  spotsData?: SpotsData;
  onClick?: (spot: string | null) => void;
};

const Background2 = dynamic(() => import("./Background"), { ssr: false });
export default function BackgroundWrapper({
  spotsData,
}: BackgroundWrapperProps) {
  const { setSelected } = useContext(SpotContext)!;
  return (
    <Background2
      spotsData={spotsData}
      onClick={(spot) => {
        setSelected(spot);
      }}
    />
  );
}
