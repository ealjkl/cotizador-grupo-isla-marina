"use client";
import { useTexts } from "@/features/translation";
import React from "react";

export function Acotaciones({ className }: { className?: string }) {
  const { t } = useTexts();
  return (
    <div
      className={`rounded-full basis-full flex bg-white text-black justify-center gap-10 px-4 ${
        className ?? ""
      }`}
    >
      <div className="flex items-center">
        <div className="bg-green-700 rounded-full w-5 h-5 m-2"></div>
        <p>{t("disponible")}</p>
      </div>
      <div className="flex items-center">
        <div className="bg-red-700 rounded-full w-5 h-5 m-2"></div>
        <p>{t("ocupado")}</p>
      </div>
    </div>
  );
}
