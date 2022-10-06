import React from "react";

function AppliedCouponFromCoupons(props) {
  const cancel = () => {
    props.setIsAppliedCoupon(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <div
      onClick={() => {
        cancel();
      }}
      className="appplied-coupon-from-coupons d-flex justify-content-center align-items-center text-center"
    >
      <div className="appplied-coupon-from-coupons-container d-flex flex-column justify-content-center align-items-center">
        <div className="check-code-container">
          <img src="/assets/cart/check.svg" alt="Plus" />
          <p className="code mb-0">
            {props.gotCartList &&
              props.gotCartList.data.cart.appliedCoupon.code}{" "}
            applied
          </p>
        </div>
        <div>
          <p className="saved">
            You saved ₹
            {props.gotCartList && props.gotCartList.data.cart.couponDiscount}
          </p>
          <p className="message mb-0">with this coupon code</p>
        </div>
        <div>
          <p className="hurray mb-0">HURRAYYY!</p>
        </div>
      </div>
    </div>
  );
}

export default AppliedCouponFromCoupons;
