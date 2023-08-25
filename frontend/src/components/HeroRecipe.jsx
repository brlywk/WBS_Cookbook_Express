import { Link } from "react-router-dom";
import ShareButtons from "./ShareButtons";

/* eslint-disable react/prop-types */
const HeroRecipe = ({ recipe }) => {
  const shortDescription = recipe.description.slice(0, 600);

  return (
    <>
      {recipe && (
        <div className="hero-container flex space-x-12 p-12 justify-center items-center mt-12 rounded-xl w-1/2 mx-auto border-gray-200 bg-white p-5 bg-opacity-20 backdrop-blur-sm transition delay-150 duration-300 ease-in-out hover:scale-[105%] hover:shadow-2xl">
          {/* Hero Image */}
          <Link to={`/recipe/${recipe.id}`}>
            <img 
              src={recipe.img} 
              alt={recipe.title} 
              className="w-[30vh] h-auto rounded-2xl border-double shadow-md object-cover" 
              style={{borderColor: 'rgba(240, 248, 255, 0.207)', boxShadow: '0 0 10px #ffffffb2, 0 0 15px #ffffff53, 0 0 20px #ffffff78, 0 0 25px #ffffff82, 0 0 30px #ffffff84'}} 
            />
          </Link>

          {/* Hero Content */}
          <div className="space-y-4 w-[35vh]">
            <h4 className="text-lg uppercase">Featured Dish</h4>
            <Link to={`/recipe/${recipe.id}`}>
              <h4 className="text-lg">Have you tried this recipe yet?</h4>
              <h2 className="text-2xl">{recipe.title}</h2>
            </Link>
            <div className="text-lg">
              {shortDescription}
              {recipe.description.length > 1000 && (
                <Link to={`/recipe/${recipe.id}`} className="text-white">
                  Show more
                </Link>
              )}
            </div>
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