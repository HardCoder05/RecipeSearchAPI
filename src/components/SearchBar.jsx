import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    inputRef.current.focus(); // Focus the input field on mount
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    hasInteracted.current = true; // Mark that the user has interacted with the input
    onSearch(query);
  };

  // Update `onSearch` only if the input has been interacted with
  useEffect(() => {
    if (!query && hasInteracted.current) {
      onSearch(query);
    }
  }, [query, onSearch]);

  const buttonOver = (e) => {
    e.target.innerHTML = "Go!";
  };
  const buttonOut = (e) => {
    e.target.innerHTML = "Search";
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for recipes..."
        className="search-bar"
      />
      <button type="submit" className="search-button" onMouseOver={buttonOver} onMouseOut={buttonOut}>
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default SearchBar;


