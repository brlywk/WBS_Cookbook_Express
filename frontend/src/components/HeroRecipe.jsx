import { Link } from "react-router-dom";
import ShareButtons from "./ShareButtons";

/* eslint-disable react/prop-types */
const HeroRecipe = ({ recipe }) => {
  return (
    <>
      {recipe && (
        <div className="">
          {/* Hero Image */}

          <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.img} alt={recipe.title} className="" />
          </Link>

          {/* Hero Content */}
          <div className="">
            <Link to={`/recipe/${recipe.id}`}>
              <h4 className="">Have you tried this recipe yet?</h4>
              <h2 className="">{recipe.title}</h2>
            </Link>
            <div className="">{recipe.description}</div>
            <div>
              <ShareButtons recipeName={recipe.title} recipeId={recipe.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroRecipe;
