
import { Link } from "react-router-dom";

function Events() {
  return (
    <div className="service-detail">
      <div>
        <span className="eyebrow">CELEBRATE TOGETHER</span>

        <h2>Make your occasion memorable.</h2>

        <p>
          Plan birthdays, anniversaries, team dinners and intimate
          celebrations with a welcoming atmosphere and a menu your
          guests can enjoy together.
        </p>

        <ul className="check-list">
          <li>Small-group celebrations</li>
          <li>Special dinner gatherings</li>
          <li>Event and menu enquiries</li>
        </ul>

        <Link
          to="/reservations"
          state={{ bookingType: "Private Event" }}
          className="button button-primary"
        >
          Plan Your Event
        </Link>
      </div>

      <img
        src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85"
        alt="Elegant event table setting"
      />
    </div>
  );
}

export default Events;
