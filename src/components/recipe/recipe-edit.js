import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";

import { RecipesContext } from "../../store/recipesContext";

function RecipeEdit() {
    const { id } = useParams();
    const { recipes } = useContext(RecipesContext);
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    useEffect(() => {
        setRecipe(recipes.find((recipe) => recipe.id === id));
        setIsLoading(false);
    }, [recipes, id]);

    useEffect(() => {
        reset(recipe);
        setIngredients(recipe.ingredients);
    }, [recipe, reset]);

    const addIngredientHandler = () => {
        setIngredients([...ingredients, { ingredient, amount }]);
        setIngredient('');
        setAmount('');
    }

    const submitHandler = (data) => {
        console.log(data);
    }

    if (isLoading) {
        return (
            <div className="recipe-edit">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <div className="recipe-edit">
            <h1>Edit {recipe.title}</h1>

            <form onSubmit={handleSubmit(submitHandler)} className="recipe-new-form">
                <div className="form-group mb-3">
                    <label htmlFor="title">Title*</label>
                    <input type="text" id="title" className="form-control" {...register("title", { required: true })} />
                    {errors.title && <p className="auth-warning-text">Title is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Description*</label>
                    <input type="text" id="description" className="form-control" {...register("description", { required: true })} />
                    {errors.description && <p className="auth-warning-text">Description is required</p>}
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="time">Time*</label>
                    <input type="text" id="time" className="form-control" {...register("time", { required: true })} />
                    {errors.time && <p className="auth-warning-text">Time is required</p>}
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-3">
                            <label htmlFor="ingredient">Ingredient</label>
                            <input type="text" id="ingredient" className="form-control" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="amount">Amount</label>
                            <input type="text" id="amount" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <p className="btn btn-primary" onClick={addIngredientHandler}>Add Ingredient</p>
                    </div>

                    <div className="col-md-6">
                        <h3>Ingredients</h3>
                        <ul>
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {ingredient.ingredient} - {ingredient.amount}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="instructions">Instructions*</label>
                    <textarea id="instructions" className="form-control" {...register("instructions", { required: true })} />
                    {errors.instructions && <p className="auth-warning-text">Instructions are required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
                
            </form>

            <Link to={`/recipe/${id}`} className="btn btn-secondary">Back to Detail</Link>
            <Link to="/" className="auth-link">Home</Link>
        </div>
    );
}

export default RecipeEdit;