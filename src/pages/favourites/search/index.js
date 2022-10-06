import React from "react";

function Search(props) {

  const handleOnFocus = () => {
    document.body.style.overflow = "hidden";
    props.setIsSearchSalons(true)
  }

  return (
    <div className="search-salons-container">
      <div className="search-salons d-flex justify-content-start align-items-center">
        <input
          className="border-0 w-100"
          placeholder="Salon name, Category or Service"
          onFocus={() => { handleOnFocus() }}
        />
        <img src="/assets/common/search_icon.svg" alt="Search" />
      </div>
    </div>
  );
}

export default Search
