import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = ({ children }) => {
  const [allCoin, setAllCoin] = useState([]); // ✅ Store all coin data
  const [currency, setCurrency] = useState({
    name: "inr",
    symbol: "₹",
  });

  // Fetch Coins from API
  const fetchAllCoin = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-demo-api-key": "CG-8CvzisH1Cou8eHKc2TPxH3q1",
          },
        }
      );

      const data = await response.json();
      console.log("Fetched Data:", data); // Debugging

      if (Array.isArray(data)) {
        setAllCoin(data); // ✅ Store data in state
      } else {
        console.warn("Invalid API response");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch Coins when currency changes
  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  // Provide context values
  const contextValue = {
    allCoin,
    setAllCoin, // ✅ Add this so other components can modify it
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;

// useEffect(() => {
//     const fetchCoins = async () => {
//     //   setLoading(true);
//       try {
//         const response = await fetch(
//           "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
//         );
//         const data = await response.json();
//         // setDisplayCoin(Array.isArray(data) ? data : []); // Ensure data is an array
//       } catch (error) {
//         console.error("Error:", error);
//         // setError(error.message);
//       } finally {
//         // setLoading(false);
//       }
//     };
  
//     fetchCoins();
//   }, []);