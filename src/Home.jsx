import { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from './products.js'
import ProductCard from './ProductCard'

function Home() {
  const [subscribed, setSubscribed] = useState(false)

  // featured products = a few of our favourite ones
  const featured = products.filter((p) => [1, 2, 9, 13].includes(p.id))

  return (
    <div>
      <section className="hero">
        <div className="hero-text">
          <p className="small-title">NEW COLLECTION</p>
          <h1>Good things for <span>every day.</span></h1>
          <p className="hero-para">
            Simple and useful things for your life, made with care and chosen to last long.
          </p>
          <Link to="/products" className="main-btn">Shop now</Link>
        </div>
        <img
          className="hero-img"
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85"
          alt="Living room"
        />
      </section>

      {/* promotions */}
      <section className="promo-grid">
        <div className="promo-box">
          <h3>10% off</h3>
          <p>On your first order when you subscribe to our list.</p>
        </div>
        <div className="promo-box">
          <h3>Free shipping</h3>
          <p>On all orders above ₹2,999 anywhere in India.</p>
        </div>
        <div className="promo-box">
          <h3>Cash on delivery</h3>
          <p>Pay when your order reaches your home.</p>
        </div>
      </section>

      {/* featured products */}
      <section className="shop">
        <h2>Featured <span>Products</span></h2>
        <p className="shop-sub">Our most loved things this month.</p>

        <div className="grid featured-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="center">
          <Link to="/products" className="main-btn">View all products</Link>
        </div>
      </section>

      <section className="about">
        <img
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
          alt="Cosy home"
        />
        <div className="about-text">
          <p className="small-title">ABOUT US</p>
          <h2>Keep what <span>feels good.</span></h2>
          <p>
            We believe the best things are not the most things. So we pick simple designs
            and good materials that stay with you for a long time.
          </p>
        </div>
      </section>

      <section className="newsletter">
        <h2>Get 10% off your first order</h2>
        <p>Join our list for new products and offers.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubscribed(true)
          }}
        >
          <input type="email" placeholder="Enter your email" required />
          <button type="submit">Subscribe</button>
        </form>
        {subscribed && <p className="thanks">Thank you for subscribing!</p>}
      </section>
    </div>
  )
}

export default Home
