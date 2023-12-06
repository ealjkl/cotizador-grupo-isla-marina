import { useMediaQuery } from "@uidotdev/usehooks";

export function useMediaSize() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 639px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 640px) and (max-width : 939px)"
  );
  const isLargeDevice = useMediaQuery(
    "only screen and (min-width : 940px) and (max-width : 1540px)"
  );
  const isExtraLargeDevice = useMediaQuery(
    "only screen and (min-width : 1541px)"
  );

  return {
    isExtraLargeDevice,
    isLargeDevice,
    isMediumDevice,
    isSmallDevice,
  };
}
