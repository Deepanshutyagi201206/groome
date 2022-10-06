import React from "react";

function Header(props) {

  return (
    <div className="header-container d-flex align-items-center">
      <div>
        <button
          className="border-0 bg-white"
          onClick={() => {
            props.setIsProceed(false)
          }}
        >
          <img src="/assets/common/back.svg" alt="Back" />
        </button>
      </div>
      <div className="w-100 text-center">
        {props.gotCartList ? <>{props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.serviceType === "At Salon"
          ? <p className="mb-0">Address & Slot</p>
          : <p className="mb-0">Select Address & Slot</p>}</> : ""}

      </div>
    </div>
  );
}

export default Header;
