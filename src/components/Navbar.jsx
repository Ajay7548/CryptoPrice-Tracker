import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import arrow_icon from "../assets/arrow_icon.png";
import { MoonIcon, SunIcon } from "lucide-react";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

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
    <nav className="flex items-center justify-between p-5 md:px-8 border-b-2 border-gray-700 text-white ">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        Cryptotracker.
      </Link>
      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-8 list-none">
        <Link to="/" className="hover:text-gray-400 transition">
          Home
          <hr className=" hidden" />
        </Link>
        <Link to="/features" className="hover:text-gray-400 transition">
          Features <hr className=" hidden" />
        </Link>
        <Link className="cursor-pointer hover:text-gray-400 transition">
          Pricing <hr className=" hidden" />
        </Link>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <SunIcon />
        {/* <MoonIcon /> */}
        {/* Currency Selector */}
        <select
          onChange={currencyHandler}
          className="p-2 border border-gray-700 text-white bg-black rounded-md 
             hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition-all duration-200 ease-in-out cursor-pointer "
        >
          <option className="bg-black text-white" value="inr">
            INR
          </option>
          <option className="bg-black text-white" value="usd">
            USD
          </option>
          <option className="bg-black text-white" value="eur">
            EUR
          </option>
        </select>

        {/* Sign-up Button */}
        <button className="flex items-center gap-2 px-5 py-2 focus:ring-2 focus:ring-blue-500  cursor-pointer rounded-full bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 transition">
          Sign up <img src={arrow_icon} alt="arrow" className="w-4" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
