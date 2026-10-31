import { Link } from 'react-router-dom'
import { useCart } from './useCart.js'
import { rupees } from './products.js'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className="card">
      <div className="image-box">
        <Link to={'/products/' + product.id}>
          <img src={product.image} alt={product.name} />
        </Link>

        {/* this box comes up when we hover on the product */}
        <div className="hover-info">
          <p className="hover-category">{product.category}</p>
          <p className="hover-text">{product.info}</p>
          <Link to={'/products/' + product.id} className="view-btn">View details</Link>
          <button onClick={() => addToCart(product)}>Add to bag</button>
        </div>
      </div>

      <div className="card-bottom">
        <h3><Link to={'/products/' + product.id}>{product.name}</Link></h3>
        <p>{rupees(product.price)}</p>
      </div>
    </div>
  )
}

export default ProductCard
