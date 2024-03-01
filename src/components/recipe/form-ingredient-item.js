
function FormIngredientItem({ ingredient, amount, onDelete }) {
    return (
        <div className="form-ingredient-item">
            <p>{ingredient}</p>
            <p>{amount}</p>
            <p className="ingredient-delete" onClick={onDelete}>X</p>
        </div>
    );            
}

export default FormIngredientItem;