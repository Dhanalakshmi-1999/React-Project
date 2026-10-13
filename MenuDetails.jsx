import { Link, useParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";

function MenuDetails() {
  const { id } = useParams();

  const { data: recipe, loading, error } = useFetchData(
    `https://dummyjson.com/recipes/${encodeURIComponent(id)}`
  );

  if (loading) {
    return <div className="container page-section">Loading dish details…</div>;
  }

  if (error || !recipe?.id) {
    return (
      <div className="container page-section empty-state">
        <h2>Dish not found</h2>
        <p>We couldn't find this menu item.</p>
        <Link to="/menu" className="button button-primary">
          Back to menu
        </Link>
      </div>
    );
  }

  return (
    <div className="container page-section">
      <Link to="/menu" className="text-link">
        ← Back to menu
      </Link>

      <div className="detail-layout">
        <img className="detail-image" src={recipe.image} alt={recipe.name} />

        <div className="detail-content">
          <span className="eyebrow">{recipe.cuisine} CUISINE</span>
          <h1>{recipe.name}</h1>

          <p className="detail-rating">
            ★ {Number(recipe.rating || 0).toFixed(1)} ·{" "}
            {recipe.reviewCount || 0} reviews
          </p>

          <p>
            A flavourful dish inspired by {recipe.cuisine || "world"} cuisine,
            prepared with carefully selected ingredients.
          </p>

          <div className="detail-stats">
            <div>
              <strong>{recipe.prepTimeMinutes} min</strong>
              <span>Prep time</span>
            </div>

            <div>
              <strong>{recipe.cookTimeMinutes} min</strong>
              <span>Cook time</span>
            </div>

            <div>
              <strong>{recipe.caloriesPerServing}</strong>
              <span>Calories / serving</span>
            </div>
          </div>

          <h3>Ingredients</h3>
          <ul className="ingredient-list">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient}</li>
            ))}
          </ul>

          <Link to="/reservations" className="button button-primary">
            Reserve a Table
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MenuDetails;