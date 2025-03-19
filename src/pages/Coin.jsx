import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinID } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinID}`,
        { headers: { accept: "application/json" } }
      );
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`,
        { headers: { accept: "application/json" } }
      );
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  useEffect(() => {
    if (coinID) {
      fetchCoinData();
      fetchHistoricalData();
    }
  }, [coinID, currency]);

  if (!coinData || !historicalData) {
    return (
      <div className="flex items-center justify-center min-h-screen dark:bg-gray-900">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-[80vh] text-white">
      {/* Crypto Info Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center justify-between">
        {/* Logo & Name */}
        <div className="flex items-center space-x-4">
          <img src={coinData.image?.large} alt={coinData.name} className="w-12 h-12" />
          <div>
            <h1 className="md:text-2xl text-lg dark:text-white text-black font-bold">{coinData.name} ({coinData.symbol?.toUpperCase()})</h1>
          </div>
        </div>

        {/* Percentage Change */}
        <div className={`px-3 py-1 hidden md:block rounded-md  font-semibold text-lg 
          ${coinData.market_data?.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
          {coinData.market_data?.price_change_percentage_24h?.toFixed(2)}%
        </div>

        {/* Current Price */}
        <div className="flex items-center space-x-2 ">
          <span className="hidden md:block">💹</span>
          <span className="lg:text-xl   text-lg font-semibold dark:text-white text-black ">
            {currency.symbol} {coinData.market_data?.current_price?.[currency.name]?.toLocaleString()}
          </span>
        </div>

        {/* Volume & Market Cap */}
        <div className="text-right hidden md:block">
          <p className="text-gray-400 text-sm ">24h Volume</p>
          <p className="font-semibold dark:text-white text-black ">
            {currency.symbol} {coinData.market_data?.total_volume?.[currency.name]?.toLocaleString()}
          </p>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-gray-400 text-sm ">Market Cap</p>
          <p className="font-semibold text-black dark:text-white ">
            {currency.symbol} {coinData.market_data?.market_cap?.[currency.name]?.toLocaleString()}
          </p>
        </div>

        {/* Favorite Button */}
        <button className="p-2 rounded-full border border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition">
          ⭐
        </button>
      </div>

      {/* Chart Section */}
      <div className="max-w-5xl mx-auto h-[400px] dark:bg-gray-800 bg-gray-100 rounded-lg shadow-md p-4 mt-8">
        <LineChart historicalData={historicalData} />
      </div>
    </div>
  );
};

export default Coin;
