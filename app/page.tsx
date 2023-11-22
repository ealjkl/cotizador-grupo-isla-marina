import AppForm from "@/components/AppForm";
import Background from "@/components/Background";

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
  const spotsData = await getMockStpotData();
  return (
    <main className="flex min-h-screen flex-row items-center justify-center sm:justify-start">
      <AppForm spotsData={spotsData} />
      <Background spotsData={spotsData} />
    </main>
  );
}
