
function FormIngredientItem({ ingredient, amount, onDelete }) {
    return (
        <div className="form-ingredient-item">
            <p>{ingredient}</p>

            <div className="form-ingredient-item-right">
                <p>{amount}</p>
                <p className="ingredient-delete" onClick={onDelete}>X</p>
            </div>
        </div>
    );            
}

export default FormIngredientItem;