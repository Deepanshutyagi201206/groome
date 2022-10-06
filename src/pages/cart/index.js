import React, { useEffect, useState } from "react";

import useUserId from "../../customhooks/getuserid";
import useGetData from "../../customhooks/getdata";
import Loader from "../../components/loader";
import useIsLoader from "../../customhooks/useisloader";

import Address from "../../components/address";
import PaymentDetails from "./paymentdetails";
import AddInstructions from "./addinstructions";
import Proceed from "./proceed";
import Product from "./product";
import Service from "./service";
import Header from "./header";
import Instruction from "./instructions";
import AppliedCoupon from "./appliedcoupon";
import AddServiceProducts from "./addservicesproducts";

import PopUp from "../../components/popup";

import AppliedCouponFromCoupons from "./apppliedcouponfromcoupons";

import Coupons from "../coupons";

import useIsPopUp from "../../customhooks/ispopup";

import Slot from "../slot";

import Payment from "../payment";

import useDeleteData from "../../customhooks/deletedata";

function Cart() {
  const [isLoader, setIsLoader] = useIsLoader(true)

  const [userId, userError] = useUserId(false);

  const [isPopUp, setIsPopUp] = useIsPopUp(false);

  const [popUpMessage, setPopUpMessage] = useState("");

  const [gotCartList, cartListError, getCartList] = useGetData();

  const [isInsruction, setIsInstruction] = useState(false);

  const [gotAddress, addressError, getAddress] = useGetData();

  const [isOpenAddressBook, setIsOpenAddressBook] = useState(false);

  const [isOpenCoupon, setIsOpenCoupon] = useState(false);

  const [isAppliedCoupon, setIsAppliedCoupon] = useState(false);

  const [isProceed, setIsProceed] = useState(false)

  const [gotGenericCart, genericCartError, getGenericCart] = useGetData();

  const [movedGenericCart, movedGenericCartError, moveGenericCart] = useDeleteData();

  useEffect(() => {
    if (userId != undefined && userId != null && userId != "") {
      getAddress({
        url: `${process.env.REACT_APP_API_URL}/app/userAddress/search?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      if (gotGenericCart != null && gotGenericCart != undefined && gotGenericCart != "") {
        if (gotGenericCart && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.totalItems > 0) {
          moveGenericCart({
            url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/move`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: {}
          })
        }
        else {
          getCartList({
            url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
      }
    }
  }, [gotGenericCart && userId])

  useEffect(() => {
    if (movedGenericCart != undefined && movedGenericCart != null && movedGenericCart != "") {
      getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });

    }
  }, [movedGenericCart]);

  useEffect(() => {
    if (userError || userId) {
      if (localStorage.getItem("cartId") != "" && localStorage.getItem("cartId") != null && localStorage.getItem("cartId") != undefined) {

        getGenericCart({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
          headers: {},
        });
      }
      else {
        if(userId){
          getCartList({
            url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
        }
      }
    }

  }, [userError, userId])

  useEffect(() => {

    if ((gotCartList != undefined && gotCartList != null && gotCartList != "") || (gotGenericCart != undefined && gotGenericCart != null && gotGenericCart != "")) {
      setIsLoader(false);
    }
  }, [gotCartList, gotGenericCart]);

  const openAddInstruction = () => {
    setIsInstruction(true);
    document.body.style.overflow = "hidden";
  };

  const closeAddInstruction = () => {
    setIsInstruction(false);
    document.body.style.overflow = "scroll";
  };

  const openAddressPage = () => {
    document.body.style.overflow = "hidden";

    setIsOpenAddressBook(true);
  };

  const closeAddressPage = () => {
    document.body.style.overflow = "scroll";

    setIsOpenAddressBook(false);
  };

  return (
    <>
      {isOpenCoupon || isProceed ? (
        ""
      ) : (
        <div className="cart-page d-grid">
          <Header gotGenericCart={gotGenericCart} gotCartList={gotCartList} />
          {isLoader ? <Loader height={60} width={60} color={"#772286"} /> : <div className="info-container d-flex flex-column justify-content-between">
            <div className="sub-info-container">
              {(gotCartList &&
                gotCartList.data.cart &&
                gotCartList.data.cart.products.length > 0) || (gotGenericCart &&
                  gotGenericCart.data.genericCart &&
                  gotGenericCart.data.genericCart.products.length > 0) ? (
                <Product
                  gotGenericCart={gotGenericCart}
                  getGenericCart={getGenericCart}
                  setIsPopUp={setIsPopUp}
                  setPopUpMessage={setPopUpMessage}
                  gotCartList={gotCartList}
                  getCartList={getCartList}
                />
              ) : (
                ""
              )}

              {(gotCartList &&
                gotCartList.data.cart &&
                gotCartList.data.cart.services.length > 0) || (gotGenericCart &&
                  gotGenericCart.data.genericCart &&
                  gotGenericCart.data.genericCart.services.length > 0) > 0 ? (
                <Service
                  gotGenericCart={gotGenericCart}
                  getGenericCart={getGenericCart}
                  gotCartList={gotCartList}
                  getCartList={getCartList}
                />
              ) : (
                ""
              )}

              {(gotCartList && gotCartList.data.cart && gotCartList.data.cart.totalItems > 0 || gotGenericCart && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.totalItems > 0) ? (
                <Instruction
                  openAddInstruction={openAddInstruction}
                  gotGenericCart={gotGenericCart}
                  gotCartList={gotCartList}
                  getCartList={getCartList}
                />
              ) : ""}

              <AddServiceProducts />

              {(gotCartList && gotCartList.data.cart && gotCartList.data.cart.totalItems > 0 || gotGenericCart && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.totalItems > 0) ? (
                <AppliedCoupon
                  gotGenericCart={gotGenericCart}
                  gotCartList={gotCartList}
                  setIsOpenCoupon={setIsOpenCoupon}
                />
              ) : ""}
              {(gotCartList && gotCartList.data.cart && gotCartList.data.cart.totalItems > 0 || gotGenericCart && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.totalItems > 0) ?
                <PaymentDetails gotGenericCart={gotGenericCart} gotCartList={gotCartList} /> : ""}
            </div>

            {(gotCartList &&
              gotCartList.data.cart &&
              gotCartList.data.cart.totalItems > 0) || (gotGenericCart &&
                gotGenericCart.data.genericCart &&
                gotGenericCart.data.genericCart.totalItems > 0) ? (
              <Proceed
                gotGenericCart={gotGenericCart}
                setIsProceed={setIsProceed}
                setIsPopUp={setIsPopUp}
                setPopUpMessage={setPopUpMessage}
                openAddressPage={openAddressPage}
                gotAddress={gotAddress}
                gotCartList={gotCartList}
              />
            ) : (
              ""
            )}
          </div>}
        </div>
      )}

      {isInsruction ? (
        <AddInstructions
          getCartList={getCartList}
          closeAddInstruction={closeAddInstruction}
        />
      ) : (
        ""
      )}

      {isOpenAddressBook ? (
        <Address getAddress={getAddress} closeAddressPage={closeAddressPage} />
      ) : (
        ""
      )}

      {isOpenCoupon ? (
        <Coupons
          getCartList={getCartList}
          setIsOpenCoupon={setIsOpenCoupon}
          setIsAppliedCoupon={setIsAppliedCoupon}
        />
      ) : (
        ""
      )}

      {isAppliedCoupon && gotCartList && gotCartList.data.cart.appliedCoupon ? (
        <AppliedCouponFromCoupons
          setIsAppliedCoupon={setIsAppliedCoupon}
          gotCartList={gotCartList}
        />
      ) : (
        ""
      )}

      {isProceed &&
        gotCartList &&
        gotCartList.data.cart &&
        gotCartList.data.cart.services.length > 0 ? (
        <Slot
          gotCartList={gotCartList}
          setIsProceed={setIsProceed}
        />
      ) : (
        ""
      )}
      {isProceed &&
        gotCartList &&
        gotCartList.data.cart &&
        gotCartList.data.cart.services.length == 0 && gotCartList &&
        gotCartList.data.cart &&
        gotCartList.data.cart.products.length > 0 ? (
        <Payment gotCartList={gotCartList} setIsProceed={setIsProceed} />
      ) : (
        ""
      )}

      {isPopUp ? <PopUp setPopUpMessage={setPopUpMessage} setIsPopUp={setIsPopUp} message={popUpMessage} /> : ""}
    </>
  );
}

export default Cart;
