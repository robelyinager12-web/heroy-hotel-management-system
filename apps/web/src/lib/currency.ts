export function formatBirr(amount: number | string): string {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("ETB", "Br");
}