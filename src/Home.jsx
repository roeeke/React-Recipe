import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Home.css'

function Home() {
    const [formData, setFormData] = useState({
        ingredients: '',
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
    });

    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiKey = import.meta.env.VITE_API_KEY
            const { ingredients, isVegetarian, isVegan, isGlutenFree } = formData;

            const response = await axios.get(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${getDietQuery(
                    isVegetarian,
                    isVegan,
                    isGlutenFree
                )}&includeIngredients=${ingredients}&number=12`
            );

            setRecipes(response.data.results);
        } catch (error) {
            setError(error);
        }
    };

    const getDietQuery = (isVegetarian, isVegan, isGlutenFree) => {
        const dietOptions = [];

        if (isVegetarian) dietOptions.push('vegetarian');
        if (isVegan) dietOptions.push('vegan');
        if (isGlutenFree) dietOptions.push('glutenFree');

        return dietOptions.join(',');
    };

    if (error) {
        return <div>Something went wrong: {error.message}</div>;
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    return (
        <div className="app-container">

            <form id='homeform' onSubmit={handleSubmit}>
                <h1 className="app-header">Search Recipe:</h1>
                <div>
                    <input
                        id="search"
                        type="text"
                        name="ingredients"
                        placeholder="Enter ingredients"
                        value={formData.ingredients}
                        onChange={handleChange}
                    />
                </div>
                <div id='checkboxes'>
                    <label>
                        <input
                            className='dietcheck'
                            type="checkbox"
                            name="isVegetarian"
                            checked={formData.isVegetarian}
                            onChange={handleChange}
                        />
                        Vegetarian
                    </label>

                    <label>
                        <input
                            className='dietcheck'
                            type="checkbox"
                            name="isVegan"
                            checked={formData.isVegan}
                            onChange={handleChange}
                        />
                        Vegan
                    </label>

                    <label>
                        <input
                            className='dietcheck'
                            type="checkbox"
                            name="isGlutenFree"
                            checked={formData.isGlutenFree}
                            onChange={handleChange}
                        />
                        Gluten-Free
                    </label>
                </div>
                <div>
                    <button id='searchbutton' type="submit">Search</button>
                </div>
            </form>

            {recipes.length > 0 && (
                <div className="recipe-results">
                    {recipes.map((recipe) => (
                         
                          <article>
                              <div class="article-wrapper">
                  
                                  <figure>
                                      <img src={recipe.image} alt={recipe.title} />
                                  </figure>
                  
                                  <div class="article-body">
                                      <h3>{recipe.title}</h3>
                  
                                      <Link
                                      class="read-more"
                                          key={recipe.id}
                                          to={`/Recipes/${recipe.id}`}
                                          
                                      >
                                          <button>see recipe!</button>
                  
                                      </Link>
                                  </div>
                              </div>
                          </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home


    