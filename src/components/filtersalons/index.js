import React, { useState } from "react";

import { CgClose } from "react-icons/cg";

function FilterSalons(props) {

  const [isEarliestAppointment, setIsEarliestAppointment] = useState("");

  const [isMen, setIsMen] = useState("");

  const [isWomen, setIsWomen] = useState("");

  const [isRating, setIsRating] = useState("");

  return (
    <div className="filter-salons-container d-flex align-items-center">
      <div>
        {isEarliestAppointment ? (
          <div className="cancel-filter d-flex justify-content-between align-items-center">
            <p className="mb-0">Earliest Appointment</p>
            <button
              onClick={() => {
                setIsEarliestAppointment("");
                props.setEarliest("");
              }}
              className="border-0 d-grid"
            >
              <CgClose />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
                setIsEarliestAppointment(true);
                props.setEarliest(true);
            }}
            className="filter"
          >
            Earliest Appointment
          </button>
        )}
      </div>
      <div>
        {isMen ? (
          <div className="cancel-filter d-flex justify-content-between align-items-center">
            <p className="mb-0">Men</p>
            <button
              onClick={() => {
                setIsMen("");
                props.setMen(false);
              }}
              className="border-0 d-grid"
            >
              <CgClose />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
                setIsMen(true);
                props.setMen(true);
            }}
            className="filter"
          >
            Men
          </button>
        )}
      </div>
      <div>
        {isWomen ? (
          <div className="cancel-filter d-flex justify-content-between align-items-center">
            <p className="mb-0">Women</p>
            <button
              onClick={() => {
                setIsWomen("");
                props.setWomen(false);
              }}
              className="border-0 d-grid"
            >
              <CgClose />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
                setIsWomen(true);
                props.setWomen(true);
            }}
            className="filter"
          >
            Women
          </button>
        )}
      </div>
      <div>
        {isRating ? (
          <div className="cancel-filter d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating 4.0+</p>
            <button
              onClick={() => {
                setIsRating("");
                props.setRating(false);
              }}
              className="border-0 d-grid"
            >
              <CgClose />
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
                setIsRating(true);
                props.setRating(true);
            }}
            className="filter"
          >
            Rating 4.0+
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterSalons;
