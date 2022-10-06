import React from "react";

import { useNavigate } from "react-router-dom";

function Header(props) {

  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="header d-flex align-items-center">
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-0 bg-white"
          >
            <img src="/assets/common/back.svg" alt="Back" />
          </button>
        </div>
        <div className="w-100 text-center">
          <p className="mb-0">Your Cart</p>
        </div>
      </div>
      {props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems>0 || props.gotGenericCart && props.gotGenericCart.data && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems>0 ?
        <div className="grand-total-container d-flex justify-content-between align-items-center">
          <p className="mb-0">Grand Total:</p>
          <p className="mb-0">
          {
            props.gotCartList ? <>{props.gotCartList.data.cart.services.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.services[0].service.currencySymbol) : props.gotCartList.data.cart.products.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.products[0].product.currencySymbol) : ""}{Number(props.gotCartList.data.cart.grandTotal)}</> : props.gotGenericCart ? <>{props.gotGenericCart.data.genericCart.services.length > 0 ? String.fromCharCode(props.gotGenericCart.data.genericCart.services[0].service.currencySymbol) : props.gotGenericCart.data.genericCart.products.length > 0 ? String.fromCharCode(props.gotGenericCart.data.genericCart.products[0].product.currencySymbol) : ""}{Number(props.gotGenericCart.data.genericCart.grandTotal)}</> : ""
          }
          </p>
        </div> : ""}
    </div>
  );
}

export default Header