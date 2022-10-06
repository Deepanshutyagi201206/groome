import React from "react";
import { useNavigate } from "react-router-dom";

import useUserId from "../../../customhooks/getuserid";

function AppliedCoupon(props) {

  const [userId, userError] = useUserId();
  
  const navigate = useNavigate()

  const handleClickOpenCoupon = ()=>{

    if(userId){
      props.setIsOpenCoupon(true);
    }
    if(userError){
      navigate("/login")
    }
  }

  return (
    <>
      {props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.appliedCoupon ? (
        <div className="used-coupon-container bg-white">
          <div className="used-coupon d-flex justify-content-between align-items-center">
            <div className="image-text-container d-flex justify-content-start align-items-center">
              <img src="/assets/cart/coupon.svg" alt="Plus" />
              <p className="mb-0">Used Coupon</p>
            </div>
            <div className="change-offer">
              <button
                onClick={() => {
                  props.setIsOpenCoupon(true);
                }}
                className="border-0 bg-white"
              >
                Change offer
              </button>
            </div>
          </div>
          <div className="code-applied d-flex justify-content-between align-items-center">
            <div className="image-text-container d-flex justify-content-start align-items-center">
              <img src="/assets/cart/check.svg" alt="Plus" />
              <p className="mb-0">
                Code {props.gotCartList.data.cart.appliedCoupon.code} applied!
              </p>
            </div>
            <div className="price">
              <p className="mb-0">- {props.gotCartList.data.cart.services.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.services[0].service.currencySymbol) : props.gotCartList.data.cart.products.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.products[0].product.currencySymbol): ""}{props.gotCartList.data.cart.couponDiscount}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="use-coupon-container d-flex justify-content-between align-items-center bg-white">
          <div className="image-text-container d-flex justify-content-start align-items-center">
            <img src="/assets/cart/coupon.svg" alt="Plus" />
            <p className="mb-0">Use Coupon</p>
          </div>
          <div className="forward-container">
            <button
              onClick={() => {
                handleClickOpenCoupon()
                
              }}
              className="border-0 bg-white"
            >
              <img src="assets/common/purple_right.svg" alt="Right" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AppliedCoupon;
