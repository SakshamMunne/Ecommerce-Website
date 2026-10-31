import { useEffect, useState } from 'react'
import { FREE_SHIPPING_LIMIT, SHIPPING_FEE } from './products.js'
import { CartContext } from './cart-context.js'

// the cart lives here so every page can use it
export function CartProvider({ children }) {
  // start with whatever was saved in the browser (so cart stays after refresh)
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('foru-cart') || '[]'))

  // save the cart every time it changes
  useEffect(() => {
    localStorage.setItem('foru-cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(product, qty = 1) {
    const found = cart.find((item) => item.id === product.id)
    if (found) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, qty: item.qty + qty } : item)))
    } else {
      setCart([...cart, { ...product, qty: qty }])
    }
  }

  // increase or decrease quantity (never goes below 1)
  function changeQty(id, amount) {
    setCart(cart.map((item) => (item.id === id ? { ...item, qty: Math.max(1, item.qty + amount) } : item)))
  }

  function removeItem(id) {
    setCart(cart.filter((item) => item.id !== id))
  }

  function clearCart() {
    setCart([])
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  return (
    <CartContext.Provider
      value={{ cart, cartCount, subtotal, shipping, total, addToCart, changeQty, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
