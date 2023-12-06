"use client";
import React, { createContext, useContext, useReducer, useState } from "react";

type SpotContextType = {
  selected: string | null;
  setSelected: React.Dispatch<React.SetStateAction<string | null>>;
};

export const SpotContext = createContext<SpotContextType | null>(null);

export type SpotProviderProps = {
  children: React.ReactNode;
};
export function SpotProvider({ children }: SpotProviderProps) {
  const spotContext = useSpotContext();
  return (
    <SpotContext.Provider value={spotContext}>{children}</SpotContext.Provider>
  );
}

export function useSpotContext() {
  const [selected, setSelected] = useState<string | null>(null);
  return {
    selected,
    setSelected,
  };
}
