import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from './useCart.js'
import { rupees } from './products.js'

// one input with its label and error message
function Field({ label, name, value, onChange, error, placeholder, type = 'text' }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} placeholder={placeholder} />
      {error && <span className="error">{error}</span>}
    </div>
  )
}

function Checkout() {
  const { cart, cartCount, subtotal, shipping, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', city: '', pincode: '',
    payment: 'cod', upi: '', cardNumber: '', expiry: '', cvv: '',
  })
  const [errors, setErrors] = useState({})

  // update the field that the user is typing in
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // check all the inputs, returns an object with error messages
  function validate() {
    const e = {}

    if (form.name.trim().length < 3) e.name = 'Please enter your full name (at least 3 letters).'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Please enter a valid email, like name@gmail.com.'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10 digit mobile number.'
    if (form.address.trim().length < 10) e.address = 'Please enter your full address (at least 10 characters).'
    if (form.city.trim() === '') e.city = 'Please enter your city.'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Pincode must be exactly 6 digits.'

    if (form.payment === 'upi' && !/^[\w.-]+@\w+$/.test(form.upi)) {
      e.upi = 'Enter a valid UPI id, like name@upi.'
    }
    if (form.payment === 'card') {
      if (!/^\d{16}$/.test(form.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Card number must be 16 digits.'
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) e.expiry = 'Use MM/YY format, like 08/28.'
      if (!/^\d{3}$/.test(form.cvv)) e.cvv = 'CVV must be 3 digits.'
    }

    return e
  }

  function handleSubmit(event) {
    event.preventDefault()

    const foundErrors = validate()
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length > 0) return // stop if there are errors

    // make the order and go to the confirmation page
    const order = {
      id: 'FU' + Date.now().toString().slice(-8),
      date: new Date().toLocaleDateString('en-IN'),
      items: cart,
      subtotal: subtotal,
      shipping: shipping,
      total: total,
      payment: form.payment,
      cardLast4: form.payment === 'card' ? form.cardNumber.replace(/\s/g, '').slice(-4) : '',
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address + ', ' + form.city + ' - ' + form.pincode,
      },
    }

    clearCart()
    navigate('/order-confirmation', { state: { order: order } })
  }

  if (cart.length === 0) {
    return (
      <div className="page center">
        <h1 className="page-title"><span>Checkout</span></h1>
        <p className="no-result">Your bag is empty, so there is nothing to checkout.</p>
        <Link to="/products" className="main-btn">Go to products</Link>
      </div>
    )
  }

  return (
    <div className="page">
      <h1 className="page-title"><span>Checkout</span></h1>
      <p className="page-sub">Fill in your details to place the order.</p>

      <form className="two-col" onSubmit={handleSubmit} noValidate>
        <div>
          <div className="form-box">
            <h3>Shipping details</h3>
            <Field label="Full name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Your full name" />
            <div className="field-row">
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@gmail.com" />
              <Field label="Mobile number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} placeholder="10 digit number" />
            </div>
            <Field label="Address" name="address" value={form.address} onChange={handleChange} error={errors.address} placeholder="House no, street, area" />
            <div className="field-row">
              <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} placeholder="City" />
              <Field label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} error={errors.pincode} placeholder="6 digit pincode" />
            </div>
          </div>

          <div className="form-box">
            <h3>Payment method</h3>

            <label className="pay-option">
              <input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} />
              Cash on delivery
            </label>
            <label className="pay-option">
              <input type="radio" name="payment" value="upi" checked={form.payment === 'upi'} onChange={handleChange} />
              UPI
            </label>
            <label className="pay-option">
              <input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} />
              Debit / Credit card
            </label>

            {form.payment === 'upi' && (
              <Field label="UPI id" name="upi" value={form.upi} onChange={handleChange} error={errors.upi} placeholder="name@upi" />
            )}

            {form.payment === 'card' && (
              <>
                <Field label="Card number" name="cardNumber" value={form.cardNumber} onChange={handleChange} error={errors.cardNumber} placeholder="1234 5678 9012 3456" />
                <div className="field-row">
                  <Field label="Expiry" name="expiry" value={form.expiry} onChange={handleChange} error={errors.expiry} placeholder="MM/YY" />
                  <Field label="CVV" name="cvv" value={form.cvv} onChange={handleChange} error={errors.cvv} placeholder="3 digits" />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="summary-box">
          <h3>Your order ({cartCount} items)</h3>
          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>{item.name} x {item.qty}</span>
              <span>{rupees(item.price * item.qty)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>{rupees(subtotal)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : rupees(shipping)}</span></div>
          <div className="summary-row total"><span>Total</span><span>{rupees(total)}</span></div>

          <button type="submit" className="main-btn full">
            {form.payment === 'cod' ? 'Place order' : 'Pay ' + rupees(total)}
          </button>
          <Link to="/cart" className="continue-link">Back to bag</Link>
        </div>
      </form>
    </div>
  )
}

export default Checkout
