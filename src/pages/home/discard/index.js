import React from "react";
import { useEffect, useCallback } from "react";

import useUpdateData from "../../../customhooks/updatedata";
import useUserId from "../../../customhooks/getuserid";

function Discard(props) {
  const [empited, emptyError, emptyCart] = useUpdateData();

  const [empitedGenericCart, emptyGenericCartError, emptyGenericCart] = useUpdateData();

  const [userId, userError] = useUserId([]);

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";
  })

  const handleClickOnDiscard = () => {
    if (userId) {
      emptyCart({
        url: `${process.env.REACT_APP_API_URL}/app/cart/empty`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }

    if (userError) {
      emptyGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/empty`,
        headers: {},
        body: {},
      });
    }
  };

  useEffect(() => {
    if (empited != undefined && empited != "" && empited != "") {
      props.closeDiscard();
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId && userId.data.id
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

    return callback
  }, [empited]);

  useEffect(() => {
    if (empitedGenericCart != undefined && empitedGenericCart != "" && empitedGenericCart != "") {
      props.closeDiscard();
      props.getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });
    }

    return callback
  }, [empitedGenericCart]);

  return (
    <div className="discard-section-container d-flex justify-content-center align-items-center">
      <div className="discard-section d-flex flex-column justify-content-center align-items-center">
        <p className="mb-0 message">Discard all the items in your cart?</p>
        <div className="d-flex justify-content-between align-items-center w-100">
          <button
            onClick={() => {
              props.closeDiscard();
            }}
            className="cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleClickOnDiscard();
            }}
            className="discard"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}

export default Discard;
