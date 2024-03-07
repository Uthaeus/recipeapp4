import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { UserContext } from "../../store/userContext";
import { RecipesContext } from "../../store/recipesContext";

import { db, storage } from "../../firebase-config";

import FormIngredientItem from "./form-ingredient-item";

function RecipeNew() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { user } = useContext(UserContext);
    const { addRecipe } = useContext(RecipesContext);
    const navigate = useNavigate();

    const [ingredients, setIngredients] = useState([]);
    const [ingredient, setIngredient] = useState('');
    const [amount, setAmount] = useState('');
    const [imageUrl, setImageUrl] = useState('');

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

    const imageChangeHandler = (event) => {
        const file = event.target.files[0];
        const imageRef = ref(storage, `images/${file.name}`);

        uploadBytes(imageRef, file)
            .then(() => {
                return getDownloadURL(imageRef);
            })
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                console.log('upload image error', error);
            });
    };

    const submitHandler = (data) => {
        if (ingredient !== '' && amount !== '') {
            data.ingredients = [...ingredients, { ingredient, amount }];
        } else {
            data.ingredients = ingredients;
        }

        addDoc(collection(db, "recipes"), {
            ...data,
            user_id: user.id,
            created_by: user.username,
            image: imageUrl
        })
        .then((doc) => {
            let newDocId = doc.id;

            addRecipe({ id: newDocId, image: imageUrl, created_by: user.username, ...data });
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
        <div className="recipe-new-container">
            <h1 className="recipe-new-title">New Recipe</h1>

            <form onSubmit={handleSubmit(submitHandler)} className="recipe-new-form">
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group mb-3">
                            <label htmlFor="title">Title*</label>
                            <input type="text" id="title" className="form-control" {...register("title", { required: true })} />
                            {errors.title && <p className="auth-warning-text">Title is required</p>}
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="time">Time*</label>
                            <input type="text" id="time" className="form-control" placeholder="approx time in minutes" {...register("time", { required: true })} />
                            {errors.time && <p className="auth-warning-text">Time is required</p>}
                        </div>
                    </div>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Description*</label>
                    <input type="text" id="description" className="form-control" {...register("description", { required: true })} />
                    {errors.description && <p className="auth-warning-text">Description is required</p>}
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
                        <h3 className="recipe-new-subtitle">Ingredients</h3>
                        {ingredients.map((ingredient, index) => (
                            <FormIngredientItem key={index} ingredient={ingredient.ingredient} amount={ingredient.amount} onDelete={() => deleteIngredientHandler(index)} />
                        ))}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group mb-3">
                            <label htmlFor="instructions">Instructions*</label>
                            <textarea id="instructions" className="form-control" rows={8} {...register("instructions", { required: true })} />
                            {errors.instructions && <p className="auth-warning-text">Instructions are required</p>}
                        </div>
                    </div>

                    <div className="col-md-4">
                        {imageUrl === '' ? 
                            <p className="recipe-new-image-filler">No image selected</p> 
                            : 
                            <img src={imageUrl} alt="" className="recipe-new-image" width="80%" />
                        }

                        <div className="form-group mb-3">
                            <label htmlFor="image">Recipe Image</label>
                            <input type="file" id="image" className="form-control" onChange={imageChangeHandler} />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Create</button>
                
            </form>

            <Link to="/" className="auth-link">Cancel</Link>
        </div>
    );
}

export default RecipeNew;
