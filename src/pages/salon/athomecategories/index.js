import React, { useEffect, useState } from "react";

function AtHomeCategories(props) {
  const [activeCategory, setActiveCategory] = useState();

  const filterCategory = (value) => {
    setActiveCategory(value);
    props.setCategoryName(value);
  };

  useEffect(() => {
    filterCategory("Recommended");
  }, []);

  return (
    <div className="categories-container d-flex align-items-center">
      <button
        onClick={() => {
          filterCategory("Recommended");
        }}
        className={activeCategory == "Recommended" ? "active h-100" : "h-100"}
      >
        Recommended
      </button>
      {props.categories.map((item) => {
        return (
          <button
            key={item._id}
            className={
              activeCategory == `${item.name}` ? "active h-100" : "h-100"
            }
            onClick={() => {
              filterCategory(`${item.name}`);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </div>
  );
}

export default AtHomeCategories;
