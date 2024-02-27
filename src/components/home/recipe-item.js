
function RecipeItem({ recipe }) {
    return (
        <div className="recipe-item">
            <div className="recipe-item-main">
                <h3 className="recipe-item-title">{recipe.title}</h3>
                <p className="recipe-item-description">{recipe.description}</p>
            </div>
            <p className="recipe-item-time">{recipe.time}</p>
        </div>
    );
}

export default RecipeItem