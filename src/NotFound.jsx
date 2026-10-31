import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="page center not-found">
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>Sorry, the page you are looking for does not exist or was moved.</p>
      <Link to="/" className="main-btn">Back to home</Link>
    </div>
  )
}

export default NotFound
