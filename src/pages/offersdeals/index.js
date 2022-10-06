import React, { useEffect, useState } from "react";

import useGetData from "../../customhooks/getdata";
import Categories from "./categories";
import Header from "./header";
import OfferDeal from "./offerdeal";

import Loader from "../../components/loader";

import useIsLoader from "../../customhooks/useisloader";

function OffersDeals() {
  const [coupons, setCoupons] = useState([]);

  const [gotCoupon, couponError, getCoupon] = useGetData();

  const [isLoader, setIsLoader] = useIsLoader(true);

  useEffect(() => {
    getCoupon({
      url: `${process.env.REACT_APP_API_URL}/app/coupon/listOfAvailableCoupons`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (gotCoupon != undefined && gotCoupon != "" && gotCoupon != null) {
      setIsLoader(false)
      setCoupons(gotCoupon.data.coupons);
    }
  }, [gotCoupon]);

  return (
    <div className="offersdeals-page d-grid">
      <Header />

      {isLoader ? <Loader height={60} width={60} color={"#772286"} /> :
        <div>
          <Categories />

          <OfferDeal coupons={coupons} />
        </div>}
    </div>
  );
}

export default OffersDeals;
