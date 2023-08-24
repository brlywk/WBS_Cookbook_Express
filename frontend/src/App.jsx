import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import RecipeDetail from "./RecipeDetail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import useLocalhost from "./useLocalhost";
import "../src/index_tailwind.css";

function App() {
  const [foods, setFoods] = useState([]);
  const { getFoods } = useLocalhost();
  const carouselRef = useRef();
  const itemClass = "item min-h-[20rem] w-[30%] p-[90px] transition-all duration-300 ease-in-out border-none mb-[30px] mr-[4cm]"; // Adjusted dimensions and margin-right for gap
  const imgClass = "w-[35vh] h-auto rounded-2xl border-double border-opacity-20 shadow-md object-cover"; // Adjusted width and height to fill container, object-cover to control sizing
  const titleClass = "title text-xl font-bold text-white text-center absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-0 mt-[20px] transition-all duration-300 ease-in"; // Added class for title styling
  

  useEffect(() => {
    getFoods()
      .then((res) => {
        setFoods(res);
      })
      .catch((error) => console.log(error));
  }, []); // Only run once, after the initial render

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const width = entry.target.scrollWidth - entry.target.offsetWidth;
        console.log("Updated width:", width);
      }
    });

    resizeObserver.observe(carouselRef.current);

    return () => resizeObserver.disconnect();
  }, []); // Only run once, after the initial render

  return (
    <Router>
      <Link to="/" className="home-link text-xl font-bold text-blue-500">Foodie Recipes</Link>
      <h5 className="text-gray-500 text-sm">SINCE 2023</h5>
  
      <Routes>
      <Route path="/" element={
        <div className="flex flex-col items-center justify-center min-h-screen -mt-20">
          <motion.div className="carousel-container" ref={carouselRef} drag="x">
            <div className="inner-carousel flex cursor-grab">
              {foods.map(food => (
                <motion.div
                  key={food.id}
                  className={itemClass}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <Link to={`/recipe/${food.id}`}>
                    <div className="relative h-full"> {/* h-full to fill container */}
                      <h3 className="title text-xl font-bold text-white text-center absolute top-1/2 left-0 right-0 -translate-y-1/2"></h3>
                      <img className={imgClass} src={food.img} alt={food.title} />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg invisible opacity-0 transition duration-300 ease-in-out"></div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      } />
  
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
  
      <h6 className="text-xs text-gray-500">Made by Jerry & Chris</h6>
    </Router>
  );
}

export default App;