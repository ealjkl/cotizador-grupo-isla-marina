"use client";
import { texts } from "@/texts";
import useMyLocale, { defaultLocale } from "@/utils/useMyLocale";
import { useParams, useSearchParams } from "next/navigation";

type TextsKeys = keyof typeof texts.es;
type Texts = typeof texts.es;

const defaultLang = defaultLocale.split("-")[0] as "es";

export function useTexts() {
  
  // if (Array.isArray(locale)) {
  //   locale = locale[0] ?? defaultLocale;
  // }
  const locale = useMyLocale();
  const lang = locale.split("-")[0];
  console.log("lang", lang);
  const d =
    texts[lang as keyof typeof texts] ??
    (texts[defaultLang] as unknown as Texts);

  return {
    t: <K extends TextsKeys>(key: K): Texts[K] => {
      return d[key];
    },
  };
}
