import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Coin from "./pages/Coin";
import Footer from "./components/Footer";
// import Favourite from "./pages/Favourite/Favourite";
// import Features from "./pages/Features/Features";
// import Pricing from "./pages/Pricing/Pricing";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/favourite" element={<Favourite />} /> */}
          {/* <Route path="/features" element={<Features />} /> */}
          {/* <Route path="/pricing" element={<Pricing />} /> */}
          <Route path="/coin/:coinID" element={<Coin />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
