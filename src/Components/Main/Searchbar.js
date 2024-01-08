import React from "react";

const Searchbar = ({ textInput, onChange, onClick }) => {
  return (
    <section className="inputs">
      <div className="serach-bar">
        <input
          type="text"
          className="searchTerm"
          value={textInput}
          placeholder="What are you looking for?"
          onChange={onChange}
        />
        <button type="submit" className="searchButton" onClick={onClick}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </section>
  );
};

export default Searchbar;
