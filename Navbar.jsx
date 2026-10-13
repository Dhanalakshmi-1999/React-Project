import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">
      <div className="nav-container">
        <Link to="/" className="brand">
          <span className="brand-mark">S</span>
          <span>Vanadxs<span className="brand-dot">.</span></span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={getLinkClass}>
            Home
          </NavLink>

          <NavLink to="/menu" className={getLinkClass}>
            Menu
          </NavLink>

          <div className="nav-dropdown">
            <NavLink to="/services" className={getLinkClass}>
              Services ▾
            </NavLink>

            <div className="dropdown-menu">
              <Link to="/services/dine-in">Dine-in</Link>
              <Link to="/services/catering">Catering</Link>
              <Link to="/services/events">Private Events</Link>
            </div>
          </div>

          <NavLink to="/about" className={getLinkClass}>
            About
          </NavLink>

          <NavLink to="/reservations" className={getLinkClass}>
            Reservations
          </NavLink>

          <NavLink to="/contact" className={getLinkClass}>
            Contact
          </NavLink>
        </nav>

        <Link to="/reservations" className="nav-cta">
          Book a Table
        </Link>
      </div>
    </header>
  );
}

export default Navbar;