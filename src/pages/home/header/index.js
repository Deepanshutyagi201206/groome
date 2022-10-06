import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa"

import useUserId from "../../../customhooks/getuserid";
import useGetData from "../../../customhooks/getdata";

function Header(props) {

  const [userId, userError] = useUserId();

  const [gotUserProfile, userProfileError, getUserProfile] = useGetData();

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

  return (
    <>
      <div className="home-page-header header d-flex justify-content-between align-items-center">
        <div className="user-location-container d-flex align-items-center">
          <div className="location-icon-container">
            <img src="/assets/home/location.svg" alt="Location" />
          </div>
          <div>
            <button
              onClick={() => {
                props.openSelectLocation();
              }}
              className="select-location border-0 d-flex justify-content-start align-items-center"
            >
              <span>{props.city}</span>
              <span>
                <img src="/assets/common/down.svg" alt="Down" />
              </span>
            </button>
            <p className="location mb-0">
              {props.gotAddress &&
                props.gotAddress.data.results[0].formatted_address.substring(0, 40)}
            </p>
          </div>
        </div>
        <div className="user-image-container">
          <Link className="d-block" to="/myprofile">

            {
              userError ? <FaRegUserCircle /> : gotUserProfile && gotUserProfile.data.user ? <>{gotUserProfile.data.user.image ? <img src={`${process.env.REACT_APP_IMAGE_URL}${gotUserProfile.data.user.image}`} alt="User" /> : <FaRegUserCircle />}</> : ""
            }

          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
