import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Coin from './pages/Coin/Coin'
import Footer from './components/Footer/Footer'
// import Pricing from './pages/Pricing/Pricing'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/Pricing' element={<Pricing/>}/> */}
          <Route path='/coin/:coindID' element={<Coin/>}/>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App