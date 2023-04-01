import NavBar from '../NavBar'
import './index.css'

const NotFound = () => (
  <>
    <NavBar />
    <div className="notFound">
      <img
        className="notImage"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
    </div>
  </>
)

export default NotFound
