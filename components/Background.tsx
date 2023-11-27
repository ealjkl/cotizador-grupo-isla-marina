"use client";
import { useEffect, useRef } from "react";
// import Spots from "../public/vectores-marina-wbg4.svg";
import Spots from "./Spots";
import { SpotsData } from "@/app/page";
import { useMediaQuery } from "@uidotdev/usehooks";

type BackgroundProps = {
  spotsData?: SpotsData;
};

export default function Background({ spotsData }: BackgroundProps) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 767px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 768px) and (max-width : 939px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 940px) and (max-width : 1280px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1281px)"
  );

  return (
    <>
      {isExtraLargeDevice && <MediumBackground spotsData={spotsData} />}
      {isLargeDevice && <MediumBackground spotsData={spotsData} />}
      {isMediumDevice && <SmallBackground spotsData={spotsData} />}
      {isSmallDevice && <SmallBackground spotsData={spotsData} />}
    </>
  );
}

function computeX() {
  const screenWidth = window.innerWidth;
  return -screenWidth * 1.1 + 1400;
}

function MediumBackground({ spotsData }: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const spots = document.querySelector("#vectores-de-formas")!;
    for (const child of spots.children) {
      const spotId = child.id.split("-")[1];
      const available = (spotsData && spotsData[spotId].available) ?? "ocupado";

      const path = child.children[0] as HTMLElement | SVGElement;
      path.dataset["available"] = available;
      path.dataset["eltype"] = "area";
    }
    const numbers = document.querySelector("#Numeros")!;
    for (const child of numbers?.children) {
      const spotId = child.id;
      const available =
        (spotsData && spotsData[spotId]?.available) ?? "ocupado";

      const path = child?.firstChild?.firstChild?.firstChild as
        | HTMLElement
        | SVGElement;
      path.dataset["available"] = available;
      path.dataset["eltype"] = "number-label";
    }
  }, [spotsData]);

  useEffect(() => {
    ref.current?.viewBox.baseVal.x;
    const updateViewbox = () => {
      const screenWidth = window.innerWidth;
      if (ref.current) {
        console.log("resizing");
        ref.current.viewBox.baseVal.x = computeX();
      }
    };
    window.addEventListener("resize", updateViewbox);
    return () => {
      window.removeEventListener("resize", updateViewbox);
    };
  }, []);

  return (
    <Spots
      className="fixed top-0"
      ref={ref}
      viewBox={`${computeX()} -50 1000 1100`}
      style={{
        width: "2000px",
        height: "calc(max(100vh, 700px))",
        // height: "100vh",
        // transform: "translateX(calc(-20px - 20vw))",
      }}
    />
    // <Spots
    //   className="w-[110vw] h-[100vh] fixed top-0 -translate-x-20"
    //   ref={ref}
    // />
  );
}

function SmallBackground({ spotsData }: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  // useEffect(() => {
  //   const spots = document.querySelector("#vectores-de-formas")!;
  //   for (const child of spots.children) {
  //     const spotId = child.id.split("-")[1];
  //     const available = spotsData[spotId].available;

  //     const path = child.children[0] as HTMLElement | SVGElement;
  //     path.dataset["available"] = available;
  //     path.dataset["eltype"] = "area";
  //   }
  //   const numbers = document.querySelector("#Numeros")!;
  //   for (const child of numbers?.children) {
  //     const spotId = child.id;
  //     const available = spotsData[spotId]?.available;

  //     const path = child?.firstChild?.firstChild?.firstChild as
  //       | HTMLElement
  //       | SVGElement;
  //     path.dataset["available"] = available;
  //     path.dataset["eltype"] = "number-label";
  //   }
  // }, [spotsData]);

  return (
    <Spots
      className="w-[1200px]"
      ref={ref}
      viewBox="100 -148 800 1500"
      // viewBox={`1000 -50 1000 1100`}
      style={
        {
          // width: "2000px",
          // height: "calc(max(100vh, 700px))",
          // height: "100vh",
          // transform: "translateX(calc(-20px - 20vw))",
        }
      }
    />
  );
}
