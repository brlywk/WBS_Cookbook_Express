import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useCookbook from "../hooks/useCookbook";
import ShareButtons from "../components/ShareButtons";

const RecipeDetail = () => {
  let { id } = useParams();
  const { getFoodById } = useCookbook();
  const [food, setFood] = useState(null);

  useEffect(() => {
    getFoodById(id)
      .then((res) => {
        setFood(res);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!food) {
    return <p>Loading...</p>;
  }

  return (
    <div className="recipe-detail leading-normal text-base max-w-full mx-auto">
      <div className="text-white font-bold text-lg uppercase text-center mt-8">FEATURED DISH</div>
      <h2 className="text-5xl font-bold text-center mb-4">{food.title}</h2>
      <div className="container flex space-x-12 p-12 justify-center items-center mt-12">
        <div className="imageside w-2/3">
          <img
            src={food.img}
            alt={food.title}
            className="w-full h-auto border-double object-cover"
            style={{ borderColor: "rgba(240, 248, 255, 0.207)" }}
          />
        </div>
        <div className="n-format space-y-4 w-2/3">
          <p className="text-2xl text-center">{food.description}</p>
          <div className="text-center">
            <ShareButtons recipeName={food.title} recipeId={food.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
