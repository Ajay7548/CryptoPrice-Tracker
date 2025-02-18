import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../context/Coincontext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const { setCurrency } = useContext(CoinContext)
  const currencyHandler = (event) => {
    switch (event.target.value) {
      case 'usd': {
        setCurrency({ name: 'usd', symbol: "$" })
      }
        break;
      case 'inr': {
        setCurrency({ name: 'inr', symbol: "₹" })
      }
        break;
      case 'eur': {
        setCurrency({ name: 'eur', symbol: "€" })
      }
        break;
      default:{
        setCurrency({ name: 'usd', symbol: "$" })
      }
        break;

    }
  }
  return (
    <div className='navbar'>
      <Link  to={'/'}>
      <img src={logo} alt=""
        className='logo'
      />
      </Link>
      <ul>
        <Link to={'/'}><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
        {/* <Link to={'/Pricing'}><li>Pricing</li></Link> */}
        {/* <li>Blog</li> */}
      </ul>
      <div className='nav-right'>
        <select onChange={currencyHandler}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
        </select>
        <button>Sign up <img src={arrow_icon}></img> </button>
      </div>
    </div>
  )
}

export default Navbar