import React from "react";

import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

function Search(props) {

  const navigate = useNavigate()

  const handleOnFocus = () => {
    document.body.style.overflow = "hidden";
    props.setIsSearchSalons(true)
  }

  return (
    <div className="search-salons-container ">
      <div className="search-salons d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button onClick={()=>{navigate(-1)}} className="left-container">
            <img src="/assets/common/left.svg" alt="Left" />
          </button>
          <input
            className="border-0 w-100"
            placeholder="Salon name, Category or Service"
            onFocus={() => { handleOnFocus() }}
          />
        </div>
        <button onClick={() => { }} className="border-0">
          <CgClose />
        </button>
      </div>
    </div>
  );
}

export default Search;
