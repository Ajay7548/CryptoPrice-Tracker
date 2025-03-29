import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { ThemeProvider } from "./context/ThemeContext";
import Favorite from "./pages/Favorite";

const App = () => {

  return (
   <ThemeProvider>
     <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950  text-white">
      {/* Navbar */}
      <Navbar/>

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          {/* isDarkMode should be put in elemnt only  */}
          <Route path="/" element={<Home  />} />
          <Route path="/favourite" element={<Favorite  />} />
          <Route path="/coin/:coinID" element={<Coin  />} />
          <Route path="/login" element={<Login  />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer  />
    </div>
   </ThemeProvider>
  );
};

export default App;
