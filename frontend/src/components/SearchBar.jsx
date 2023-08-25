import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  // REFS
  const inputRef = useRef(null);

  // HOOKS
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputRef.current) return;

    const query = inputRef.current.value;
    inputRef.current.value = "";

    navigate(`/search?query=${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center items-center">
      <input 
        type="text" 
        className="w-1/2 py-2 px-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-gray-500" 
        placeholder="Search for Recipe" 
        ref={inputRef} 
      />
      <button 
        className="ml-4 py-2 px-4 bg-white bg-opacity-20 text-white rounded-full focus:outline-none hover:bg-black bg-opacity-20" 
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;