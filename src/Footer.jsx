import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="logo">For <span>U</span></Link>
      <p>© 2026 For U. All rights reserved.</p>
    </footer>
  )
}

export default Footer
