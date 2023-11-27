import csv from "csv-parser";
import { pipeline } from "node:stream/promises";
import { Readable, Writable } from "node:stream";
import type { SpotsData } from "@/app/page";

type APrioriSpotsData = {
  [id: string]: {
    id: string;
    available: "disponible" | "ocupado";
  };
};
export default async function getSpots() {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZS4x2FVa6Hugvb9T0cteLtfC_w5SeKnfmqTeDFkA8AVR4vr94-mU3zirdMEtveJs-LPbfUvWKi9I3/pub?gid=239116483&single=true&output=csv";
  const lotsRes = await fetch(url, { next: { revalidate: 10 } });
  const textCsv = await lotsRes.text();
  const streamCsv = Readable.from(textCsv);
  const jsonData: any = {};

  if (!lotsRes.ok) {
    return undefined;
  }

  await pipeline(
    streamCsv,
    csv(),
    new Writable({
      objectMode: true,
      write(data, _, callback) {
        jsonData[data.id] = data;
        callback();
      },
    })
  );
  const data: APrioriSpotsData = jsonData;
  return data;
}

export async function getPrices() {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZS4x2FVa6Hugvb9T0cteLtfC_w5SeKnfmqTeDFkA8AVR4vr94-mU3zirdMEtveJs-LPbfUvWKi9I3/pub?gid=1835005329&single=true&output=csv";
  const lotsRes = await fetch(url, { next: { revalidate: 10 } });
  const textCsv = await lotsRes.text();
  const streamCsv = Readable.from(textCsv);
  const jsonData: any = {};

  if (!lotsRes.ok) {
    return undefined;
  }

  await pipeline(
    streamCsv,
    csv(),
    new Writable({
      objectMode: true,
      write(data, _, callback) {
        jsonData[data.id] = data;
        callback();
      },
    })
  );
  return jsonData;
}

export async function getGeneral() {
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vTZS4x2FVa6Hugvb9T0cteLtfC_w5SeKnfmqTeDFkA8AVR4vr94-mU3zirdMEtveJs-LPbfUvWKi9I3/pub?gid=1169693305&single=true&output=csv";
  const lotsRes = await fetch(url, { next: { revalidate: 10 } });
  const textCsv = await lotsRes.text();
  const streamCsv = Readable.from(textCsv);
  const jsonData: any = {};

  if (!lotsRes.ok) {
    return undefined;
  }

  await pipeline(
    streamCsv,
    csv(),
    new Writable({
      objectMode: true,
      write(data, _, callback) {
        jsonData[data.id] = data;
        callback();
      },
    })
  );
  return jsonData;
}
