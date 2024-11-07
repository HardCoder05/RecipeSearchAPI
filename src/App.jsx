import { useState } from 'react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async (query) => {
    const appId = '3c6f5ac1';
    const appKey = 'bc02bbb1f54e74f101b4ad8908460620';

    const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  return (
    <div className="App">
      <h1>Recipe Search</h1>
      <SearchBar onSearch={fetchRecipes} />
      <RecipeList recipes={recipes} />
    </div>
  );
};

export default App;

