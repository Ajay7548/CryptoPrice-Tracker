import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CoinContextProvider from '../context/Coincontext.jsx'

// import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
// import Layout from './layout/Layout.jsx'

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path='/' element={<Layout/>}>

//     </Route>
//   )
// )



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <CoinContextProvider>
        <App />
      </CoinContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
