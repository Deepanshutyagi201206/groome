import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa"

import useUserId from "../../customhooks/getuserid";
import useGetData from "../../customhooks/getdata";
import Address from "../../components/address";

import moment from "moment";

import Logout from "./logout";

const MyProfile = () => {

  const [userId, userError] = useUserId();

  const [isOpenAddressBook, setIsOpenAddressBook] = useState(false);

  const navigate = useNavigate();

  const [gotUserProfile, userProfileError, getUserProfile] = useGetData();

  const [isShowLogout, setIsShowLogout] = useState(false);

  useEffect(() => {
    if (userId != undefined && userId != null && userId != "") {
      getUserProfile({
        url: `${process.env.REACT_APP_API_URL}/app/user/${userId && userId.data.id
          }?status=1`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId])

  const openAddressPage = () => {
    if (userId) {
      const element = document.getElementsByClassName("myprofile-page");
      element[0].style.height = "100vh";
      element[0].style.overflow = "hidden";

      setIsOpenAddressBook(true);
    }
    if (userError) {
      navigate("/login")
    }
  };

  const closeAddressPage = () => {
    const element = document.getElementsByClassName("myprofile-page");
    element[0].style.height = "100%";
    element[0].style.overflow = "auto";

    setIsOpenAddressBook(false);
  };

  const handleClickOnLike = () => {
    if (userId) {
      navigate("/favourites")
    }
    if (userError) {
      navigate("/login")
    }
  }

  const handleClickOnViewProfile = () => {
    if (userId) {
      navigate("/viewprofile")
    }
    if (userError) {
      navigate("/login")
    }
  }

  const handleClickOnWallet = () => {
    if (userId) {
      navigate("/wallet")
    }
    if (userError) {
      navigate("/login")
    }
  }

  const handleClickOnBookingOrder = () => {
    if (userId) {
      navigate("/bookingsorders")
    }
    if (userError) {
      navigate("/login")
    }
  }

  const handleClickOnOfferDeals = () => {
    if (userId) {
      navigate("/offersdeals")
    }
    if (userError) {
      navigate("/login")
    }
  }

  return (
    <>
      <div className="myprofile-page">
        <div className="header-container d-flex align-items-center bg-white">
          <div>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="border-0"
            >
              <img src="/assets/common/back.svg" alt="Back" />
            </button>
          </div>
          <div className="w-100 text-center">
            <p className="mb-0">My Profile</p>
          </div>
        </div>

        {userId ? <div className="user-info-container d-flex justify-content-between align-items-center bg-white">
          <div className="user-info">
            <p className="name mb-0">
              {gotUserProfile && gotUserProfile.data && gotUserProfile.data.user && gotUserProfile.data.user.name}
            </p>
            {gotUserProfile && gotUserProfile.data && gotUserProfile.data.user && gotUserProfile.data.user.dob ?
              <div className="member-since d-flex align-items-center">
                <p className="mb-0">Member Since: </p>
                <p className="mb-0">{moment(gotUserProfile.data.user.dob).format("DD/MM/YYYY")}</p>
              </div> : ""}
            <div className="phone-number d-flex align-items-center">
              <div className="image d-flex align-items-center justify-content-center">
                <img src="assets/myprofile/mobile.svg" alt="Mobile" />
              </div>
              <p className="mb-0">
                {gotUserProfile && gotUserProfile.data && gotUserProfile.data.user && gotUserProfile.data.user.mobile}
              </p>
            </div>
          </div>
          <div className="user-profile-image">
            {
              gotUserProfile && gotUserProfile.data.user ? <>{gotUserProfile.data.user.image ? <img src={`${process.env.REACT_APP_IMAGE_URL}${gotUserProfile.data.user.image}`} alt="User" /> : <FaRegUserCircle />}</> : ""
            }
          </div>
        </div> : ""}
        {userError ?
          <div className="profile-without-login">
            <p>Log in to view your profile.</p>
            <Link to="/login">Continue</Link>
          </div> : ""}

        <div className="user-liked-offer-wallet d-flex justify-content-between">
          <div className="liked bg-white text-center">
            <button onClick={() => { handleClickOnLike() }}>
              <img src="assets/common/unlike.svg" alt="Img Not Found" />
              <p className="mb-0">Liked</p>
            </button>
          </div>

          <div className="offers bg-white text-center">
            <button onClick={()=>{handleClickOnOfferDeals()}}>
              <img src="assets/myprofile/offer_deals.svg" alt="Img Not Found" />
              <p className="mb-0">Offer & Deals</p>
            </button>
          </div>

          <div className="view-profile bg-white text-center">
            <button onClick={() => { handleClickOnViewProfile() }}>
              <img
                src="assets/myprofile/view_profile.svg"
                alt="Img Not Found"
              />
              <p className="mb-0">View Profile</p>
            </button>
          </div>

          <div className="wallet bg-white text-center">
            <button onClick={() => { handleClickOnWallet() }}>
              <img src="assets/common/wallet.svg" alt="Img Not Found" />
              <p className="mb-0 ">Wallet</p>
            </button>
          </div>
        </div>

        <div className="order-details-section">
          <div className="title">
            <p className="mb-0">Order Details</p>
          </div>
          <div className="booking-order-container d-grid align-items-baseline">
            <div className="image d-grid justify-content-center align-items-center">
              <img
                src="assets/myprofile/salon_booking.svg"
                alt="Salon Booking"
              />
            </div>
            <div className="booking-order d-grid justify-content-between">
              <p className="mb-0">Bookings & Orders</p>
              <div className="right-image">
                <button onClick={() => { handleClickOnBookingOrder() }}>
                  <img src="assets/common/purple_right.svg" alt="Right" />
                </button>
              </div>
            </div>
          </div>
          <div className="address-booking-container d-grid align-items-baseline pb-0">
            <div className="image d-grid justify-content-center align-items-center">
              <img src="assets/myprofile/address_book.svg" alt="Address Book" />
            </div>
            <div className="address-booking d-grid justify-content-between">
              <p className="mb-0">Address Book</p>
              <div className="right-image">
                <button
                  onClick={() => {
                    openAddressPage();
                  }}
                  className="border-0 bg-white"
                >
                  <img src="assets/common/purple_right.svg" alt="Right" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="membership-container d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center">
            <div className="image d-grid justify-content-center align-items-center">
              <img src="assets/myprofile/membership.svg" alt="Membership" />
            </div>
            <div className="membership">
              <p className="mb-0">Your Membership</p>
            </div>
          </div>

          <div className="right-image">
            <Link to="#">
              <img src="assets/common/purple_right.svg" alt="Right" />
            </Link>
          </div>
        </div>

        <div className="about-us-container d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center">
            <div className="image d-grid justify-content-center align-items-center">
              <img src="assets/myprofile/info.svg" alt="About us" />
            </div>
            <div className="about-us">
              <p className="mb-0">About Us</p>
            </div>
          </div>

          <div className="right-image">
            <Link to="/About Us">
              <img src="assets/common/purple_right.svg" alt="Right" />
            </Link>
          </div>
        </div>

        <div className="terms-of-service-container d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center">
            <div className="image d-grid justify-content-center align-items-center">
              <img
                src="assets/myprofile/terms_and_conditions.svg"
                alt="About us"
              />
            </div>
            <div className="terms-of-service">
              <p className="mb-0">Terms of Service</p>
            </div>
          </div>

          <div className="right-image">
            <Link to="/Terms of Service">
              <img src="assets/common/purple_right.svg" alt="Right" />
            </Link>
          </div>
        </div>

        <div className="privacy-policy-container d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center">
            <div className="image d-grid justify-content-center align-items-center">
              <img src="assets/myprofile/privacy_policy.svg" alt="About us" />
            </div>
            <div className="privacy-policy">
              <p className="mb-0">Privacy Policy</p>
            </div>
          </div>

          <div className="right-image">
            <Link to="/Privacy Policy">
              <img src="assets/common/purple_right.svg" alt="Right" />
            </Link>
          </div>
        </div>

        <div className="faqs-container d-flex justify-content-between align-items-center bg-white">
          <div className="d-flex align-items-center">
            <div className="image d-grid justify-content-center align-items-center">
              <img src="assets/myprofile/faq.svg" alt="About us" />
            </div>
            <div className="faqs">
              <p className="mb-0">FAQs</p>
            </div>
          </div>

          <div className="right-image">
            <Link to="/faqs">
              <img src="assets/common/purple_right.svg" alt="Right" />
            </Link>
          </div>
        </div>

        {
          userId ?
            <div className="logout-container d-flex justify-content-between align-items-center bg-white">
              <div className="d-flex align-items-center">
                <div className="image d-grid justify-content-center align-items-center">
                  <img src="assets/myprofile/logout.svg" alt="About us" />
                </div>
                <div className="logout">
                  <p className="mb-0">Logout</p>
                </div>
              </div>

              <button onClick={() => { setIsShowLogout(true) }} className="right-image">
                <img src="assets/common/purple_right.svg" alt="Right" />
              </button>
            </div> : ""
        }

      </div>
      {isOpenAddressBook ? <Address closeAddressPage={closeAddressPage} /> : ""}

      {isShowLogout ? <Logout setIsShowLogout={setIsShowLogout} /> : ""}
    </>
  );
};

export default MyProfile;
