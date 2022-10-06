import React, { useEffect, useState } from "react";

import { CgClose } from "react-icons/cg";

import Loader from "../../loader";

import { useRef } from "react";

function Search(props) {

  const ref = useRef()

  const [inputValue, setInputValue] = useState("")

  useEffect(()=>{
    ref.current.focus()
  }, [])

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value != "") {
      props.handleOnchange(e.target.value)
      props.setSearchQuery(e.target.value)
    }
    else {
      props.setSalons([])
      props.setSearchQuery("")
    }
  }

  const handleOnClick = (value) => {
    setInputValue(value);
    props.setSalons([])
    props.setSearchQuery(value)
  };


  return (
    <div className="search-salons-container ">
      <div className="search-salons d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <button onClick={() => { props.cancel() }} className="left-container">
            <img src="/assets/common/left.svg" alt="Left" />
          </button>
          <input
            ref={ref}
            className="border-0 w-100"
            placeholder="Salon name, Category or Service"
            onChange={(e) => {
              handleOnChange(e);
            }}
            value={inputValue}
          />
        </div>

        {props.isLoader ? <Loader width={16} height={16} color={"#772286"} /> :
          <button onClick={() => { handleOnClick(""); }} className="border-0">
            <CgClose />
          </button>
        }
      </div>
    </div>
  );
}

export default Search;
