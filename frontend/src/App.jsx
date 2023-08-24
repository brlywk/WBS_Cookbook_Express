import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import useLocalhost from "./useLocalhost";
import RecipeDetail from "./pages/RecipeDetail";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Homepage from "./pages/Homepage";

function App() {
  const [foods, setFoods] = useState([]);
  const [hero, setHero] = useState(null);
  const { getFoods, randomFood } = useLocalhost();

  useEffect(() => {
    getFoods()
      .then((res) => {
        setFoods(res);
      })
      .catch((error) => console.log(error));

    randomFood()
      .then((result) => {
        setHero(result);
      })
      .catch((error) => console.log(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once, after the initial render

  return (
    <Router>
      <Link to="/" className="home-link text-xl font-bold text-blue-500">
        Foodie Recipes
      </Link>
      <h5 className="text-gray-500 text-sm">SINCE 2023</h5>
      <SearchBar />

      <Routes>
        <Route path="/" element={<Homepage foods={foods} hero={hero} />} />

        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      <h6 className="bottom-text">Made by Jerry & Chris</h6>
    </Router>
  );
}

export default App;
