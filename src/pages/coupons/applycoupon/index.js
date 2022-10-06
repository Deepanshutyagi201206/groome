import React from "react";

import { useState } from "react";

function ApplyCoupon(props) {
  const [couponCodeByInput, setCouponCodeByInput] = useState();

  return (
    <div className="apply-coupon-container">
      <div className="apply-coupon d-flex justify-content-between align-items-center bg-white">
        <input
          onChange={(e) => {
            setCouponCodeByInput(e.target.value);
          }}
          className="border-0 w-100"
          placeholder="Enter Coupon Code"
        />
        <button
          onClick={() => {
            props.handleClick(couponCodeByInput);
          }}
          className="border-0 bg-white"
        >
          APPLY
        </button>
      </div>
    </div>
  );
}

export default ApplyCoupon;
