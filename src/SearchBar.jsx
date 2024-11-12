import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    //changing search button on mouse over and out
    const buttonOver = (e) => {
        e.target.innerHTML = "Go!";
    }
    const buttonOut = (e) => {
        e.target.innerHTML = "Search";
    }

    if (!onSearch) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for recipes..."
                className="search-bar"
            />
            <button type="submit" className="search-button" onMouseOver={buttonOver} onMouseOut={buttonOut}>
                Search</button>
        </form>
    );
};

SearchBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default SearchBar;

