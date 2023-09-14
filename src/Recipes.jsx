import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Recipes.css';

function Recipes() {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        async function fetchRecipeDetails() {
            try {
                const apiKey = 'fcfd7a1d701342a9833bc01d538ef557';
                const response = await axios.get(
                    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
                );
                console.log(response.data);

                setRecipe(response.data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
            }
        }

        fetchRecipeDetails();
    }, [recipeId]);

    return (
        <div className="recipe-page">
            <Link to="/" className="back-button">Back to Search</Link>
            {recipe ?
                <div className="recipe-container">
                    <h2 className="recipe-title">{recipe.title}</h2>
                    <div className="recipe-image" style={{ backgroundImage: `url(${recipe.image})` }}></div>
                    <div className="recipe-details">
                        <div className="ingredients">
                            <h3>Ingredients</h3>
                            <ul>
                                {recipe.extendedIngredients.map((item, index) => (
                                    <li key={index}>
                                        <span>{item.amount} {item.unit} {item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="instructions">
                            <h3>Instructions</h3>
                            <ol>
                                {recipe.analyzedInstructions[0].steps.map((item, index) => (
                                    <li key={index}>
                                        <span>{item.step}</span>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <p className="ready-time">Ready in {recipe.readyInMinutes} minutes</p>
                </div>
                : <p>Loading...</p>}
        </div>
    );
}

export default Recipes;
