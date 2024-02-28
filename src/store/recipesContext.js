import { useState, useEffect, createContext } from "react";
import { collection, getDocs } from "firebase/firestore";

import { db } from "../firebase-config";

export const RecipesContext = createContext({
    recipes: [],
    setRecipes: () => {},
    addRecipe: () => {},
    deleteRecipe: () => {},
});


export default function RecipesContextProvider({ children }) {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const recipesCollectionRef = collection(db, "recipes");

    useEffect(() => {
        const getRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            setRecipes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
            setIsLoading(false);
        };
        getRecipes();
    }, []);

    const addRecipe = (recipe) => {
        setRecipes([...recipes, recipe]);
    };

    const deleteRecipe = (id) => {
        setRecipes(recipes.filter((recipe) => recipe.id !== id));
    };

    const value = {
        recipes,
        setRecipes,
        addRecipe,
        deleteRecipe,
    };

    return (
        <RecipesContext.Provider value={value}>
            {!isLoading && children}
        </RecipesContext.Provider>
    );
}