import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Line } from "recharts";

const CryptoTracker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");

  const toggleWishlist = (crypto) => {
    setWishlist((prev) => {
      if (prev.find((item) => item.id === crypto.id)) {
        return prev.filter((item) => item.id !== crypto.id);
      } else {
        return [...prev, crypto];
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CryptoPlace – Enhanced</h1>
      <input
        type="text"
        placeholder="Search Cryptocurrency..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cryptos
          .filter((crypto) =>
            crypto.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((crypto) => (
            <Card key={crypto.id} className="p-4">
              <CardContent>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">{crypto.name}</h2>
                  <Button
                    onClick={() => toggleWishlist(crypto)}
                    className={
                      wishlist.find((item) => item.id === crypto.id)
                        ? "bg-red-500 text-white"
                        : "bg-gray-300"
                    }
                  >
                    {wishlist.find((item) => item.id === crypto.id)
                      ? "Remove"
                      : "Bookmark"}
                  </Button>
                </div>
                <p className="text-gray-600">Price: ${crypto.current_price}</p>
                <p
                  className={
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </p>
              </CardContent>
            </Card>
          ))}
      </div>

      <h2 className="text-xl font-bold mt-6">Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {wishlist.length > 0 ? (
          wishlist.map((crypto) => (
            <Card key={crypto.id} className="p-4">
              <CardContent>
                <h2 className="text-lg font-semibold">{crypto.name}</h2>
                <p className="text-gray-600">Price: ${crypto.current_price}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No items in wishlist.</p>
        )}
      </div>
    </div>
  );
};

export default CryptoTracker;
