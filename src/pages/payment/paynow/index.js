import React from "react";

function PayNow(props) {
  return (
    <div className="pay-container d-flex justify-content-between align-items-center">
      <div>
        <p className="grand-total">Grand Total</p>
        <p className="price mb-0">
          {props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.services.length > 0 ? String.fromCharCode(props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.services[0].service.currencySymbol) : props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.products.length > 0 ? String.fromCharCode(props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.products[0].product.currencySymbol) : ""}{Number(props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.grandTotal)}
        </p>
      </div>
      <div className="pay">
        <button
          onClick={() => {
            props.handleClick();
          }}
          className="border-0 d-flex justify-content-center align-items-center"
        >
          <span>Pay Now</span>
          <img src="/assets/common/white_right.svg" alt="Right" />
        </button>
      </div>
    </div>
  );
}

export default PayNow