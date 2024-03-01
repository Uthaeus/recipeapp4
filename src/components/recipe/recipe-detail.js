import { useParams } from "react-router";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


import { RecipesContext } from "../../store/recipesContext";
import { UserContext } from "../../store/userContext";

function RecipeDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipes, deleteRecipe } = useContext(RecipesContext);
    const { user } = useContext(UserContext);
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setRecipe(recipes.find((recipe) => recipe.id === id));
        setIsLoading(false);
    }, [recipes, id]);

    const deleteRecipeHandler = () => {
        deleteRecipe(id);
        navigate('/');
    }

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
            
            {user && (user.id === recipe.user_id || user.role === 'admin') && (
                <div className="recipe-detail-actions">
                    <Link to={`/recipe/${recipe.id}/edit`}><button>Edit</button></Link>
                    <button onClick={deleteRecipeHandler}>Delete</button>
                </div>
            )}
        </div>
    );
}

export default RecipeDetail;