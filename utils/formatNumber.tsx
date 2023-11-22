export default function formatNumber(number: string, sep = ",") {
  // Use toLocaleString to add commas as a separator
  const num = parseInt(number.replaceAll(sep, ""));
  return !Number.isNaN(num) ? num.toLocaleString() : number;
}
