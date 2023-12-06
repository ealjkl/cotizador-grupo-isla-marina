"use client";
import { MouseEventHandler, RefObject, useEffect, useRef } from "react";
// import Spots from "../public/vectores-marina-wbg4.svg";
import Spots from "./Spots";
import { SpotsData } from "@/app/page";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useMediaSize } from "@/utils/useMediaSize";
import { Acotaciones } from "./Acotaciones";

type BackgroundProps = {
  spotsData?: SpotsData;
  onClick?: (spot: string | null) => void;
};

export default function Background({ spotsData, onClick }: BackgroundProps) {
  const { isExtraLargeDevice, isLargeDevice, isMediumDevice, isSmallDevice } =
    useMediaSize();

  return (
    <>
      {isExtraLargeDevice && (
        <ExtraLargeBackground spotsData={spotsData} onClick={onClick} />
      )}
      {isLargeDevice && (
        <LargeBackground spotsData={spotsData} onClick={onClick} />
      )}
      {isMediumDevice && (
        <SmallBackground spotsData={spotsData} onClick={onClick} />
      )}
      {isSmallDevice && (
        <SmallBackground spotsData={spotsData} onClick={onClick} />
      )}
    </>
  );
}

function computeX() {
  const screenWidth = window.innerWidth;
  return -screenWidth * 1.1 + 1400;
}

function ExtraLargeBackground({ spotsData, onClick }: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  useSpotsInjectData({ spotsData });
  const handleClick = getOnClick({ onClick, ref });

  return (
    <>
      <div className="absolute top-0 left-0 flex flex-row justify-center w-full">
        <Spots
          // className="w-11/12"
          ref={ref}
          onClick={handleClick}
          viewBox={`-500 -50 1000 1200`}
          style={{
            width: "calc(min(1500px, 90%))",
            height: "calc(max(100svh, 900px))",
            // height: "100vh",
            // transform: "translateX(calc(-20px - 20vw))",
          }}
        />
        <Acotaciones className="absolute bottom-0  m-5" />
      </div>
    </>
    // <Spots
    //   className="w-[110vw] h-[100vh] fixed top-0 -translate-x-20"
    //   ref={ref}
    // />
  );
}

function LargeBackground({ spotsData, onClick }: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  useSpotsInjectData({ spotsData });
  useSpotsResize({ ref });
  const handleClick = getOnClick({ onClick, ref });

  return (
    <>
      <Spots
        className="fixed top-0 left-0"
        ref={ref}
        onClick={handleClick}
        viewBox={`${computeX()} -50 1000 1200`}
        style={{
          width: "2000px",
          height: "calc(max(100svh, 700px))",
          // height: "100vh",
          // transform: "translateX(calc(-20px - 20vw))",
        }}
      />
      <Acotaciones className="fixed bottom-0 right-0 m-5" />
    </>
    // <Spots
    //   className="w-[110vw] h-[100vh] fixed top-0 -translate-x-20"
    //   ref={ref}
    // />
  );
}

function SmallBackground({ spotsData, onClick }: BackgroundProps) {
  const ref = useRef<SVGSVGElement>(null);
  useSpotsInjectData({ spotsData });
  const handleClick = getOnClick({ onClick, ref });

  return (
    <>
      <Spots
        className=""
        ref={ref}
        viewBox="100 -50 800 1050"
        // viewBox={`1000 -50 1000 1100`}
        onClick={handleClick}
        style={
          {
            // width: "2000px",
            // height: "calc(max(100vh, 700px))",
            // height: "100vh",
            // transform: "translateX(calc(-20px - 20vw))",
          }
        }
      />
      <Acotaciones className="rounded-none" />
    </>
  );
}

function useSpotsResize({ ref }: { ref: RefObject<SVGSVGElement> }) {
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
}

function useSpotsInjectData({ spotsData }: BackgroundProps) {
  useEffect(() => {
    const spots = document.querySelector("#vectores-de-formas")!;
    for (const child of spots.children) {
      const spotId = child.id.split("-")[1];
      const available = (spotsData && spotsData[spotId].available) ?? "ocupado";

      const path = child.children[0] as HTMLElement | SVGElement;
      path.dataset["number"] = spotId;
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

      path.dataset["number"] = spotId;
      path.dataset["available"] = available;
      path.dataset["eltype"] = "number-label";
    }
  }, [spotsData]);
}

type OnSpotsClick = (selected: string | null) => void;

function getOnClick({
  onClick,
  ref,
}: {
  onClick?: OnSpotsClick;
  ref: RefObject<SVGSVGElement>;
}) {
  return (ev: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const spot: SVGElement = (ev as any).target.closest(`path`);

    if (spot) {
      const num = spot?.dataset["number"];
      onClick && onClick(num ?? null);
    }
  };
}
