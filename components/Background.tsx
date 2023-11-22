"use client";
import { useEffect, useRef } from "react";
// import Spots from "../public/vectores-marina-wbg4.svg";
import Spots from "./Spots";
import { SpotsData } from "@/app/page";

type BackgroundProps = {
  spotsData: SpotsData;
};

export default function Background({ spotsData }: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const spots = document.querySelector("#vectores-de-formas")!;
    for (const child of spots.children) {
      const spotId = child.id.split("-")[1];
      const available = spotsData[spotId].available;

      const path = child.children[0] as HTMLElement | SVGElement;
      path.dataset["available"] = available;
      path.dataset["eltype"] = "area";
    }
    const numbers = document.querySelector("#Numeros")!;
    for (const child of numbers?.children) {
      const spotId = child.id;
      const available = spotsData[spotId]?.available;

      const path = child?.firstChild?.firstChild?.firstChild as
        | HTMLElement
        | SVGElement;
      path.dataset["available"] = available;
      path.dataset["eltype"] = "number-label";
    }
  }, [spotsData]);

  return (
    <Spots
      className="w-[100vw] h-[100vh] fixed left-0 right-0 top-0 "
      ref={ref}
    />
  );
}
