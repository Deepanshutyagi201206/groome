import React, { useState, useEffect } from "react";
import { useRef } from "react";

import { CgClose } from "react-icons/cg";

function Search(props) {

  const ref = useRef()

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    ref.current.focus()
  }, [])

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    props.setsearchQuery(e.target.value);
  };

  const handleOnClick = (value) => {
    setInputValue(value);
    props.setsearchQuery(value);
  };

  return (
    <div className="search-service-page-search-container pb-0">
      <div className="search-service-page-search d-flex justify-content-start align-items-center">
        <input
          ref={ref}
          className="border-0 w-100"
          placeholder="Search Salon Service"
          onChange={(e) => {
            handleOnChange(e);
          }}
          value={inputValue}
        />
        <button
          onClick={() => {
            handleOnClick("");
          }}
          className="border-0"
        >
          <CgClose />
        </button>
      </div>
    </div>
  );
}

export default Search;
