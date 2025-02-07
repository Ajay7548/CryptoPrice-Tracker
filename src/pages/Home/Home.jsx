import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { CoinContext } from '../../context/Coincontext';
import { Link } from 'react-router-dom';

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInput] = useState('');

  // Handle search input change
  const inputHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value === '') {
      setDisplayCoin(allCoin)
    }
  };

  // Handle search and filter coins based on the name
  const submitHandler = async (event) => {
    event.preventDefault();
    const filteredCoins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(filteredCoins);
  };

  // Update displayCoin state when allCoin changes
  useEffect(() => {
    setDisplayCoin(allCoin);
    setLoading(false);  // After fetching, turn off loading
    console.log(allCoin)
  }, [allCoin]);

  // Show loading message while the data is fetching
  if (loading) return <p>Loading...</p>;

  // Show error message if there is an error
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='Home'>
      <div className="Hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. Sign up to explore more about cryptos</p>
        <form onSubmit={submitHandler}>


          <input
            onChange={inputHandler}
            required
            value={input}
            list='coinlist'
            type="text"
            placeholder='Search Crypto'
          />


          <datalist id='coinlist'>
            {
              allCoin.map((item, index) => {
                //{} if uisng braces need to return 
                 return <option key={index} value={item.name} />
              })
            }
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p style={{ marginLeft: '50px' }}>Coins</p>
          <p style={{ marginLeft: '10px' }}>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='marketCap'>Market Cap</p>
        </div>

        {displayCoin?.slice(0, 7).map((item, index) => (
            //Navigate to coin page  that will show full details
         <Link 
          to={`./coin/${item.id}`} 
           className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={item.name} />
              <p>{item.name} - {item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}%
            </p>
            <p className='marketCap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;


// useEffect(() => {
//   const fetchCoins = async () => {
//     try {
//       setError(null); // Reset error before fetching
//       setLoading(true);

//       const response = await fetch(
//         "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP Error ${response.status}`);
//       }

//       const data = await response.json();
//       if (!Array.isArray(data)) throw new Error("Invalid API response");

//       setDisplayCoin(data); // Update state with fetched data
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCoins();
// }, []);