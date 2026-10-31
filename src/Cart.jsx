import { Link } from 'react-router-dom'
import { useCart } from './useCart.js'
import { rupees } from './products.js'

function Cart() {
  const { cart, cartCount, subtotal, shipping, total, changeQty, removeItem } = useCart()

  if (cart.length === 0) {
    return (
      <div className="page center">
        <h1 className="page-title">Your <span>Bag</span></h1>
        <p className="no-result">Your bag is empty.</p>
        <Link to="/products" className="main-btn">Start shopping</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title">Your <span>Bag</span></h1>
      <p className="page-sub">You have {cartCount} item(s) in your bag.</p>

      <div className="two-col">
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <Link to={'/products/' + item.id}>
                <img src={item.image} alt={item.name} />
              </Link>

              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="muted">{item.category} | {rupees(item.price)} each</p>

                <div className="qty">
                  <button onClick={() => changeQty(item.id, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)}>+</button>
                </div>
              </div>

              <div className="cart-item-right">
                <b>{rupees(item.price * item.qty)}</b>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-box">
          <h3>Order summary</h3>
          <div className="summary-row"><span>Items</span><span>{cartCount}</span></div>
          <div className="summary-row"><span>Subtotal</span><span>{rupees(subtotal)}</span></div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : rupees(shipping)}</span>
          </div>
          <div className="summary-row total"><span>Total</span><span>{rupees(total)}</span></div>

          <Link to="/checkout" className="main-btn full">Proceed to checkout</Link>
          <Link to="/products" className="continue-link">Continue shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
