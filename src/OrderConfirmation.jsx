import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { rupees } from './products.js'

function OrderConfirmation() {
  // the order was sent from the checkout page
  const location = useLocation()
  const order = location.state ? location.state.order : null
  const [successPopupOpen, setSuccessPopupOpen] = useState(Boolean(order))

  useEffect(() => {
    if (!successPopupOpen) return undefined

    function closeOnEscape(event) {
      if (event.key === 'Escape') setSuccessPopupOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [successPopupOpen])

  // if someone opens this page directly there is no order
  if (!order) {
    return (
      <div className="page center">
        <h1 className="page-title">No <span>order</span> found</h1>
        <p className="no-result">You have not placed an order yet.</p>
        <Link to="/products" className="main-btn">Go to products</Link>
      </div>
    )
  }

  const paymentText = {
    cod: 'Cash on delivery',
    upi: 'UPI',
    card: 'Card ending ' + order.cardLast4,
  }

  return (
    <div className="page">
      <div className="confirm-top">
        <div className="tick">✓</div>
        <h1 className="page-title">Thank you, <span>{order.customer.name}!</span></h1>
        <p className="page-sub">Your order has been placed successfully.</p>
        <p className="order-id">Order ID: <b>{order.id}</b> | Date: {order.date}</p>
      </div>

      <div className="two-col">
        <div className="form-box">
          <h3>Items</h3>
          {order.items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p className="muted">Qty: {item.qty} x {rupees(item.price)}</p>
              </div>
              <div className="cart-item-right"><b>{rupees(item.price * item.qty)}</b></div>
            </div>
          ))}
        </div>

        <div>
          <div className="summary-box">
            <h3>Shipping to</h3>
            <p>{order.customer.name}</p>
            <p>{order.customer.address}</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.email}</p>
          </div>

          <div className="summary-box">
            <h3>Payment</h3>
            <p className="muted">{paymentText[order.payment]}</p>
            <div className="summary-row"><span>Subtotal</span><span>{rupees(order.subtotal)}</span></div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? 'Free' : rupees(order.shipping)}</span>
            </div>
            <div className="summary-row total">
              <span>{order.payment === 'cod' ? 'Amount to pay on delivery' : 'Total paid'}</span>
              <span>{rupees(order.total)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="center">
        <Link to="/products" className="main-btn">Continue shopping</Link>
      </div>

      {successPopupOpen && (
        <div
          className="order-success-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSuccessPopupOpen(false)
          }}
        >
          <section
            className="order-success-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-success-title"
            aria-describedby="order-success-message"
          >
            <button
              className="order-success-close"
              type="button"
              aria-label="Close order confirmation"
              onClick={() => setSuccessPopupOpen(false)}
            >
              ×
            </button>
            <div className="order-success-icon" aria-hidden="true">✓</div>
            <p className="small-title">ORDER CONFIRMED</p>
            <h2 id="order-success-title">Thank you, {order.customer.name}!</h2>
            <p id="order-success-message">
              Your order has been placed successfully. We appreciate you shopping with For U.
            </p>
            <p className="order-success-id">Order ID: <b>{order.id}</b></p>
            <button
              className="main-btn"
              type="button"
              onClick={() => setSuccessPopupOpen(false)}
            >
              View order details
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

export default OrderConfirmation
