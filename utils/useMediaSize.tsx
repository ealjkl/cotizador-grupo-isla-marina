"use client";
import { useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export function useMediaSize() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 639px)", {
    ssr: true,
    fallback: false,
  });
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 640px) and (max-width : 939px)",
    {
      ssr: true,
      fallback: false,
    }
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 940px) and (max-width : 1540px)",
    {
      ssr: true,
      fallback: false,
    }
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1541px)",
    {
      ssr: true,
      fallback: false,
    }
  );

  return {
    isExtraLargeDevice,
    isLargeDevice,
    isMediumDevice,
    isSmallDevice,
  };
}
