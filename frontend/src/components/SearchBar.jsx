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
    <form onSubmit={handleSubmit} className="">
      <input type="text" className="" placeholder="Search for Recipe" ref={inputRef} />
      <button className="" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
