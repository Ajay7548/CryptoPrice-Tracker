import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import { Star, StarOff } from "lucide-react";

const Home = () => {
  const { allCoin, currency,favorites, toggleFavorite } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
  const [sortType, setSortType] = useState("market_cap");


  useEffect(() => {
    setDisplayCoin(allCoin);
    setLoading(false);
  }, [allCoin]);

  const inputHandler = (event) => {
    setInput(event.target.value);
    filterCoins(event.target.value);
  };

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
          className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-all duration-300"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="px-4 pb-24">

      {/* Hero Section */}
      <motion.div
        className="max-w-[650px] mx-auto mt-16 flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold md:text-5xl dark:text-white text-neutral-800">
          Track Crypto Prices in Real Time
        </h1>
        <p className="dark:text-gray-300 text-gray-800 w-4/5 md:w-3/4 leading-relaxed">
          Stay updated with live cryptocurrency prices, market trends, and analytics.
        </p>
        <div className="flex flex-col lg:flex-row-reverse items-center gap-4 w-full">
  {/* Sort Dropdown - Appears first on mobile, second on large screens */}
  <div className="w-1/2 lg:w-auto">
    <select
      onChange={(e) => sortCoins(e.target.value)}
      value={sortType}
      className="w-full lg:w-auto dark:bg-gray-900 text-sm lg:text-lg dark:text-white text-gray-700 dark:border-none border p-4 rounded-md focus:ring-2 focus:ring-purple-500 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <option value="market_cap">Sort by Market Cap</option>
      <option value="price">Sort by Price</option>
      <option value="change">Sort by 24H Change</option>
    </select>
  </div>

  {/* Search Form - Appears second on mobile, first on large screens */}
  <form className="flex w-full dark:bg-gray-900 border border-gray-700 p-3 rounded-lg items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-xl">
    <input
      onChange={inputHandler}
      value={input}
      list="coinlist"
      type="text"
      placeholder="Search cryptocurrency..."
      className="flex-1 text-sm lg:text-base p-1 bg-transparent border-none dark:text-white text-black placeholder-gray-400 outline-none"
    />
    <datalist id="coinlist">
      {allCoin.map((item, index) => (
        <option key={index} value={item.name} />
      ))}
    </datalist>
  </form>
</div>

      </motion.div>

      {/* Crypto Table */}
      <motion.div
        className="lg:max-w-4xl max-w-3xl mx-auto mt-6 dark:bg-gray-900 border border-gray-800 p-2 lg:p-5 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Table Header */}
        <div className="grid grid-cols-[0.25fr_1.5fr_1fr_0.5fr] lg:grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] py-3 border-b border-gray-700 dark:text-white text-black text-sm md:text-lg font-semibold">
          <p className="text-center">#</p>
          <p className="text-center lg:text-left lg:pl-12">Coin</p>
          <p className="text-center">Price</p>
          <p className="text-center">24H %</p>
          <p className="text-center hidden md:block">Market Cap</p>
        </div>

        {/* Table Rows */}
        {displayCoin.length > 0 ? (
          displayCoin.slice(0, 10).map((item, index) => (
            <motion.div
              key={index}
              className="grid grid-cols-[0.25fr_1.5fr_1fr_0.5fr] lg:grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr]  py-4 border-b border-gray-800 text-white items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-center  text-black dark:text-white">{item.market_cap_rank}.</p>
              <div className="flex items-center gap-2">
               {/* Star button toggles favorite */}
          <button onClick={() => toggleFavorite(item)} className="cursor-pointer">
            {favorites.some((fav) => fav.id === item.id) ? (
              <Star
              size={24}
              color={favorites ? "#FFD700" : "#555"} // Yellow if favorite
              fill={favorites ? "#FFD700" : "none"}  // Yellow fill if favorite
              stroke={favorites ? "#FFD700" : "#555"} // Yellow border if favorite
              className="text-yellow-500" />
            ) : (
              <Star size={24} className="text-yellow-300"/>
            )}
          </button>
                <Link to={`./coin/${item.id}`} className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-8 md:w-10  text-black dark:text-white" />
                  <p className="text-black  lg:text-lg text-sm dark:text-white">
                    {item.name} ({item.symbol.toUpperCase()})
                  </p>
                </Link>
              </div>
              <p className="text-center lg:text-lg text-sm text-black dark:text-white">
                {currency.symbol} {item.current_price.toLocaleString()}
              </p>
              <p
                className={`text-center  font-semibold ${
                  item.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-500"
                }`}
              >
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="text-center hidden md:block text-black dark:text-white">
                {currency.symbol} {item.market_cap.toLocaleString()}
              </p>
            </motion.div>
          ))
        ) : (
          <p className="dark:text-gray-400 text-center py-4 text-black">No coins found. Try another search.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Home;
