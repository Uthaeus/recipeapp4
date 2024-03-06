import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";

import { UserContext } from "../../store/userContext";
import { RecipesContext } from "../../store/recipesContext";

import { db } from "../../firebase-config";

import FormIngredientItem from "./form-ingredient-item";

function RecipeNew() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { user } = useContext(UserContext);
    const { addRecipe } = useContext(RecipesContext);
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');

    const addIngredientHandler = () => {
        setIngredients([...ingredients, { ingredient, amount }]);
        setIngredient('');
        setAmount('');
    }

    const deleteIngredientHandler = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    }

    const submitHandler = (data) => {
        if (ingredient !== '' && amount !== '') {
            data.ingredients = [...ingredients, { ingredient, amount }];
        } else {
            data.ingredients = ingredients;
        }
        
        let newDocId;

        addDoc(collection(db, "recipes"), {
            ...data,
            user_id: user.id,
            created_by: user.username
        })
        .then((doc) => {
            newDocId = doc.id;

            addRecipe({ id: newDocId, ...data });
            navigate(`/`);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('error', errorCode, errorMessage);
            // ..
        });
    }

    return (
        <div className="recipe-new">
            <h1>New Recipe</h1>

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
                        {ingredients.map((ingredient, index) => (
                            <FormIngredientItem key={index} ingredient={ingredient.ingredient} amount={ingredient.amount} onDelete={() => deleteIngredientHandler(index)} />
                        ))}
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="instructions">Instructions*</label>
                    <textarea id="instructions" className="form-control" {...register("instructions", { required: true })} />
                    {errors.instructions && <p className="auth-warning-text">Instructions are required</p>}
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
                
            </form>

            <Link to="/" className="auth-link">Cancel</Link>
        </div>
    );
}

export default RecipeNew;
