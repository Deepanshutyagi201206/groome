import React, { useState } from "react";

import useUpdateData from "../../../customhooks/updatedata";

import useUserId from "../../../customhooks/getuserid";

import { useEffect } from "react";

function Coupon(props) {
  const [removedCoupon, removeError, removeCoupon] = useUpdateData();

  const [userId, userError, getUserId] = useUserId();

  let [couponUsedByUser, setCouponUsedByUser] = useState(0)

  const [coupons, setCoupons] = useState([])

  const handleClick = () => {
    removeCoupon({
      url: `${process.env.REACT_APP_API_URL}/app/coupon/removeCoupon`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {},
    });
  };

  useEffect(() => {
    if (
      removedCoupon != undefined &&
      removedCoupon != null &&
      removedCoupon != ""
    ) {
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      props.setIsOpenCoupon(false);
    }
  }, [removedCoupon]);

  useEffect(() => {

    if (props.gotCoupon && userId) {
      
      props.gotCoupon.data.coupons.forEach((coupons) => {
        setCouponUsedByUser(0);
        coupons.usedByUsers.forEach((usedUser) => {
          if (userId.data.id == usedUser) {
            setCouponUsedByUser(couponUsedByUser += 1);
          }
        });

        if (coupons.singleUserLimit <= couponUsedByUser) {
          coupons.isApplied = true;
        }
      })
      setCoupons(props.gotCoupon.data.coupons)
    }
  }, [props, userId])

  return (
    <div className="coupons-container">
      <div className="title d-flex justify-content-between align-items-center">
        <p className="mb-0">Available coupons</p>

        <button onClick={() => handleClick()} className="remove ">
          REMOVE
        </button>
      </div>

      {coupons.map((item) => {

        return (
          <div key={item._id} className="coupon-container bg-white">
            <div className="coupon d-flex justify-content-between align-items-center">
              <div className="coupon-code">
                <p className="mb-0">{item.code}</p>
              </div>
              <div>
                {item.isApplied ? (
                  <p className="applied mb-0">APPLIED</p>
                ) : (
                  <button
                    onClick={() => {
                      props.handleClick(item.code);
                    }}
                    className="border-0 bg-white"
                  >
                    APPLY
                  </button>
                )}
              </div>
            </div>
            <div className="offer-valid-container">
              {item.conditionType === "Percentage" ? (
                <p className="offer">Get {item.condition}% OFF up to ₹200</p>
              ) : (
                <p className="offer">Get {item.condition} OFF </p>
              )}
              <p className="valid mb-0">
                {/* Valid on total value of items worth ₹1499 or more */}
                {item.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Coupon;
