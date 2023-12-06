const appId = "YOUR_APP_ID"; // Replace with your actual Open Exchange Rates app ID

export async function getExchange(
  {
    baseCurrency,
    targetCurrency,
  }: {
    baseCurrency: string;
    targetCurrency: string;
  } = {
    baseCurrency: "MXN",
    targetCurrency: "USD",
  }
) {
  const apiUrl = `https://open.er-api.com/v6/latest/${baseCurrency}?app_id=${appId}`;
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const exchangeRate = data.rates[targetCurrency];
      return exchangeRate;
      // console.log(`1 ${baseCurrency} = ${exchangeRate} ${targetCurrency}`);
    })
    .catch((error) => console.error("Error fetching exchange rate:", error));
}
