import { useParams } from "react-router";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { RecipesContext } from "../../store/recipesContext";
import { UserContext } from "../../store/userContext";

import image from '../../assets/images/49er-thumb.png';

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
            <div className="recipe-detail-header">
                <h1 className="recipe-detail-title">{recipe.title}</h1>

                <p className="recipe-detail-time">{recipe.time}</p>
            </div>

            <img src={recipe.image ? recipe.image : image} alt="recipe" width='80%' className="recipe-detail-image" />

            <p className="recipe-detail-description">{recipe.description}</p>
            
            <div className="row">
                <div className="col-md-5">
                    <div className="recipe-detail-ingredients-wrapper">
                        {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                            <div key={index} className="recipe-detail-ingredient">
                                <p>{ingredient.ingredient}</p>
                                <p>{ingredient.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-md-7">
                    <div className="recipe-detail-instructions-wrapper">
                        <p className="recipe-detail-instructions">{recipe.instructions}</p>
                    </div>
                </div>
            </div>
            
            <div className="recipe-detail-actions">
                {user && (user.id === recipe.user_id || user.role === 'admin') && (
                    <>
                        <Link to={`/recipe/${recipe.id}/edit`}><button>Edit</button></Link>
                        <button onClick={deleteRecipeHandler}>Delete</button>
                    </>
                )}
                <Link to='/'><button>Back to Home</button></Link>
            </div>
        </div>
    );
}

export default RecipeDetail;