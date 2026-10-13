import { Link } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import RecipeCard from "../components/RecipeCard";

function Home() {
  const { data, loading, error } = useFetchData(
    "https://dummyjson.com/recipes?limit=4"
  );

  const recipes = data?.recipes || [];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">FRESH FLAVOURS · WARM MOMENTS</span>

          <h1>
            Good food.
            <br />
            <span>Great company.</span>
          </h1>

          <p>
            Discover thoughtfully prepared dishes, fresh ingredients,
            and a dining experience worth coming back for.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="button button-primary">
              Explore Our Menu →
            </Link>

            <Link to="/reservations" className="button button-light">
              Reserve a Table
            </Link>
          </div>

          <div className="hero-note">
            <span className="hero-note-stars">★★★★★</span>
            <span>Made with care, served with love.</span>
          </div>
        </div>

        <div className="hero-image-wrap">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1100&q=85"
            alt="Warm and welcoming restaurant interior"
          />

          <div className="hero-image-label">
            <span>THE VANADXS EXPERIENCE</span>
            <strong>A little more delicious.</strong>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM OUR KITCHEN</span>
            <h2>Popular picks</h2>
            <p>Explore a few dishes from our featured menu.</p>
          </div>

          <Link to="/menu" className="text-link">
            View full menu →
          </Link>
        </div>

        {loading && <p className="status-message">Loading delicious dishes…</p>}

        {error && (
          <p className="status-message error-text">
            {error} Please check your internet connection.
          </p>
        )}

        {!loading && !error && (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </section>

      <section className="experience-section">
        <div className="container experience-inner">
          <div>
            <span className="eyebrow">MORE THAN A MEAL</span>
            <h2>Make room for good moments.</h2>
            <p>
              From a relaxed dinner to a special celebration,
              we help make time around the table feel special.
            </p>
          </div>

          <Link to="/services/events" className="button button-primary">
            Explore Our Services →
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;