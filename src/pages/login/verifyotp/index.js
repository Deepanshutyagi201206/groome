import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import useGetData from "../../../customhooks/getdata";
import usePostData from "../../../customhooks/postdata";
import useIsLoader from "../../../customhooks/useisloader";
import Loader from "../../../components/loader";
import Profile from "../profile";

function VerfiyOtp(props) {
  const [message, setMessage] = useState("");
  const [isUserProfile, setIsUserProfile] = useState(true);

  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useIsLoader(false);

  const [enteredOtp, setEnteredOtp] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });

  const otpForVerify =
    enteredOtp.first + enteredOtp.second + enteredOtp.third + enteredOtp.fourth;

  const [verifiedOtp, verifyOtpError, verifyOtp] = usePostData();

  const [gotUserId, userIdError, getUserId] = useGetData();

  const [gotUserProfile, userProfileError, getUserProfile] = useGetData();

  useEffect(() => {
    if (
      verifiedOtp !== undefined &&
      verifiedOtp !== null &&
      verifiedOtp !== ""
    ) {
      if (verifiedOtp.status === 200) {
        localStorage.setItem("token", verifiedOtp.data.token);

        getUserId({
          url: `${process.env.REACT_APP_API_URL}/user/loggedInUser/getId`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${verifiedOtp.data.token}`,
          },
        });
      }
    }
  }, [verifiedOtp]);

  useEffect(() => {
    if (gotUserId != null && gotUserId != undefined && gotUserId != "") {
      getUserProfile({
        url: `${process.env.REACT_APP_API_URL}/app/user/${
          gotUserId.data.id
        }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [gotUserId]);

  useEffect(() => {
    if (
      gotUserProfile != null &&
      gotUserProfile != undefined &&
      gotUserProfile != ""
    ) {
      setIsLoader(false);
      if (
        gotUserProfile.data.user.name === null ||
        gotUserProfile.data.user.email === null ||
        gotUserProfile.data.user.dob === null
      ) {
        setIsUserProfile(false);
      } else {
        navigate(-1);
      }
    }
  }, [gotUserProfile]);

  useEffect(() => {
    if (
      verifyOtpError !== undefined &&
      verifyOtpError !== null &&
      verifyOtpError !== ""
    ) {
      if (verifyOtpError.response.status === 502) {
        setIsLoader(false);
        setMessage("Please enter OTP");
      }
      if (verifyOtpError.response.status === 401) {
        setIsLoader(false);
        setMessage("Please enter correct OTP");
      }
    }
  }, [verifyOtpError]);

  const handleKeydown = (e) => {
    //deleting input
    if (e.which === 8 || e.which === 46) {
      if (e.target.value) {
        e.target.value = "";
      } else if (e.target.value === "" && e.target.parentNode.previousSibling) {
        e.target.parentNode.previousSibling.firstChild.focus();
      }
    }
  };

  const handleChange = (e) => {
    setMessage("");

    //going to next input
    if (e.target.value.length === 1 && e.target.parentNode.nextSibling) {
      e.target.parentNode.nextSibling.firstChild.focus();
    }
  };

  const handleClickVerifyOtp = () => {
    setIsLoader(true);
    verifyOtp({
      url: `${process.env.REACT_APP_API_URL}/auth/verifyUserOtp`,
      body: {
        otp: otpForVerify,
      },
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${props.dataFromMobile.token}`,
      },
    });
  };

  const handleClickResendOtp = ()=>{
    props.getOTP({
      url: `${process.env.REACT_APP_API_URL}/auth/register`,
      body: {
        mobile: props.dataFromMobile.mobile,
        role: "end-user",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const back = () => {
    props.setMobile("");
    props.setIsOtp(false);
  };

  return (
    <>
      {isUserProfile ? (
        <div className="verify-otp d-flex flex-column justify-content-between h-100">
          <div className="back-container">
            <button
              onClick={() => {
                back();
              }}
              className="border-0 bg-white"
            >
              <img src="/assets/common/back.svg" alt="Back" />
            </button>
          </div>
          <div className="mobile-number-inputs-container d-flex flex-column justify-content-center h-100">
            <div>
              <p className="otp-sent-message text-center mb-0">
                OTP has been sent on your mobile numer
              </p>
              <div className="mobile-number-container d-flex justify-content-center">
                <p className="mobile-number mb-0">
                  {props.dataFromMobile.mobile}{" "}
                </p>
                <button
                  className="edit-mobile-number border-0"
                  onClick={() => {
                    props.setIsOtp(false);
                  }}
                >
                  <img src="assets/common/edit.svg" alt="Edit" />
                </button>
              </div>
            </div>
            <div className="inputs-button-container">
              <div className="enter-otp">
                <p className="text-center mb-0">Enter OTP</p>
              </div>
              {message ? (
                <div>
                  <p className="message text-center text-danger">{message}</p>
                </div>
              ) : (
                ""
              )}
              <div className="inputs-container d-flex justify-content-center align-item-center">
                <div>
                  <input
                    onChange={(e) => {
                      setEnteredOtp({ ...enteredOtp, first: e.target.value });
                      handleChange(e);
                    }}
                    onKeyDown={(e) => {
                      handleKeydown(e);
                    }}
                    type="tel"
                    maxLength={1}
                    className="text-center"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setEnteredOtp({ ...enteredOtp, second: e.target.value });
                      handleChange(e);
                    }}
                    onKeyDown={(e) => {
                      handleKeydown(e);
                    }}
                    type="tel"
                    maxLength={1}
                    className="text-center"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setEnteredOtp({ ...enteredOtp, third: e.target.value });
                      handleChange(e);
                    }}
                    onKeyDown={(e) => {
                      handleKeydown(e);
                    }}
                    type="tel"
                    maxLength={1}
                    className="text-center"
                  />
                </div>
                <div>
                  <input
                    onChange={(e) => {
                      setEnteredOtp({ ...enteredOtp, fourth: e.target.value });
                      handleChange(e);
                    }}
                    onKeyDown={(e) => {
                      handleKeydown(e);
                    }}
                    type="tel"
                    maxLength={1}
                    className="text-center"
                  />
                </div>
              </div>
              <div className="verify-container text-center">
                <button
                  onClick={() => {
                    handleClickVerifyOtp();
                  }}
                  className="border-0 w-100"
                >
                  {isLoader ? (
                    <Loader color={"#FFFFFF"} height={16} width={16} />
                  ) : (
                    "Verify"
                  )}
                </button>
              </div>
              <div className="resend-container d-flex justify-content-between align-items-center">
                <p className="mb-0">OTP is: {props.dataFromMobile.otp}</p>
                <button
                  onClick={() => {
                    handleClickResendOtp();
                  }}
                  className="text-container border-0"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
          <div className="building-image-conatiner">
            <img src="assets/common/building.png" alt="building" />
          </div>
        </div>
      ) : (
        <Profile
          mobile={props.dataFromMobile.mobile}
          userId={gotUserId ? gotUserId.data.id : ""}
        />
      )}
    </>
  );
}

export default VerfiyOtp;
