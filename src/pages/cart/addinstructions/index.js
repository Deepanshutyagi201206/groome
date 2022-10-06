import React from "react";

import { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";

import useUpdateData from "../../../customhooks/updatedata"

import useUserId from "../../../customhooks/getuserid";

function AddInstructions(props) {
  const [animateInstruction, setAnimateInstruction] = useState({});

  const [addedInstructions, instructionsError, addInstructions] =
    useUpdateData();

  const [instructions, setInstructions] = useState("");
  const [message, setMessage] = useState("");

  const [userId, userError] = useUserId(false);

  useEffect(() => {
    setAnimateInstruction({
      transform: "translateY(0%)",
    });
  }, []);

  const cancel = () => {
    setAnimateInstruction({
      transform: "translateY(100%)",
    });

    setTimeout(() => {
      props.closeAddInstruction();
    }, 1000);
  };

  const handleClick = () => {
    addInstructions({
      url: `${process.env.REACT_APP_API_URL}/app/cart`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        instructions: instructions,
      },
    });
  };

  useEffect(() => {
    if (
      addedInstructions != undefined &&
      addedInstructions != null &&
      addedInstructions != ""
    ) {
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      cancel();
    }
  }, [addedInstructions]);

  const handleOnChange = (e) => {

    if (e.target.value.length <= 100) {
      setMessage("")
      setInstructions(e.target.value);
    }
    else {
      setMessage("You can not enter greater than 100 characters.")
    }

  }

  return (
    <div style={animateInstruction} className="add-intstructions-page d-grid">
      <div
        onClick={() => {
          cancel();
        }}
        className="cancel-page"
      ></div>
      <div className="instructions-section">
        <div className="title-textarea-container">
          <div className="title d-flex justify-content-between align-items-center">
            <p className="mb-0">Add instruction</p>
            <button
              onClick={() => {
                cancel();
              }}
              className="border-0 bg-white"
            >
              <CgClose />
            </button>
          </div>
          <div className="text-area-container">
            <div className="d-flex justify-content-between align-items-center">
              <p className="start-typing">Start typing...</p>
              <p className="message">{message}</p>
            </div>
            <textarea
              onChange={(e) => {
                handleOnChange(e);
              }}
              placeholder="Please bring extra facial wipes"
              value={instructions}
            ></textarea>
            <p className="number-of-character mb-0 text-end">{instructions.length}/100</p>
            <p className="statement mb-0">
              The Salon will try its best to follow your instructions. However,
              no cancellation or refund will be possible if your request is not
              met.
            </p>
          </div>
        </div>

        <div className="add-container">
          <button
            onClick={() => {
              handleClick();
            }}
            className="border-0 d-grid justify-content-center align-items-center"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddInstructions;
