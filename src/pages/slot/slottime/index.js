import { useState } from "react";
import React from "react";

function SlotTime(props) {
  const [timeActive, setTimeActive] = useState("");

  const handleTimeChange = (value) => {
    setTimeActive(value);
    props.setTime(value);
  };

  return (
    <div className="times-container d-grid">
      {props.gotSalonSlots && props.gotSalonSlots.data ? <> {props.gotSalonSlots.data.slotv2.slots.map((item) => {
        return (
          <button
            key={item._id}
            onClick={() => {
              handleTimeChange(item.time);
            }}
            disabled={item.status == 0}
            className={
              item.time === timeActive
                ? "time-active time-container d-grid justify-content-center align-items-center"
                : "time-container d-grid justify-content-center align-items-center"
            }
          >
            <p className="mb-0">{item.time}</p>
          </button>
        );
      })}</> : <p className="mb-0 message">No Slot for this date.</p>}

    </div>
  );
}

export default SlotTime;
