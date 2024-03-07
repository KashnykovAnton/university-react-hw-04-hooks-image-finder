import { useState } from "react";
import { warningMessage } from "../services/toasts";

const Searchbar = ({ clearRender, onSubmit }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      clearRender();
      setValue("");
      return warningMessage("Enter something in search input!");
    }
    onSubmit(value);
  };

  const handleChange = (e) => {
    setValue(e.target.value.toLowerCase());
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          onChange={handleChange}
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
