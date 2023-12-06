import { useMediaQuery } from "@uidotdev/usehooks";

export function useMediaSize() {
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

  return {
    isExtraLargeDevice,
    isLargeDevice,
    isMediumDevice,
    isSmallDevice,
  };
}
