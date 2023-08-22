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
    <form onSubmit={handleSubmit} className="w-full flex justify-end">
      <input
        type="text"
        className="w-2/3 px-3 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search for Recipe"
        ref={inputRef}
      />
      <button className="bg-orange-500 text-white px-4 py-2 rounded-md ml-2" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
