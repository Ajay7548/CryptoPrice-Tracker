import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import { Sun, Moon, ArrowUpRightIcon, ListMinus, X } from "lucide-react";
import { useDarkMode } from "../context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);
  const { darkMode, setDarkMode } = useDarkMode();
  const [isVisible,setIsVisible] = useState(false)

  const toggleMobileScreen = () =>{
    setIsVisible(!isVisible)
  }
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
      <Link to="/" className="lg:text-2xl text-lg font-bold text-neutral-900 dark:text-white transition-colors duration-300">
        CryptoTrendz.
      </Link>

      <ul className="lg:flex hidden  gap-2 pl-24  items-center text-lg font-medium">
        <li>
          <Link
            to="/"
            className="px-2 py-2 rounded-lg transition-all duration-300 hover:text-yellow-400 hover:underline"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/favourite"
            className="px-2 py-2 rounded-lg transition-all duration-300 hover:text-yellow-400 hover:underline"
          >
            Favourites
          </Link>
        </li>
      </ul>

     
      {/* Right Section */}
      <div className="flex items-center gap-2 lg:gap-6">
        {/* Currency Selector */}
        <select
          onChange={currencyHandler}
          className="lg:p-1.5 p-0.5 border border-gray-400 dark:border-gray-600 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-md 
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
            Login <ArrowUpRightIcon className="size-4" />
          </button>
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="relative w-12 lg:w-16 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center p-1 transition-all shadow-inner"
        >
          <div
            className={`absolute w-6 h-6 rounded-full shadow-md transform transition-all duration-300 ease-in-out ${darkMode
                ? "translate-x-4 lg:translate-x-8 bg-gray-900 shadow-lg shadow-yellow-400"
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
        

        <motion.div
          onClick={() => setIsVisible(true)}
          whileHover={{ scale: 1.1 }}
          className="sm:hidden cursor-pointer"
        >
          <ListMinus className={`w-6 h-6 ${darkMode ? "text-white" : "text-black"}`} />
        </motion.div>
        <AnimatePresence>
                {isVisible && (
                  <motion.div
                    className="fixed top-0 right-0 bottom-0 w-64 bg-white dark:bg-gray-950  text-gray-600 dark:text-gray-300 shadow-lg z-50"
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col">
                      <div
                        onClick={() => setIsVisible(false)}
                        className="flex items-center gap-4 p-6 cursor-pointer"
                      >
                        <span><X/></span>
                        <p>Back</p>
                      </div>
                    <ul className="px-6 py-2 text-xl">
                      <li className="p-2 border-b border-gray-500"><Link to={'/'}>Home</Link></li>
                      <li className="p-2 border-b border-gray-500"><Link to={'/favourite'}>Favourite</Link></li>
                    </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
     </div>
    </nav>
  );
};

export default Navbar;
