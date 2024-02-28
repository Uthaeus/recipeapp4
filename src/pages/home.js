import { useContext } from "react";

import RecipeItem from "../components/home/recipe-item";
import Sidebar from "../components/home/sidebar";

import { RecipesContext } from "../store/recipesContext";

function Home() {
    const { recipes } = useContext(RecipesContext);

    return (
        <div className="home">
            <div className="home-left">
                {recipes.map((recipe) => (
                    <RecipeItem key={recipe.id} recipe={recipe} />
                ))}
            </div>
            
            <div className="home-right">
                <Sidebar />
            </div>
        </div>
    );
}

export default Home;