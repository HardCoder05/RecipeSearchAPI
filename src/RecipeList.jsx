
import RecipeCard from './RecipeCard';
import PropTypes from 'prop-types';

const RecipeList = ({ recipes }) => (
    <div className="recipe-list">
        {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe.recipe} />
        ))}
    </div>
);

RecipeList.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            recipe: PropTypes.object.isRequired
        })
    ).isRequired
};

export default RecipeList;

