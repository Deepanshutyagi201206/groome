import React from "react";

function PaymentMethod(props) {
  return (
    <div className="payment-method-section bg-white">
      <div className="title-container">
        <p className="mb-0">Payment methods</p>
      </div>
      <div className="cod-payment-method-container d-flex justify-content-between align-items-center">
        <div className="cod-payment-method d-flex align-items-center">
          <div className="image d-grid justify-content-center align-items-center">
            <img src="/assets/payment/money.svg" alt="Method" />
          </div>
          <div>
            <p className="mb-0">COD</p>
          </div>
        </div>
        <div>
          <label className="container">
            <input value="COD"
              onChange={(e) => {
                props.setPaymentMethod(e.target.value);
              }}
              type="radio"
              name="method" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
      <div className="payu-payment-method-container d-flex justify-content-between align-items-center">
        <div className="payu-payment-method d-flex align-items-center">
          <div className="image d-grid justify-content-center align-items-center">
            <img src="/assets/payment/payu.svg" alt="Method" />
          </div>
          <div>
            <p className="mb-0">PayU</p>
          </div>
        </div>
        <div>
          <label className="container">
            <input
              value="PayU"
              onChange={(e) => {
                props.setPaymentMethod(e.target.value);
              }}
              type="radio"
              name="method"
            />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
