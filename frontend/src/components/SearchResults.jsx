import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import Error from "../components/Error";
import useCookbook from "../hooks/useCookbook";
import { Link } from "react-router-dom";

const SearchResults = () => {
  // STATE
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // HOOKS
  const [searchParams] = useSearchParams();
  const { searchFood } = useCookbook();

  useEffect(() => {
    let query = searchParams.get("query").toLowerCase();

    searchFood(query)
      .then((result) => {
        setResults(result);
        setIsLoading(false);
        setHasError(false);
        setErrorMessage("");
      })
      .catch((err) => {
        setIsLoading(false);
        setHasError(true);
        setErrorMessage(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div>
      {/* Loading */}
      {isLoading && <Loading />}

      {/* Error occured */}
      {!isLoading && hasError && <Error errorMessage={errorMessage} />}

      {/* Display Components */}
      {!isLoading && !hasError && results && (
        <>
          <h1 className="text-xl py-4">
            {results.length > 0
              ? `We found ${results.length} recipe${results.length === 1 ? "" : "s"} you might be interested in:`
              : "Sorry, none of our recipes match your search."}
          </h1>
          <div className="mt-8"></div>
          {/* Just copied from app.js, should maybe be its own component... */}
          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {results.map((food) => (
                <div className="item min-h-[20rem] w-full transition-all duration-300 ease-in-out" key={food.id}>
                  <Link to={`/recipe/${food.id}`} className="item-wrap block relative">
                    <h3 className="title">{food.title}</h3>
                    <img src={food.img} alt={food.title} className="custom-shadow w-full h-auto" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;