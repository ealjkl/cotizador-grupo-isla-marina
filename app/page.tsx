import AppForm from "@/components/AppForm";
import Background from "@/components/Background";
import BackgroundWrapper from "@/components/BackgroundWrapper";
import { SpotProvider } from "@/features/spots";
import getSpots, { getGeneral, getPrices } from "@/utils/getData";

export type SpotsData = {
  [spotNumber: string]: {
    available: "ocupado" | "disponible";
  };
};

const o = {
  available: "ocupado",
} as const;
const d = {
  available: "disponible",
} as const;

async function getMockStpotData(): Promise<SpotsData> {
  return {
    1: o,
    2: o,
    3: d,
    4: o,
    5: d,
    6: d,
    7: d,
    8: o,
    9: o,
    10: d,
    11: d,
    12: d,
    13: o,
    14: o,
  };
}

export default async function Home() {
  const spotsData = await getSpots();
  const pricesData = await getPrices();
  const general = await getGeneral();
  console.log("pricesData", pricesData);
  return (
    <main className="flex min-h-screen flex-row items-center left-0 flex-wrap justify-center lg:justify-start">
      <SpotProvider>
        <AppForm
          spotsData={spotsData}
          pricingData={pricesData}
          generalData={general}
        />
        <BackgroundWrapper spotsData={spotsData} />
      </SpotProvider>
    </main>
  );
}
