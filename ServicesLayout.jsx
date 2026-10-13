import { NavLink, Outlet } from "react-router-dom";

function ServicesLayout() {
  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">HOW WE HOST</span>
        <h1>Our services</h1>
        <p>From everyday dining to celebrations made memorable.</p>
      </div>

      <nav className="service-tabs" aria-label="Restaurant services">
        <NavLink to="/services/dine-in">Dine-in</NavLink>
        <NavLink to="/services/catering">Catering</NavLink>
        <NavLink to="/services/events">Private events</NavLink>
      </nav>

      <div className="service-content">
        <Outlet />
      </div>
    </div>
  );
}

export default ServicesLayout;