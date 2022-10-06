import React, { useCallback, useEffect, useState } from "react";

import useGetData from "../../customhooks/getdata";
import useIsLoader from "../../customhooks/useisloader";
import Loader from "../../components/loader";
import UserAddress from "./useraddress";
import useUserId from "../../customhooks/getuserid";

import SalonAddress from "./salonaddress";
import Address from "../../components/address";

import { AiOutlineClockCircle } from "react-icons/ai";
import SlotTime from "./slottime";
import SlotDate from "./slotdate";
import Header from "./header";

import PopUp from "../../components/popup";

import useIsPopUp from "../../customhooks/ispopup";

import Payment from "../payment";

function Slot(props) {

  const [isLoader, setIsLoader] = useIsLoader(true);

  const [isPopUp, setIsPopUp] = useIsPopUp(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [popUpMessage, setPopUpMessage] = useState("");

  const [isProceed, setIsProceed] = useState(false)

  const [address, setAddress] = useState([]);

  const [isOpenAddressBook, setIsOpenAddressBook] = useState(false);

  const [userId, userError] = useUserId("");

  const [gotAddress, addressError, getAddress] = useGetData();

  const [gotSalonSlots, salonSlotsError, getSalonSlots] = useGetData();

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
    if (gotAddress != undefined && gotAddress != null && gotAddress != "") {
      setAddress(gotAddress.data.userAddresses);
    }
  }, [gotAddress]);

  useEffect(() => {
    setIsLoader(true);
    if (date != undefined && date != null && date != "" && props.gotCartList != undefined && props.gotCartList != null && props.gotCartList != "") {
      getSalonSlots({
        url: `${process.env.REACT_APP_API_URL}/app/slotv2/getSlots/${props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.salon._id}?date=${date}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [date, props]);

  useEffect(() => {
    if (
      gotSalonSlots != undefined &&
      gotSalonSlots != null &&
      gotSalonSlots != ""
    ) {
      setIsLoader(false)
    }
  }, [gotSalonSlots]);

  useEffect(() => {
    if (
      salonSlotsError != undefined &&
      salonSlotsError != null &&
      salonSlotsError != ""
    ) {
      if (salonSlotsError.response.data.code == 502) {
        setIsLoader(false);
      }
    }
  }, [salonSlotsError]);

  const openAddressPage = () => {
    document.body.style.overflow = "hidden";

    setIsOpenAddressBook(true);
  };

  const closeAddressPage = () => {
    document.body.style.overflow = "scroll";

    setIsOpenAddressBook(false);
  };

  const handleClickOnProceed = () => {

    if (props.gotCartList.data.cart.serviceType === "At Salon") {
      if (date != "" && time != "") {
        setIsProceed(true)

      }
      else {
        setIsPopUp(true)
        setPopUpMessage("Please select slot Date and Time.")
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
        if (date != "" && time != "") {
          setIsProceed(true)

        }
        else {
          setIsPopUp(true)
          setPopUpMessage("Please select slot Date and Time.")
        }
      }
    }
  }

  return (
    <>

      {isProceed ? "" : <div className="slot-page d-grid flex-column justify-content-between">
        <Header setIsProceed={props.setIsProceed} gotCartList={props.gotCartList} />
        <div className="info-container d-grid">

          <div className="sub-info-container d-grid">
            {
              props.gotCartList ? <>{props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.serviceType === "At Salon"
                ? <SalonAddress gotCartList={props.gotCartList} />
                : <UserAddress address={address} openAddressPage={openAddressPage} />}</> : ""
            }


            <div className="slot-section bg-white d-grid">
              <div className="title-date-container">
                <div className="title-container d-flex align-items-center">
                  <AiOutlineClockCircle />
                  <p className="mb-0">Time Slot</p>
                </div>
                <SlotDate setDate={setDate} />
              </div>

              {isLoader ? (
                <Loader width={60} height={60} color={"#772286"} />
              ) : (
                <SlotTime gotSalonSlots={gotSalonSlots} setTime={setTime} />
              )}
            </div>

          </div>

          <div className="save-proceed">
            <button
              onClick={() => {
                handleClickOnProceed();
              }}
              className="border-0"
            >
              Save & Proceed
            </button>
          </div>

        </div>

      </div>}

      {isOpenAddressBook ? (
        <Address getAddress={getAddress} closeAddressPage={closeAddressPage} />
      ) : (
        ""
      )}

      {isPopUp ? <PopUp setIsPopUp={setIsPopUp} message={popUpMessage} /> : ""}


      {isProceed ? <Payment
        setTime={setTime}
        gotCartList={props.gotCartList}
        time={time}
        date={date}
        setIsProceed={setIsProceed}
      /> : ""}

    </>
  );
}

export default Slot;
