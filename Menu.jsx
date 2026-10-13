import { useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import useFetchData from "../hooks/useFetchData";
import RecipeCard from "../components/RecipeCard";

const PAGE_SIZE = 9;

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchRef = useRef(null);

  const { data, loading, error } = useFetchData(
    "https://dummyjson.com/recipes?limit=50"
  );

  const recipes = data?.recipes || [];

  const search = searchParams.get("q") || "";
  const cuisine = searchParams.get("cuisine") || "All";
  const requestedPage = Math.max(
    1,
    Number(searchParams.get("page")) || 1
  );

  const cuisines = useMemo(
    () => [...new Set(recipes.map((recipe) => recipe.cuisine).filter(Boolean))].sort(),
    [recipes]
  );

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.name
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesCuisine =
        cuisine === "All" || recipe.cuisine === cuisine;

      return matchesSearch && matchesCuisine;
    });
  }, [recipes, search, cuisine]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecipes.length / PAGE_SIZE)
  );

  const currentPage = Math.min(requestedPage, totalPages);

  const visibleRecipes = filteredRecipes.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function updateParams(key, value) {
    const next = new URLSearchParams(searchParams);

    if (value === "" || value === "All") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== "page") {
      next.delete("page");
    }

    setSearchParams(next);
  }

  return (
    <div className="container page-section">
      <div className="page-heading">
        <span className="eyebrow">GOOD FOOD STARTS HERE</span>
        <h1>Explore our menu</h1>
        <p>
          Find your next favourite from our collection of dishes.
        </p>
      </div>

      <div className="menu-toolbar">
        <div className="search-box">
          <span>⌕</span>

          <input
            ref={searchRef}
            type="search"
            placeholder="Search dishes..."
            value={search}
            onChange={(event) => updateParams("q", event.target.value)}
            aria-label="Search dishes"
          />

          <button
            type="button"
            className="focus-search"
            onClick={() => searchRef.current?.focus()}
            aria-label="Focus search field"
            title="Focus search"
          >
            Search
          </button>
        </div>

        <select
          value={cuisine}
          onChange={(event) => updateParams("cuisine", event.target.value)}
          aria-label="Filter by cuisine"
          className="filter-select"
        >
          <option value="All">All cuisines</option>

          {cuisines.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="status-message">Loading menu…</p>}

      {error && (
        <div className="empty-state">
          <h3>Menu unavailable</h3>
          <p>{error} Please try again later.</p>
        </div>
      )}

      {!loading && !error && (
        <>
          <p className="results-count">
            Showing {visibleRecipes.length} of {filteredRecipes.length} dishes
          </p>

          {visibleRecipes.length > 0 ? (
            <div className="recipe-grid">
              {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No dishes found</h3>
              <p>Try another search term or select a different cuisine.</p>

              <button
                className="button button-primary"
                onClick={() => setSearchParams({})}
              >
                Clear filters
              </button>
            </div>
          )}

          {filteredRecipes.length > PAGE_SIZE && (
            <div className="pagination">
              <button
                className="page-button"
                disabled={currentPage === 1}
                onClick={() => updateParams("page", String(currentPage - 1))}
              >
                ← Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                className="page-button"
                disabled={currentPage === totalPages}
                onClick={() => updateParams("page", String(currentPage + 1))}
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Menu;