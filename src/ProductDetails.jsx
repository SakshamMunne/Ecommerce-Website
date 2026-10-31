import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from './useCart.js'
import { products, fetchProduct, rupees } from './products.js'
import ProductCard from './ProductCard'

function ProductDetails() {
  // productId comes from the url: /products/:productId
  const { productId } = useParams()
  const { addToCart } = useCart()

  const [result, setResult] = useState({ productId: null, product: null, error: '' })
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const loading = result.productId !== productId
  const product = result.product
  const error = result.error

  useEffect(() => {
    let active = true
    fetchProduct(productId)
      .then((data) => {
        if (active) {
          setResult({ productId, product: data, error: '' })
          setQty(1)
          setAdded(false)
        }
      })
      .catch((err) => {
        if (active) {
          setResult({ productId, product: null, error: err.message })
        }
      })
    return () => {
      active = false
    }
  }, [productId])

  if (loading) {
    return <div className="page"><p className="loading">Loading product...</p></div>
  }

  if (error) {
    return (
      <div className="page center">
        <div className="error-box">
          <h2>Oops!</h2>
          <p>{error}</p>
        </div>
        <Link to="/products" className="main-btn">Back to products</Link>
      </div>
    )
  }

  function handleAdd() {
    addToCart(product, qty)
    setAdded(true)
  }

  // other products from the same category
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="page">
      <Link to="/products" className="back-link">← Back to products</Link>

      <div className="details">
        <img src={product.image} alt={product.name} className="details-img" />

        <div className="details-info">
          <p className="small-title">{product.category.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="details-price">{rupees(product.price)}</p>
          <p className="details-text">{product.info}</p>

          <ul className="details-list">
            <li>Free shipping above ₹2,999</li>
            <li>Cash on delivery available</li>
            <li>Easy returns within 7 days</li>
          </ul>

          <div className="qty-row">
            <span>Quantity</span>
            <div className="qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          <div className="details-buttons">
            <button className="main-btn" onClick={handleAdd}>Add to bag</button>
            <Link to="/cart" className="outline-btn">Go to cart</Link>
          </div>

          {added && <p className="thanks">Added {qty} item(s) to your bag!</p>}
        </div>
      </div>

      {related.length > 0 && (
        <div className="related">
          <h2>You may also <span>like</span></h2>
          <div className="grid">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
