export const texts = {
  es: {
    cotizar: "Cotizar",
    estanciaInput: "Estancia: ",
    piesInput: "Pies del barco: ",
    tipoDeBarcoInput: "Tipo de barco: ",
    reservar: "Reservar",
    disponible: "Disponible",
    ocupado: "Ocupado",
    selecciona: "Selecciona un amarre para cotizar.",
    message({
      pies,
      piesHasError,
      hasSelectedDateRange,
      startDate,
      endDate,
    }: {
      pies?: string;
      piesHasError: boolean;
      hasSelectedDateRange: boolean;
      startDate?: string;
      endDate?: string;
    }) {
      const out = `Hola! Me gustaría reservar un amarre ${
        !piesHasError ? `de ${pies} pies` : ""
      } ${hasSelectedDateRange ? `del ${startDate} al ${endDate}` : ""} `;
      return out;
    },
  } as const,
  en: {
    cotizar: "Get a quote",
    estanciaInput: "Dates: ",
    piesInput: "Feet: ",
    tipoDeBarcoInput: "Kind of boat: ",
    reservar: "Reserve",
    disponible: "Available",
    ocupado: "Occupied",
    selecciona: "Choose a slip for a customized quote.",
    message: ({
      pies,
      piesHasError,
      hasSelectedDateRange,
      startDate,
      endDate,
    }: {
      pies?: string;
      piesHasError: boolean;
      hasSelectedDateRange: boolean;
      startDate?: string;
      endDate?: string;
    }) => {
      const out = `Hello! I would like to reserve a boat slip ${
        !piesHasError ? `of ${pies} feet` : ""
      } ${hasSelectedDateRange ? `from ${startDate} to ${endDate}` : ""} `;
      return out;
    },
  } as const,
} as const;
