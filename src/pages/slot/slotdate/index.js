import React from "react";

import { useState, useEffect } from "react";

import moment from "moment";

function SlotDate(props) {
  const [weekDays, setWeekDays] = useState([]);
  const [weekDates, setWeekDates] = useState([]);

  const [dateActive, setDateActive] = useState("");

  useEffect(() => {
    setWeekDays(
      Array.apply(null, Array(7)).map(function (_, i) {
        return moment().add(i, "days").format("ddd");
      })
    );

    setWeekDates(
      Array.apply(null, Array(7)).map(function (_, i) {
        return moment().add(i, "days").format("MMM DD");
      })
    );
  }, []);

  const handleDateChange = (value) => {
    setDateActive(value);
    const formatedDate = moment().format(
      `YYYY-${moment().month(value.split(" ")[0]).format("MM")}-${value.split(" ")[1]
      }`
    );
    props.setDate(formatedDate);
  };

  useEffect(() => {
    const todayDate = String(new Date());
    handleDateChange(todayDate.split(" ")[1] + " " + todayDate.split(" ")[2]);
  }, []);

  return (
    <div className="dates-container d-flex ">
      {[...Array(7)].map((_, i) => {
        return (
          <div key={i}>
            <button
              onClick={() => {
                handleDateChange(weekDates[i]);
              }}
              className={
                weekDates[i] === dateActive
                  ? "date-active date-container d-flex flex-column justify-content-center align-items-center"
                  : "date-container d-flex flex-column justify-content-center align-items-center"
              }
            >
              <p className="day mb-0">{weekDays[i]}</p>
              <p className="date mb-0">{weekDates[i]}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SlotDate;
