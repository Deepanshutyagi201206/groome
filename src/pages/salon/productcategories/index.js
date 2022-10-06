import React, { useEffect, useState } from "react";

function ProductCategories(props) {
  const [activeCategory, setActiveCategory] = useState();

  const filterCategory = (value) => {
    setActiveCategory(value);
    props.setProductCategoryName(value);
  };

  useEffect(() => {
    filterCategory("Recommended");
  }, []);

  return (
    <div className="product-categories-container d-flex align-items-center">
      <button
        onClick={() => {
          filterCategory("Recommended");
        }}
        className={activeCategory == "Recommended" ? "active h-100" : "h-100"}
      >
        Recommended
      </button>
      {props.productsCategories.map((item) => {
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

export default ProductCategories;
