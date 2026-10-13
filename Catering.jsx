import { Link } from "react-router-dom";

function Catering() {
  return (
    <div className="service-detail">
      <div>
        <span className="eyebrow">GOOD FOOD, WHERE YOU NEED IT</span>
        <h2>Catering for your gathering.</h2>

        <p>
          Bring Vanadxs flavours to office lunches, family celebrations
          and special get-togethers. We can help plan a menu suited to
          your occasion and group size.
        </p>

        <ul className="check-list">
          <li>Corporate lunches</li>
          <li>Family celebrations</li>
          <li>Custom menu enquiries</li>
        </ul>

        
<Link
  to="/reservations"
  state={{ bookingType: "Catering" }}
  className="button button-primary"
>
  Plan Your Catering
</Link>

      </div>

      <img
        src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=85"
        alt="Food arranged for catering"
      />
    </div>
  );
}

export default Catering;