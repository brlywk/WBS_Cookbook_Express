/* eslint-disable react/prop-types */
import { ClockIcon, FireIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  // get a nicer hours / minutes display
  const getNicerPrepTime = (prepTime) => {
    const hours = Math.floor(prepTime / 60);
    const min = prepTime % 60;

    const hoursText = `${hours} hour${hours > 1 ? "s" : ""}`;
    const minText = `${min} minute${min > 1 ? "s" : ""}`;

    return `${hours > 0 ? hoursText + " " : ""}${min > 0 ? minText : ""}`;
  };

  return (
    <Link
      to={`/recipe/${recipe.id}`}
      className="min-w-[13vw] min-h-[15vh] border border-gray-300 rounded-xl hover:shadow-md overflow-hidden flex-grow-0 basis-full"
    >
      {/* Cover Image */}
      <img src={recipe.image} alt={recipe.name} className="w-full h-1/2 object-cover" />

      {/* Content */}
      <div className="h-1/2 grid flex-col">
        <h3 className="p-2 font-bold text-lg h-16">{recipe.name}</h3>
        {recipe.servings && (
          <div className="flex items-start">
            <div className="flex gap-2 px-2 py-3 items-center">
              <FireIcon className="w-4 h-4" />
              {recipe.servings} servings
            </div>
          </div>
        )}
        {recipe.preparationTimeMin && (
          <div className="flex gap-2 items-center p-2 justify-self-end text-sm text-gray-600">
            <ClockIcon className="w-4 h-4" />
            {getNicerPrepTime(recipe.preparationTimeMin)}
          </div>
        )}
      </div>
    </Link>
  );
};

export default RecipeCard;
