const formatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 2,
});
export default formatter;

export function formatMoney(amount: number) {
  // Format the amount in Mexican Pesos (MXN)
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });

  // Return the formatted amount
  return formatter.format(amount);
}
