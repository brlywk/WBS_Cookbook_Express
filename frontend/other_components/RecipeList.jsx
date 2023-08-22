/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import RecipeCard from "./RecipeCard";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const RecipeList = ({ title, recipes }) => {
  // state
  const [isLeft, setIsLeft] = useState(true);
  const [isRight, setIsRight] = useState(false);

  // refs
  const scrollContainerRef = useRef(null);

  // check scroll position to determine if we have hit the left / right edges
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

      setIsLeft(scrollLeft === 0);
      setIsRight(Math.ceil(scrollLeft) === scrollWidth - clientWidth);
    }
  };

  // scroll by amount of pixel (-direction -> left, +direction -> right)
  const scrollTo = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: direction,
        behavior: "smooth",
      });
    }
  };

  // check scroll position
  useEffect(() => {
    checkScrollPosition();

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", checkScrollPosition);
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <>
      {/* Title */}
      <h2 className="font-bold uppercase text-orange-500 mb-4">{title}</h2>

      {/* Content */}
      <div className="grid gap-y-4 relative min-h-[10vh]">
        {/* Scroll Left Area */}
        <div
          className={
            "absolute flex left-0 top-0 bg-gradient-to-r from-white w-20 h-full justify-start items-center transition-all duration-300 ease-in-out" +
            (isLeft ? " opacity-0 -z-50" : " opacity-100")
          }
        >
          <button
            className="w-12 h-12 p-2 flex border rounded-full items-center justify-center bg-white hover:bg-gray-200 z-50 shadow-md"
            onClick={() => scrollTo(-150)}
          >
            <ArrowLeftIcon className="w-10 h-10" />
          </button>
        </div>

        {/* Recipe Card List */}
        <div className="flex flex-nowrap overflow-x-scroll gap-4 pb-4" ref={scrollContainerRef}>
          {recipes && recipes.map((recipe, i) => <RecipeCard key={i} recipe={recipe} />)}
        </div>

        {/* Right Scroll Area */}
        <div
          className={
            "absolute flex right-0 top-0 bg-gradient-to-l from-white w-20 h-full justify-end items-center transition-all duration-300 ease-in-out" +
            (isRight ? " opacity-0 -z-50" : " opacity-100")
          }
        >
          <button
            className="w-12 h-12 p-2 flex border rounded-full items-center justify-center bg-white hover:bg-gray-200 z-50 shadow-md"
            onClick={() => scrollTo(150)}
          >
            <ArrowRightIcon className="w-10 h-10" />
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeList;
