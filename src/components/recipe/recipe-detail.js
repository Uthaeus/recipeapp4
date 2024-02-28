import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     fetch(`http://localhost:3000/recipes/${id}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setRecipe(data);
    //             setIsLoading(false);
    //         }).catch((error) => {
    //             console.log(error);
    //         });
    // }, [ id ]);

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