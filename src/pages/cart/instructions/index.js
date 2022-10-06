import React from "react";

import useUpdateData from "../../../customhooks/updatedata";

import useUserId from "../../../customhooks/getuserid";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Instruction(props) {
  const [userId, userError] = useUserId(false);

  const navigate = useNavigate()

  const [removedInstructions, instructionsError, removeInstructions] =
    useUpdateData();

  const handleClickRemove = () => {
    removeInstructions({
      url: `${process.env.REACT_APP_API_URL}/app/cart`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        instructions: null,
      },
    });
  };

  useEffect(() => {
    if (
      removedInstructions != undefined &&
      removedInstructions != null &&
      removedInstructions != ""
    ) {
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [removedInstructions]);

  const handleClickAdd = () => {

    if (userId) {
      props.openAddInstruction();
    }
    if (userError) {
      navigate("/login")
    }
  }

  return (
    <>
      {props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.instructions ? (
        <div className="add-wipes-container d-grid align-items-center bg-white">
          <div className="notbook d-flex">
            <img src="/assets/cart/notebook.svg" alt="Notebook" />
          </div>
          <div className="instructions-add-container d-flex justify-content-between align-items-center">
            <div>
              <p className="mb-0">{props.gotCartList.data.cart.instructions}</p>
            </div>
            <div className="add">
              <button
                onClick={() => {
                  handleClickRemove();
                }}
                className="bg-white border-0"
              >
                remove
              </button>
            </div>
          </div>
        </div>
      ) : <div className="add-wipes-container d-grid align-items-center bg-white">
        <div className="notbook d-flex">
          <img src="/assets/cart/notebook.svg" alt="Notebook" />
        </div>
        <div className="instructions-add-container d-flex justify-content-between align-items-center">
          <div>
            <p className="mb-0">Do you want to add any instructions?</p>
          </div>
          <div className="add">
            <button
              onClick={() => {
                handleClickAdd()

              }}
              className="bg-white border-0"
            >
              ADD
            </button>
          </div>
        </div>
      </div>}
    </>
  );
}

export default Instruction;
