import { Link } from "react-router-dom";
import ShareButtons from "./ShareButtons";

/* eslint-disable react/prop-types */
const HeroRecipe = ({ recipe }) => {
  return (
    <>
      {recipe && (
        <div className="grid grid-cols-2 place-items-center items-start gap-x-12">
          {/* Hero Image */}

          <Link to={`/recipe/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.name} className="h-[42vh] rounded-2xl" />
          </Link>

          {/* Hero Content */}
          <div className="grid justify-end gap-y-4">
            <Link to={`/recipe/${recipe.id}`}>
              <h4 className="font-bold uppercase text-orange-500">Have you tried this recipe yet?</h4>
              <h2 className="text-6xl font-light hover:text-orange-400">{recipe.name}</h2>
            </Link>
            <div className="my-5">{recipe.description}</div>
            <div>
              <ShareButtons recipeName={recipe.name} recipeId={recipe.id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroRecipe;
