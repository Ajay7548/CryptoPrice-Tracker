import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [sortType, setSortType] = useState("market_cap"); // Default sort by market cap

  // Handle input change
  const inputHandler = (event) => {
    setInput(event.target.value);
    filterCoins(event.target.value);
  };

  // Filter coins as user types
  const filterCoins = (query) => {
    if (query === "") {
      setDisplayCoin(allCoin);
      return;
    }
    const filteredCoins = allCoin.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayCoin(filteredCoins);
  };

  // Fetch and update coin data
  useEffect(() => {
    setDisplayCoin(allCoin);
    setLoading(false);
  }, [allCoin]);

  // Sort coins dynamically
  const sortCoins = (type) => {
    const sorted = [...displayCoin].sort((a, b) => {
      if (type === "price") return b.current_price - a.current_price;
      if (type === "market_cap") return b.market_cap - a.market_cap;
      if (type === "change") return b.price_change_percentage_24h - a.price_change_percentage_24h;
      return 0;
    });
    setSortType(type);
    setDisplayCoin(sorted);
  };

  if (loading)
    return <p className="text-center text-gray-400">Loading crypto data...</p>;

  if (error)
    return (
      <div className="text-center text-red-500">
        <p>Error loading data: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="px-4 pb-24 ">
      {/* Hero Section */}
      <div className="max-w-[650px] mx-auto mt-16 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl font-bold md:text-5xl text-white">
          Track Crypto Prices in Real Time
        </h1>
        <p className="text-gray-300 w-4/5 md:w-3/4 leading-relaxed">
          Stay updated with live cryptocurrency prices, market trends, and
          analytics.
        </p>
        <div className="flex items-center gap-4 w-full">
          <form className="flex w-full max-w-md bg-gray-900 border border-gray-700 p-3 rounded-lg items-center gap-2 shadow-lg">
            <input
              onChange={inputHandler}
              value={input}
              list="coinlist"
              type="text"
              placeholder="Search cryptocurrency..."
              className="flex-1 p-2 bg-transparent border-none text-white placeholder-gray-400 outline-none"
            />
            <datalist id="coinlist">
              {allCoin.map((item, index) => (
                <option key={index} value={item.name} />
              ))}
            </datalist>
          </form>

          {/* Sort Dropdown */}
          <div className="max-w-3xl mx-auto ">
            <select
              onChange={(e) => sortCoins(e.target.value)}
              value={sortType}
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:ring-2 focus:ring-purple-500"
            >
              <option value="market_cap">Sort by Market Cap</option>
              <option value="price">Sort by Price</option>
              <option value="change">Sort by 24H Change</option>
            </select>
          </div>
        </div>

      </div>

      
      {/* Crypto Table */}
      <div className=" lg:max-w-4xl max-w-3xl mx-auto mt-6 bg-gray-900 border border-gray-800 p-5 rounded-xl shadow-xl">
        {/* Table Header */}
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] py-3 border-b border-gray-700 text-white text-sm md:text-base font-semibold">
          <p className="text-center">#</p>
          <p className="text-center lg:text-left lg:pl-12">Coin</p>
          <p className="text-center">Price</p>
          <p className="text-center">24H %</p>
          <p className="text-center hidden md:block">Market Cap</p>
        </div>

        {/* Table Rows */}
        {displayCoin.length > 0 ? (
          displayCoin.slice(0, 10).map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] py-4 border-b border-gray-800 text-white items-center rounded-md hover:bg-gray-800/50 transition duration-300"
            >
              <p className="text-center">{item.market_cap_rank}.</p>
              <div className="flex items-center gap-2">
                <Link to={`./coin/${item.id}`} className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-8 md:w-10" />
                  <p className="">
                    {item.name} ({item.symbol.toUpperCase()})
                  </p>
                </Link>
              </div>
              <p className="text-center">
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                className={`text-center font-semibold   ${item.price_change_percentage_24h > 0
                    ? "text-green-400"
                    : "text-red-500"
                  }`}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="text-center  hidden md:block  ">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No coins found. Try another search.</p>
        )}
      </div>

    </div>
  );
};

export default Home;
