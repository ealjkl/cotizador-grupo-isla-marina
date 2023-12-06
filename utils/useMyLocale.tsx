import { useSearchParams } from "next/navigation";

export const defaultLocale = "es-MX";
export default function useMyLocale() {
  let q = useSearchParams();
  // console.log("params", params);
  // let { locale = defaultLocale } = params;
  let locale = q.get("locale") ?? defaultLocale;
  return locale;
}