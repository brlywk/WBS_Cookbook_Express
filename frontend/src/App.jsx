import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import RecipeDetail from "./RecipeDetail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import useLocalhost from "./useLocalhost";

function App() {
  const [foods, setFoods] = useState([]);
  const { getFoods } = useLocalhost();
  const [width, setWidth] = useState(0);
  const carousel = useRef();
  const constraintsRef = useRef(null);

  useEffect(() => {
    getFoods()
      .then((res) => {
        console.log(res);
        setFoods(res);
      })
      .catch((error) => console.log(error));
  }, []); // Only run once, after the initial render

  useEffect(() => {
    if (carousel.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setWidth(entry.target.scrollWidth - entry.target.offsetWidth);
        }
      });

      resizeObserver.observe(carousel.current);

      // Clean up function
      return () => resizeObserver.disconnect();
    }
  }, []); // Only run once, after the initial render

  useEffect(() => {
    console.log("Updated width:", width);
  }, [width]); // Re-run whenever width changes

  return (
    <Router>
      <Link to="/" className="home-link">
        Foodie Recipes
      </Link>
      <h5 className="top-text">SINCE 2023</h5>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <motion.div className="carousel-container">
                <motion.div className="inner-carousel flex cursor-grab" drag="x" dragConstraints={{ right: -width }}>
                  {foods &&
                    foods.length > 0 &&
                    foods.map((food) => (
                      <motion.div
                        className="item min-h-[20rem] w-[30%] p-24 transition-all duration-300 ease-in-out"
                        key={food.id}
                      >
                        <Link to={`/recipe/${food.id}`} className="item-wrap block relative">
                          <h3 className="title">{food.title}</h3>
                          <img src={food.img} alt={food.title} className="custom-shadow" />
                        </Link>
                      </motion.div>
                    ))}
                </motion.div>
              </motion.div>
            </div>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
      <h6 className="bottom-text">Made by Jerry & Vijaya</h6>
    </Router>
  );
}

export default App;
