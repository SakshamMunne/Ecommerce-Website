import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import { CartProvider } from './CartContext'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Home from './Home.jsx'
import Products from './Products.jsx'
import ProductDetails from './ProductDetails.jsx'
import Cart from './Cart.jsx'
import Checkout from './Checkout.jsx'
import OrderConfirmation from './OrderConfirmation.jsx'
import NotFound from './NotFound.jsx'

// goes to the top of the page whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          {/* any other url shows the 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
