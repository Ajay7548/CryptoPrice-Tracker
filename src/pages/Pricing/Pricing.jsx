import React, { useContext, useState, useEffect } from 'react'
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
import './Pricing.css'



const Pricing = () => {
    const { allCoin, currency } = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
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
        <div className='pricing' >
            
            <div className="crypto-table  ">
                <div className="table-layout">
                    <p>#</p>
                    <p style={{ marginLeft: '50px' }}>Coins</p>
                    <p style={{ marginLeft: '10px' }}>Price</p>
                    <p style={{ textAlign: "center" }}>24H Change</p>
                    <p className='marketCap'>Market Cap</p>
                </div>

                {displayCoin?.slice(0, 30).map((item, index) => (
                    //Navigate to coin page  that will show full details
                    <Link
                        to={`./coin/${item.id}`}
                        className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt={item.name} />
                            <p >{item.name} - {item.symbol}</p>
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
    )
}

export default Pricing