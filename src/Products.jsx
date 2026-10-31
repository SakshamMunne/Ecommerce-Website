import { useState } from 'react'
import { products, categories } from './products.js'
import ProductCard from './ProductCard'

function Products() {
  const [category, setCategory] = useState('All')
  const [price, setPrice] = useState('all')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  // filter by category, price range and search text
  let shownProducts = products.filter((p) => {
    const categoryMatch = category === 'All' || p.category === category

    let priceMatch = true
    if (price === 'low') priceMatch = p.price < 1500
    if (price === 'mid') priceMatch = p.price >= 1500 && p.price <= 3000
    if (price === 'high') priceMatch = p.price > 3000

    const searchMatch = p.name.toLowerCase().includes(search.toLowerCase())
    return categoryMatch && priceMatch && searchMatch
  })

  // sort by price if user selected it
  if (sort === 'low') shownProducts.sort((a, b) => a.price - b.price)
  if (sort === 'high') shownProducts.sort((a, b) => b.price - a.price)

  function clearFilters() {
    setCategory('All')
    setPrice('all')
    setSearch('')
    setSort('default')
  }

  return (
    <div className="page">
      <h1 className="page-title">All <span>Products</span></h1>
      <p className="page-sub">Hover on a product to see details, or click it to open the full page.</p>

      <div className="shop-top">
        <div>
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? 'tab active' : 'tab'}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="filters">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={price} onChange={(e) => setPrice(e.target.value)}>
            <option value="all">All prices</option>
            <option value="low">Under ₹1,500</option>
            <option value="mid">₹1,500 - ₹3,000</option>
            <option value="high">Above ₹3,000</option>
          </select>

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort by</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      <p className="result-count">Showing {shownProducts.length} of {products.length} products</p>

      <div className="grid">
        {shownProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {shownProducts.length === 0 && (
        <div className="center">
          <p className="no-result">No products found.</p>
          <button className="main-btn" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </div>
  )
}

export default Products
