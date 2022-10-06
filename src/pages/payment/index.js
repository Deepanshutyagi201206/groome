import React, { useState, useEffect } from "react";

import useUserId from "../../customhooks/getuserid";
import useGetData from "../../customhooks/getdata";

import usePostData from "../../customhooks/postdata";
import useUpdateData from "../../customhooks/updatedata";

import PaymentDetails from "./paymentdetails";
import PaymentMethod from "./paymentmethod";
import Header from "./header";
import UserAddress from "./useraddress";
import PayNow from "./paynow";
import Address from "../../components/address";
import SalonAddress from "./salonaddress";

import PopUp from "../../components/popup";
import useIsPopUp from "../../customhooks/ispopup";
import { useNavigate } from "react-router-dom";

function Payment(props) {

  const navigate = useNavigate()

  const [isPopUp, setIsPopUp] = useIsPopUp(false);

  const [popUpMessage, setPopUpMessage] = useState("");

  const [addressId, setAddressId] = useState();

  const [isOpenAddressBook, setIsOpenAddressBook] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("");

  const [ordered, orderError, order] = usePostData();

  const [completedTransactions, transactionsError, completeTransactions] =
    usePostData();

  const [empited, emptyError, emptyCart] = useUpdateData();

  const [
    updatedTransactionsStatus,
    updatedTransactionsError,
    updateTransactionsStatus,
  ] = useUpdateData();

  const [userId, userError] = useUserId();

  const [gotAddress, addressError, getAddress] = useGetData();

  const [address, setAddress] = useState([]);

  useEffect(() => {
    if (userId != undefined && userId != null && userId != "") {
      getAddress({
        url: `${process.env.REACT_APP_API_URL}/app/userAddress/search?user=${userId && userId.data.id
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (gotAddress != undefined && gotAddress != null && gotAddress != "") {
      gotAddress.data.userAddresses.forEach((item) => {
        {
          if (item.isDefault) {
            setAddressId(item._id);
          }
        }
      });
      setAddress(gotAddress.data.userAddresses);
    }
  }, [gotAddress]);

  useEffect(() => {
    if (ordered != undefined && ordered != null && ordered != "") {
      completeTransactions({
        url: `${process.env.REACT_APP_API_URL}/app/transaction`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          order: ordered && ordered.data.order._id,
          paymentMode: paymentMethod,
          payment: paymentMethod === "COD" ? "COD" : "Online"
        },
      });
    }
  }, [ordered]);

  useEffect(() => {
    if (
      completedTransactions != undefined &&
      completedTransactions != null &&
      completedTransactions != ""
    ) {
      updateTransactionsStatus({
        url: `${process.env.REACT_APP_API_URL}/app/transaction/${completedTransactions.data.transaction._id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          paymentStatus: "Success",
          paymentGatewayId: "XXXX",
        },
      });
    }
  }, [completedTransactions]);

  useEffect(() => {
    if (
      updatedTransactionsStatus != undefined &&
      updatedTransactionsStatus != null &&
      updatedTransactionsStatus != ""
    ) {
      emptyCart({
        url: `${process.env.REACT_APP_API_URL}/app/cart/empty`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      })
    }
  }, [updatedTransactionsStatus]);

  useEffect(() => {
    if (empited != undefined && empited != "" && empited != "") {
      navigate("/bookingsorders")
    }
  }, [empited]);

  const openAddressPage = () => {
    document.body.style.overflow = "hidden";

    setIsOpenAddressBook(true);
  };

  const closeAddressPage = () => {
    document.body.style.overflow = "scroll";

    setIsOpenAddressBook(false);
  };

  const handleClick = () => {

    if (props.gotCartList.data.cart.serviceType === "At Salon") {
      if (paymentMethod != "") {
        order({
          url: `${process.env.REACT_APP_API_URL}/app/order`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {
            address: addressId,
            slotDate: props.date && props.date,
            slotTime: props.date && props.time,
            qrCode:false
          },
        });
      }
      else {
        setIsPopUp(true)
        setPopUpMessage("Please select payment method.")
      }
    }
    else {
      let isUserAddress = false

      if (gotAddress.data) {
        gotAddress.data.userAddresses.forEach((item) => {
          if (item.isDefault) {
            isUserAddress = true
          }
        })
      }

      if (!isUserAddress) {
        openAddressPage()
      }
      else {
        if (paymentMethod != "") {
          order({
            url: `${process.env.REACT_APP_API_URL}/app/order`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: {
              address: addressId,
              slotDate: props.date && props.date,
              slotTime: props.date && props.time,
              qrCode:false
            },
          });
        }
        else {
          setIsPopUp(true)
          setPopUpMessage("Please select payment method.")
        }
      }
    }

  };

  return (
    <>
      <div className="payment-page d-flex flex-column justify-content-between">
        <div>

          <Header
            setTime={props.setTime}
            setIsProceed={props.setIsProceed}
            gotCartList={props.gotCartList}
          />

          <PaymentMethod setPaymentMethod={setPaymentMethod} />

          <div className="wallet-discount-container d-flex align-items-center bg-white">
            <label className="container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <p className="mb-0">Apply Wallet Discount? (₹20)</p>
            </label>
          </div>

          {props.gotCartList ? <>{props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.serviceType === "At Salon"
            ? <SalonAddress gotCartList={props.gotCartList} />
            : <UserAddress address={address} openAddressPage={openAddressPage} />}</> : ""}

          <PaymentDetails gotCartList={props.gotCartList} />
        </div>

        <PayNow gotCartList={props.gotCartList} handleClick={handleClick} />
      </div>
      {isOpenAddressBook ? (
        <Address getAddress={getAddress} closeAddressPage={closeAddressPage} />
      ) : (
        ""
      )}

      {isPopUp ? <PopUp setIsPopUp={setIsPopUp} message={popUpMessage} /> : ""}
    </>
  );
}

export default Payment;
