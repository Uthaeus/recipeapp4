import { Link } from "react-router-dom";

function RecipeItem({ recipe }) {
    return (
        <Link to={`/recipe/${recipe.id}`} className="recipe-item">
            <div className="recipe-item-main">
                <h3 className="recipe-item-title">{recipe.title}</h3>
                <p className="recipe-item-description">{recipe.description}</p>
            </div>
            <p className="recipe-item-time">{recipe.time}</p>
        </Link>
    );
}

export default RecipeItem