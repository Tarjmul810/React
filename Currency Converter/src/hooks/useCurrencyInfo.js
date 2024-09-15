import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({}); // Define data state outside useEffect

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then(response => response.json())
      .then(response => setData(response[currency]))
      .catch(error => console.error(error)); // Add error handling
    return () => { /* Add cleanup function */ };
  }, [currency]);

  return data;
}

export default useCurrencyInfo;