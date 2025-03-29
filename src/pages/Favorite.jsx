import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const Favorite = () => {
  const { favorites, toggleFavorite, currency } = useContext(CoinContext);
  const [localFavorites, setLocalFavorites] = useState(favorites); // ✅ Sync with context
  
  // Ensure `favorites` is loaded properly
  useEffect(() => {
    if (favorites.length === 0) {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
      setLocalFavorites(savedFavorites);
    } else {
      setLocalFavorites(favorites);
    }
  }, [favorites]);


  return (
    <div className="px-4 pb-24">
      <h2 className="text-2xl font-bold mt-10 dark:text-white text-black mb-5 text-center">
        Your Favorite Coins
      </h2>

{favorites.length > 0 && (

        <motion.div
          className="lg:max-w-4xl max-w-3xl mx-auto mt-6 dark:bg-gray-900 border border-gray-800 p-2 lg:p-5 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Table Header */}
        <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr] lg:grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] py-3 border-b border-gray-700 dark:text-white text-black text-sm md:text-md font-semibold">
          <p className="text-center">#</p>
          <p className="text-center lg:text-left lg:pl-12">Coin</p>
          <p className="text-center">Price</p>
          <p className="text-center">24H %</p>
          <p className="text-center hidden md:block">Market Cap</p>
        </div>
          {favorites.map((item, index) => (
            <motion.div
              key={item.id}
              className="grid grid-cols-[0.5fr_1fr_1fr_0.5fr_1fr] py-4 border-b border-gray-800 text-white items-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800/50 transition duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-center text-black dark:text-white">{item.market_cap_rank}.</p>
              <div className="flex items-center gap-2">
                
                <Link to={`/coin/${item.id}`} className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-8 md:w-10 text-black dark:text-white" />
                  <p className="text-black lg:text-md text-sm dark:text-white">
                    {item.name} ({item.symbol?.toUpperCase()})
                  </p>
                </Link>
              </div>
              <p className="text-center lg:text-md text-sm text-black dark:text-white">
                {currency?.symbol} {item.current_price?.toLocaleString()}
              </p>
              <p className={`text-center font-semibold ${item.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-500"}`}>
                {Math.floor(item.price_change_percentage_24h * 100) / 100}%
              </p>
              <p className="text-center hidden md:block text-black dark:text-white">
                {currency?.symbol} {item.market_cap?.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Favorite;
