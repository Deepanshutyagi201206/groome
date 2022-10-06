import React, { useEffect, useState } from "react";

import useGetData from "../../customhooks/getdata";
import useUpdateData from "../../customhooks/updatedata";
import useIsLoader from "../../customhooks/useisloader";
import Loader from "../../components/loader";
import Header from "./header";
import Coupon from "./coupon";
import ApplyCoupon from "./applycoupon";

import useUserId from "../../customhooks/getuserid";

import PopUp from "../../components/popup";
import useIsPopUp from "../../customhooks/ispopup";

function Coupons(props) {
  const [isLoader, setIsLoader] = useIsLoader(true);

  const [isPopUp, setIsPopUp] = useIsPopUp(false);

  const [appliedCoupon, appliedCouponError, applyCoupon] = useUpdateData();

  const [gotCoupon, couponError, getCoupon] = useGetData();

  const [userId, userError] = useUserId(false);

  const [popUpMessage, setPopUpMessage] = useState("");

  useEffect(() => {
    getCoupon({
      url: `${process.env.REACT_APP_API_URL}/app/coupon/listOfAvailableCoupons?status=1&isActive=true`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (gotCoupon != undefined && gotCoupon != "" && gotCoupon != null) {
      setIsLoader(false);
    }
  }, [gotCoupon]);

  const handleClick = (couponCode) => {
    gotCoupon.data.coupons.forEach((item) => {
      if (item.code === couponCode) {
        let couponUsedByUser = 0;
        item.usedByUsers.forEach((usedUser) => {
          if (userId.data.id == usedUser) {
            couponUsedByUser += 1;
          }
        });

        if (
          item.allowedUsage > item.usedByUsers.length &&
          item.singleUserLimit > couponUsedByUser
        ) {
          applyCoupon({
            url: `${process.env.REACT_APP_API_URL}/app/coupon/applyCoupon?code=${couponCode}`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: {},
          });
        } else {
          setPopUpMessage("Sorry! This coupon already applied.");
          setIsPopUp(true);
        }
      }
    });
  };

  useEffect(() => {
    if (
      appliedCoupon != undefined &&
      appliedCoupon != null &&
      appliedCoupon != ""
    ) {
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      document.body.style.overflow = "hidden";
      props.setIsAppliedCoupon(true);
      props.setIsOpenCoupon(false);
    }
  }, [appliedCoupon]);

  return (
    <>
      <div className="coupons-page d-grid">
        <div>
          <Header setIsOpenCoupon={props.setIsOpenCoupon} />

          <ApplyCoupon handleClick={handleClick} />
        </div>
        {isLoader ? (
          <Loader width={60} height={60} color={"#772286"} />
        ) : (
          <Coupon
            gotCoupon={gotCoupon}
            handleClick={handleClick}
            getCartList={props.getCartList}
            setIsOpenCoupon={props.setIsOpenCoupon}
          />
        )}
      </div>

      {isPopUp ? <PopUp setIsPopUp={setIsPopUp} message={popUpMessage} /> : ""}
    </>
  );
}

export default Coupons;
