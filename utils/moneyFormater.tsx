const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});
export default formatter;

export function formatMoney(
  amount: number,
  locale: string = "es-MX",
  exchange: number = 1
) {
  let currencyOptions: Intl.NumberFormatOptions;
  let amount_: number;
  console.log("exchange", exchange);

  if (locale === "en-US") {
    // Format the amount in US Dollars (USD)
    amount_ = amount * exchange;
    console.log("locale en-US. amount", amount_);
    currencyOptions = {
      style: "currency",
      currency: "USD",
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
    };
  } else {
    // Format the amount in Mexican Pesos (MXN)
    amount_ = amount;

    console.log("locale es-MX. amount", amount_);
    currencyOptions = {
      style: "currency",
      currency: "MXN",
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
    };
  }

  // Create the number formatter with the chosen options
  const formatter = new Intl.NumberFormat(locale, currencyOptions);

  // Return the formatted amount
  return formatter.format(amount_);
}
