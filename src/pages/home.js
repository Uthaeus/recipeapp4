
import RecipeItem from "../components/home/recipe-item";
import Sidebar from "../components/home/sidebar";

function Home() {
    const tempRecipes = [
        {
            id: 1,
            title: 'Recipe 1',
            description: 'Recipe 1 description',
            ingredients: ['ingredient 1', 'ingredient 2'],
            instructions: 'instructions 1',
            time: '10 min',
        },
        {
            id: 2,
            title: 'Recipe 2',
            description: 'Recipe 2 description',
            ingredients: ['ingredient 1', 'ingredient 2'],
            instructions: 'instructions 2',
            time: '15 min',
        },
        {
            id: 3,
            title: 'Recipe 3',
            description: 'Recipe 3 description',
            ingredients: ['ingredient 1', 'ingredient 2'],
            instructions: 'instructions 3',
            time: '20 min',
        },
    ]
    return (
        <div className="home">
            <div className="home-left">
                {tempRecipes.map((recipe) => (
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