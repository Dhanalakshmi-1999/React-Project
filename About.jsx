
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container page-section">
      <div className="about-layout">
        <div className="about-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85"
            alt="Chef preparing a restaurant dish"
            className="about-image"
          />
        </div>

        <div className="about-copy">
          <span className="eyebrow">OUR STORY</span>

          <h1>A place for food, people and stories.</h1>

          <p>
            Vanadxs is built around a simple idea: a good meal can bring
            people closer together. Our restaurant celebrates seasonal
            ingredients, thoughtful preparation and genuine hospitality.
          </p>

          <p>
            Whether you are joining us for a quick lunch, a family dinner
            or a special occasion, our goal is to make you feel welcome.
          </p>

          <div className="values-grid">
            <div>
              <strong>01</strong>
              <h3>Fresh ingredients</h3>
              <p>Quality and flavour come first.</p>
            </div>

            <div>
              <strong>02</strong>
              <h3>Made with care</h3>
              <p>Every detail matters.</p>
            </div>

            <div>
              <strong>03</strong>
              <h3>Warm hospitality</h3>
              <p>Everyone has a place at our table.</p>
            </div>
          </div>

          <div className="about-actions">
            <Link to="/menu" className="button button-primary">
              Discover Our Menu
            </Link>

            <Link to="/contact" className="button button-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
