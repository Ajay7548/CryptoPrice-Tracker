import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import { Sun, Moon,ArrowUpRightIcon } from "lucide-react";
import { useDarkMode } from "../context/ThemeContext";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const { darkMode, setDarkMode } = useDarkMode();

  // Currency Handler
  const currencyHandler = (event) => {
    const currencyMap = {
      usd: { name: "usd", symbol: "$" },
      inr: { name: "inr", symbol: "₹" },
      eur: { name: "eur", symbol: "€" },
    };
    setCurrency(currencyMap[event.target.value] || currencyMap.usd);
  };

  return (
    <nav className="flex  items-center justify-between bg-white dark:bg-gray-950 p-5 md:px-8 border-b-2 dark:text-white dark:border-gray-800 border-gray-200 text-neutral-900 transition-colors duration-300">
      {/* Logo */}
      <Link to="/" className="text-2xl  font-bold text-neutral-900 dark:text-white transition-colors duration-300">
        CryptoTrendz.
      </Link>


      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-6">
        {/* Currency Selector */}
        <select
          onChange={currencyHandler}
          className="lg:p-1.5 p-1 border border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md 
             hover:border-gray-500 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition-all duration-300 ease-in-out cursor-pointer"
        >
          <option className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white" value="inr">INR</option>
          <option className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white" value="usd">USD</option>
          <option className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white" value="eur">EUR</option>
        </select>

        {/* Login Button */}
        <Link to={'/login'}>
          <button className="lg:flex  hidden items-center gap-2 px-5 py-2 rounded-full text-sm font-medium 
             bg-gray-200 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-600 
             hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500"
          >
            Login <ArrowUpRightIcon className="size-4"/>
          </button>
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center p-1 transition-all shadow-inner"
        >
          <div
            className={`absolute w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
              darkMode
                ? "translate-x-8 bg-gray-900 shadow-lg shadow-yellow-400"
                : "translate-x-0 bg-white shadow-md"
            } flex items-center justify-center`}
          >
            {darkMode ? (
              <Moon className="w-4 h-4 text-yellow-400" />
            ) : (
              <Sun className="w-4 h-4 text-yellow-500" />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
