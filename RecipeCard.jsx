import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <Link
        to={`/menu/${recipe.id}`}
        className="recipe-image-link"
        aria-label={`View ${recipe.name}`}
      >
        <img
          src={recipe.image}
          alt={recipe.name}
          className="recipe-image"
          loading="lazy"
        />

        <span className="recipe-cuisine">
          {recipe.cuisine || "Chef's choice"}
        </span>
      </Link>

      <div className="recipe-content">
        <div className="recipe-title-row">
          <h3>{recipe.name}</h3>
          <span className="recipe-rating">
            ★ {Number(recipe.rating || 0).toFixed(1)}
          </span>
        </div>

        <p className="recipe-description">
          {recipe.mealType?.join(" · ") || "Made fresh to order"}
        </p>

        <div className="recipe-card-bottom">
          <span>◷ {recipe.prepTimeMinutes || 15} min prep</span>

          <Link to={`/menu/${recipe.id}`} className="text-link">
            View dish →
          </Link>
        </div>
      </div>
    </article>
  );
}

export default RecipeCard;