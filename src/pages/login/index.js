import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import VerfiyOtp from "./verifyotp";
import Loader from "../../components/loader";
import useIsLoader from "../../customhooks/useisloader";

import usePostData from "../../customhooks/postdata";

import useUserId from "../../customhooks/getuserid";

function Mobile() {
  const [isOtp, setIsOtp] = useState(false);
  const [dataFromMobile, setDataFromMobile] = useState("");

  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");

  const [isLoader, setIsLoader] = useIsLoader(false);

  const [gotOTP, otpError, getOTP] = usePostData();

  const [userId, userError] = useUserId();

  const navigate = useNavigate()

  // useEffect(() => {
  //   if (localStorage.getItem("token") && userId && userId.data && userId.data.id) {
  //     window.location.replace("/home")
  //   }
  // }, [userId])

  useEffect(() => {
    if (otpError !== undefined && otpError !== null && otpError !== "") {
      if (otpError.response.status === 502) {
        setIsLoader(false);
        setMessage("Please enter mobile number");
        setIsOtp(false);
      }
    }

    if (gotOTP !== undefined && gotOTP !== null && gotOTP !== "") {
      if (gotOTP.status === 202 || gotOTP.status === 201) {
        setIsLoader(false);
        if (gotOTP.data.role === "end-user") {
          setDataFromMobile({
            otp: gotOTP.data.otp,
            token: gotOTP.data.token,
            mobile: mobile,
          });
          setIsOtp(true);
        } else {
          setMessage("Please use customer mobile");
        }
      }
    }
  }, [gotOTP, otpError]);

  const handleChange = (e) => {
    setMessage("");

    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };

  const handleClick = () => {
    setIsLoader(true);
    getOTP({
      url: `${process.env.REACT_APP_API_URL}/auth/register`,
      body: {
        mobile: mobile,
        role: "end-user",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  return (
    <>
      {/* {
        localStorage.getItem("token") || userId && userId.data && userId.data.id ? <Loader width={60} height={60} color={"#772286"} /> : 
      } */}
      <div className="login h-100">
        {isOtp ? (
          <VerfiyOtp
            setMobile={setMobile}
            setIsOtp={setIsOtp}
            getOTP={getOTP}
            dataFromMobile={dataFromMobile}
          />
        ) : (
          <div className="mobile d-flex flex-column justify-content-between vh-100">
            <div className="back-container">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="border-0 bg-white"
              >
                <img src="/assets/common/back.svg" alt="Back" />
              </button>
            </div>
            <div className="logo-input-container d-flex flex-column justify-content-center h-100">

              <div className="logo text-center">
                <img src="assets/login/getlook_plus_logo.svg" alt="logo" />
              </div>
              <div className="input-button-conatiner">
                <div className="text-center">
                  <p className="message text-danger text-start">{message}</p>
                  <input
                    type="number"
                    className="w-100"
                    value={mobile}
                    placeholder="Enter mobile number"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="text-center">
                  <button
                    className="w-100"
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    {isLoader ? (
                      <Loader color={"#FFFFFF"} height={16} width={16} />
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="building-image-conatiner">
              <p className="terms-condition text-center mb-0">
                By signing in I agree to <Link to="/Term %26 Conditions">Term & Conditions</Link>
              </p>
              <img src="assets/common/building.png" alt="building" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Mobile;
