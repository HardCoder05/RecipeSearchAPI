import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import './App.css';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0); // Manejo de páginas
  const recipesPerPage = 10; // Número de recetas por página

  const fetchRecipes = async (query, from = 0, to = recipesPerPage) => {
    const appId = 'd40c2f29';
    const appKey = '4330d7b01907e83778c80814e2bd894c';

    if (!query) {
      setErrorMessage('Please enter a search term.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMessage(''); // Limpiar mensajes de error

    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&from=${from}&to=${to}`
    );
    const data = await response.json();

    if (data.hits.length === 0) {
      setErrorMessage('No recipes found.');
    }

    setRecipes(data.hits);
    setLoading(false);
  };

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(0); // Reiniciar a la primera página
    fetchRecipes(searchQuery, 0, recipesPerPage);
  };

  const handleNextPage = () => {
    const from = (page + 1) * recipesPerPage;
    const to = from + recipesPerPage;
    fetchRecipes(query, from, to);
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    const from = (page - 1) * recipesPerPage;
    const to = from + recipesPerPage;
    fetchRecipes(query, from, to);
    setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    const fetchDefaultRecipes = async () => {
      setLoading(true);
      await fetchRecipes('lomo saltado', 0, recipesPerPage);
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
      <SearchBar onSearch={handleSearch} />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <RecipeList recipes={recipes} />
          {query && recipes.length > 0 && (
            <div className="pagination">
              {page > 0 && (
                <button onClick={handlePreviousPage} className="pagination-button">
                  Previous
                </button>
              )}
              {recipes.length === recipesPerPage && (
                <button onClick={handleNextPage} className="pagination-button">
                  Next
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;



