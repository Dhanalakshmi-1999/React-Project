import { Link } from "react-router-dom";

function DineIn() {
  return (
    <div className="service-detail">
      <div>
        <span className="eyebrow">THE RESTAURANT EXPERIENCE</span>
        <h2>Relax, settle in and enjoy.</h2>

        <p>
          Enjoy freshly prepared meals in a welcoming setting. Our dine-in
          experience is designed for weekday lunches, relaxed dinners and
          time well spent with friends and family.
        </p>

        <ul className="check-list">
          <li>Comfortable indoor dining</li>
          <li>Freshly prepared menu options</li>
          <li>Options for families and groups</li>
        </ul>

        <Link to="/reservations" className="button button-primary">
          Book Your Table
        </Link>
      </div>

      <img
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=85"
        alt="Restaurant dining table"
      />
    </div>
  );
}

export default DineIn;