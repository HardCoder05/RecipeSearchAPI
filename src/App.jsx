import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchRecipes = async (query) => {
    const appId = 'd40c2f29';
    const appKey = '4330d7b01907e83778c80814e2bd894c';

    if (!query) {
      setErrorMessage('Please enter a search term.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage(''); // Clear any existing error message

    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    setLoading(false);
  };

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      setLoading(true);
      await fetchRecipes('chicken'); // Default search term
      setLoading(false);
    };

    fetchDefaultRecipes();
  }, []);

  return (
    <div className="App">
      <section className="header">
        <h1>Recipe Search API</h1>
        <h2>Find delicious recipes to try at home!</h2>
      </section>
      <SearchBar onSearch={fetchRecipes} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading ? <p>Loading...</p> : <RecipeList recipes={recipes} />}
    </div>
  );
};

export default App;


