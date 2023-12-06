"use client";
// import { useMediaQuery } from "@chakra-ui/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
const options = {
  ssr: false,
  fallback: false,
} as const;

export function useMediaSize() {
  const isSmallDevice = useMediaQuery(
    "only screen and (max-width : 639px)",
    options
  );
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 640px) and (max-width : 939px)",
    options
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 940px) and (max-width : 1540px)",
    options
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1541px)",
    options
  );

  return {
    isExtraLargeDevice,
    isLargeDevice,
    isMediumDevice,
    isSmallDevice,
  };
}
