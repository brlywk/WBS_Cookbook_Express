/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import HeroRecipe from "../components/HeroRecipe";

const Homepage = ({ foods, hero }) => {
  const carouselRef = useRef();

  useEffect(() => {
    if (carouselRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const width = entry.targect.scrollWidth - entry.target.offsetWidth;
          console.log("Updated width:", width);
        }
      });
      resizeObserver.observe(carouselRef.current);

      return () => resizeObserver.disconnect();
    }
  }, [carouselRef.current]); // Only run once, after the initial render

  const itemClass = "item min-h-[30rem] min-w-[30rem] w-[300px] p-[90px] transition-all duration-300 ease-in-out border-none mb-[30px]"; // Adjusted width to 300px
    const imgClass = "w-full h-full rounded-2xl border-double border-opacity-20 shadow-md object-cover";  
    const titleClass = "title text-xl font-bold text-white text-center absolute top-1/2 left-0 right-0 -translate-y-1/2 opacity-0 mt-[20px] transition-all duration-300 ease-in"; // Added class for title styling

  return (
    
    <div>
{hero && <HeroRecipe recipe={hero} />}  

      {foods && foods.length > 0 && (
          <motion.div className="carousel-container" ref={carouselRef} drag="x">
            <div className="inner-carousel flex cursor-grab">
            {foods.map((food) => (
  <motion.div
    key={food.id}
    className={itemClass}
    whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
  >
    <Link to={`/recipe/${food.id}`}>
      <div className="relative h-full">
      <img 
  className={`${imgClass} shadow-lg border-double rounded-2xl`} 
  src={food.img} 
  alt={food.title} 
  style={{borderColor: 'rgba(240, 248, 255, 0.207)', boxShadow: '0 0 5px #ffffffb2, 0 0 15px #ffffff53, 0 0 20px #ffffff78, 0 0 25px #ffffff82, 0 0 30px #ffffff84'}} 
/>        <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-lg">
          <h4 className="text-white text-center">{food.title}</h4>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg invisible opacity-0 transition duration-300 ease-in-out"></div>
      </div>
    </Link>
  </motion.div>
))}
            </div>
          </motion.div>
      )}
    </div>
  );
};

export default Homepage;