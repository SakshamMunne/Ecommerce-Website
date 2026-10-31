import { Link, NavLink } from 'react-router-dom'
import { useCart } from './useCart.js'

function Header() {
  const { cartCount } = useCart()

  return (
    <>
      <div className="top-bar">Free shipping on orders above ₹2,999 | Cash on delivery available</div>

      <header className="header">
        <Link to="/" className="logo">For <span>U</span></Link>

        <nav className="nav">
          {/* NavLink adds the "active" class to the page we are on */}
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/cart" className="cart-link">
            🛒 Cart <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </nav>
      </header>
    </>
  )
}

export default Header
