import React from "react";

function Salon(props) {
  return (
    <div className="salon-container bg-white d-flex justify-content-between align-items-center">
      <div className="d-flex">
        <div className="salon-image">
          <img
            src={props.gotOrderDetails &&
              props.gotOrderDetails.data.order.salon.logo ? `${process.env.REACT_APP_IMAGE_URL}${props.gotOrderDetails &&
            props.gotOrderDetails.data.order.salon.logo}` : "/assets/home/book_again_salon.png"}
            alt="Salon"
          />
        </div>
        <div className="salon-info d-flex  flex-column justify-content-center">
          <p className="name mb-0">
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.salon.name}
          </p>
          <p className="address mb-0">
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.salon.address.city}
          </p>
        </div>
      </div>
      <div className="call-image d-grid flex-column justify-content-center align-items-center">
        <img src="/assets/orderdetails/phone_call.svg" alt="" />
      </div>
    </div>
  );
}

export default Salon;
