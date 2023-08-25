import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import useCookbook from "./hooks/useCookbook";
import RecipeDetail from "./pages/RecipeDetail";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import Homepage from "./pages/Homepage";

function App() {
  const [foods, setFoods] = useState([]);
  const [hero, setHero] = useState(null);
  const { getFoods, randomFood } = useCookbook();

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
      <Link
        to="/"
        className="home-link"
        style={{
          fontFamily: "'Cormorant', serif",
          fontSize: "40px",
          fontWeight: "bold",
          fontStyle: "italic",
          textDecoration: "none",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          padding: "30px",
        }}
      >
        Foodie Recipes
      </Link>
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
