import { texts } from "@/texts";
import { useParams } from "next/navigation";

export function useTexts() {
  const {} = useParams();
  return {
    t: (key: keyof (typeof texts)["es"]) => {
      return texts.es[key];
    },
  };
}
