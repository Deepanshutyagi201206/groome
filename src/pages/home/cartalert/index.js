import React from "react";

import { Link } from "react-router-dom";

import { CgClose } from "react-icons/cg";

function CartAlert(props) {
  return (
    <div className="cart-alert d-flex justify-content-between align-items-center">
      <div className="salon-info d-flex justify-content-center align-items-center">
        <div className="image">
          {
            props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.salon ? <img
              src={props.gotGenericCart.data.genericCart.salon.logo ? `${process.env.REACT_APP_IMAGE_URL}${props.gotGenericCart.data.genericCart.salon.logo}` : "/assets/home/book_again_salon.png"}
              alt="Salon"
            /> : props.gotCartList &&
              props.gotCartList.data.cart && props.gotCartList.data.cart.salon ? <img
              src={props.gotCartList.data.cart.salon.logo ? `${process.env.REACT_APP_IMAGE_URL}${props.gotCartList.data.cart.salon.logo}` : "/assets/home/book_again_salon.png"}
              alt="Salon"
            /> : ""
          }
        </div>
        <div className="name-message d-flex flex-column">
          {
            props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.salon ? <p className="name mb-0">{props.gotGenericCart.data.genericCart.salon.name}</p> : props.gotCartList &&
              props.gotCartList.data.cart && props.gotCartList.data.cart.salon ? <p className="name mb-0">{props.gotCartList.data.cart.salon.name}</p> : ""
          }

          <p className="message mb-0">You have items saved in yo...</p>
        </div>
      </div>
      <div className="cart-view-close d-flex align-items-center">
        <div className="cart-view">
          <Link
            to="/cart"
            className="view d-grid justify-content-center align-items-center"
          >
            View
          </Link>
        </div>
        <div className="close d-grid justify-content-center align-items-center">
          <button
            onClick={() => {
              props.openDiscard();
            }}
          >
            <CgClose />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartAlert;
