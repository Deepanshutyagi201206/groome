import React from "react";

function Search(props) {

  const handleOnFocus = () => {
    
    if (props.filterName === "PRODUCTS") {
      props.setIsSearchProducts(true)

      document.body.style.overflow="hidden"
    }
    else {
      props.setIsSearchServices(true);

      document.body.style.overflow = "hidden";
    }
  }

    return (
      <div className="salon-page-search-container pb-0">
        <div className="salon-page-search d-flex justify-content-start align-items-center">
          <input
            className="border-0 w-100"
            placeholder={`${props.placeholder}`}
            onChange={(e) => {
              props.setsearchQuery(e.target.value);
            }}
            onFocus={()=>{handleOnFocus()}}
          />
          <img src="/assets/common/search_icon.svg" alt="Search" />
        </div>
      </div>
    );
}

export default Search