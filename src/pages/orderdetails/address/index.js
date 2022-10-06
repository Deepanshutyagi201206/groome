import React from "react";

function Address(props) {
  return (
    <div className="address-section">
      <div className="title-container">
        <p className="mb-0">Address</p>
      </div>
      <div className="address-container d-grid">
        <div className="home-image">
          <img src={props.gotOrderDetails &&
            props.gotOrderDetails.data.order.address &&
            props.gotOrderDetails.data.order.address.saveAddressAs == "Home" ? "/assets/common/home.svg" : props.gotOrderDetails &&
              props.gotOrderDetails.data.order.address &&
              props.gotOrderDetails.data.order.address.saveAddressAs == "Work" ? "/assets/orderdetails/briefcase.svg" : "/assets/common/home.svg"} alt="Home" />
        </div>
        <div>
          <p className="home">
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.address &&
              props.gotOrderDetails.data.order.address.saveAddressAs}
          </p>
          <p className="address mb-0">
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.address &&
              props.gotOrderDetails.data.order.address.completeAddress}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Address