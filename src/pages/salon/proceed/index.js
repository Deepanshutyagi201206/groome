import React from "react";
import { Link } from "react-router-dom";

function Proceed(props) {

  return (
    <div className="proceed-container d-flex justify-content-between align-items-center">
      <div>
        {props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems > 0 ? <p className="items">
          {props.gotCartList.data.cart.totalItems} ITEMS

        </p> : props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems > 0 ? <p className="items">
          {props.gotGenericCart.data.genericCart.totalItems} ITEMS

        </p> : ""}

        <div className="price-container d-flex align-items-center">

          {props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems > 0 ? <><p className="price mb-0">

            {props.gotCartList.data.cart.services.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.services[0].service.currencySymbol) : props.gotCartList.data.cart.products.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.products[0].product.currencySymbol) : ""}
            {Number(props.gotCartList.data.cart.grandTotal)}
          </p>
            <p className="plus-taxes mb-0">plus taxes</p></> : props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems > 0 ? <><p className="price mb-0">

              {props.gotGenericCart.data.genericCart.services.length > 0 ? String.fromCharCode(props.gotGenericCart.data.genericCart.services[0].service.currencySymbol) : props.gotGenericCart.data.genericCart.products.length > 0 ? String.fromCharCode(props.gotGenericCart.data.genericCart.products[0].product.currencySymbol) : ""}
              {Number(props.gotGenericCart.data.genericCart.grandTotal)}
            </p>
              <p className="plus-taxes mb-0">plus taxes</p></> : ""}

        </div>
      </div>
      <div className="proceed">
        <Link
          to="/cart"
          className="border-0 d-flex justify-content-center align-items-center"
        >
          <span>Proceed</span>
          <img src="/assets/common/white_right.svg" alt="Right" />
        </Link>
      </div>
    </div>
  );
}

export default Proceed;
