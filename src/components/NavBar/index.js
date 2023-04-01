import {Link} from 'react-router-dom'
import './index.css'

const Navbar = () => (
  <Link to="/">
    <div className="nav">
      <img
        className="logo"
        alt="website logo"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
      />
    </div>
  </Link>
)

export default Navbar
