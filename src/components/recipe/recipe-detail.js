import { useParams } from "react-router";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { RecipesContext } from "../../store/recipesContext";

function RecipeDetail() {
    const { id } = useParams();
    const { recipes } = useContext(RecipesContext);
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRecipe(recipes.find((recipe) => recipe.id === id));
        setIsLoading(false);
    }, [recipes, id]);

    if (isLoading) {
        return (
            <div className="recipe-detail">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="recipe-detail">
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <p>{recipe.time}</p>
            <Link to={`/recipe/${id}/edit`}>Edit</Link>
        </div>
    );
}

export default RecipeDetail;