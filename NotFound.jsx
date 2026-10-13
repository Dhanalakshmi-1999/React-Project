import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container page-section empty-state not-found">
      <span className="eyebrow">404 · PAGE NOT FOUND</span>
      <h1>Looks like this table is empty.</h1>
      <p>The page you are looking for doesn't exist.</p>

      <Link to="/" className="button button-primary">
        Return Home
      </Link>
    </div>
  );
}

export default NotFound;