import PropTypes from 'prop-types';

const RecipeCard = ({ recipe }) => (
    <div className="recipe-card">
        <img src={recipe.image} alt={recipe.label} />
        <h3>{recipe.label}</h3>
        <p>Calories: {Math.round(recipe.calories)}</p>
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">
            View Recipe
        </a>
    </div>
);

RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        image: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired
    }).isRequired
};

export default RecipeCard;

