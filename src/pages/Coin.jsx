import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../context/CoinContext';
import LineChart from '../components/LineChart'

const Coin = () => {
  const { coinID } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-8CvzisH1Cou8eHKc2TPxH3q1',
        },
      };

      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`, options);
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-8CvzisH1Cou8eHKc2TPxH3q1',
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinID}/market_chart?vs_currency=${currency.name}&days=7&interval=daily`,
        options
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 bg-gray-900 min-h-screen text-white">
      {/* Coin Name & Image */}
      <div className="flex flex-col items-center text-center mb-8">
        <img src={coinData?.image?.large} alt={coinData.name} className="w-24 h-24 md:w-32 md:h-32" />
        <h1 className="text-3xl md:text-4xl font-bold mt-4">
          {coinData.name} ({coinData.symbol?.toUpperCase()})
        </h1>
      </div>

      {/* Chart Section */}
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-md p-4">
        <LineChart historicalData={historicalData} />
      </div>

      {/* Coin Info */}
      <div className="max-w-3xl mx-auto mt-8 space-y-4">
        {[
          { label: "Crypto Market Rank", value: coinData.market_cap_rank },
          { label: "Current Price", value: coinData.market_data?.current_price?.[currency.name] },
          { label: "Market Cap", value: coinData.market_data?.market_cap?.[currency.name] },
          { label: "24 Hour High", value: coinData.market_data?.high_24h?.[currency.name] },
          { label: "24 Hour Low", value: coinData.market_data?.low_24h?.[currency.name] },
        ].map((info, index) => (
          <div key={index} className="flex justify-between border-b border-gray-700 py-3">
            <span className="text-gray-400">{info.label}</span>
            <span className="font-semibold">
              {currency.symbol} {info.value?.toLocaleString() || "N/A"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Coin;
