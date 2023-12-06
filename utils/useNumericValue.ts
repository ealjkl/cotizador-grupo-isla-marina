import { useState } from "react";

export default function useNumericValue({
  initialValue,
  minValue = -Infinity,
  maxValue = Infinity,
}: {
  initialValue: number | string;
  maxValue?: number;
  minValue?: number;
}) {
  const [valueString, setValueString] = useState<string>(
    initialValue.toString()
  );

  const valueParsed = parseFloat(valueString.replaceAll(" ", ""));
  const value = !Number.isNaN(valueParsed) ? valueParsed : 0;

  const isInvalidNumber =
    valueString.replaceAll(" ", "") != "" && Number.isNaN(valueParsed);
  const isLtMin = value < minValue;
  const isGtMax = value > maxValue;
  let simpleError: null | string = null;
  if (isInvalidNumber) {
    simpleError = "Por favor, provea un número válido";
  } else if (isGtMax || isLtMin) {
    simpleError = `${
      isLtMin ? `El número debe ser menor a ${minValue}.` : ""
    } ${isGtMax ? `El número debe ser mayor a ${maxValue}` : ""}`;
  }

  return {
    value,
    valueParsed,
    valueString,
    setValueString,
    simpleError,
    hasError: isGtMax || isInvalidNumber || isLtMin,
    errors: {
      isInvalidNumber,
      isLtMin,
      isGtMax,
    },
  };
}
