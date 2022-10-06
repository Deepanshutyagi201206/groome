import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa"

import useGetData from "../../customhooks/getdata";
import useUpdateData from "../../customhooks/updatedata";
import useUserId from "../../customhooks/getuserid";
import Header from "./header";

import moment from "moment";

function ViewProfile() {
  const navigate = useNavigate();
  const [gotUserProfile, userProfileError, getUserProfile] = useGetData();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    dob: "",
    alternateNumber: "",
    image: "",
    url: "",
    updateImage:"null"
  });

  const [userId, userError] = useUserId();

  const [updatedUserInfo, UserInfoError, updateUserInfo] = useUpdateData();

  const [isInputDisabled, setIsInputDisabled] = useState(true)

  const [message, setMessage] = useState("")

  const formData = new FormData();

  formData.append("name", userInfo.name)
  formData.append("email", userInfo.email)
  formData.append("dob", userInfo.dob)
  formData.append("alternateNumber", userInfo.alternateNumber)
  formData.append("image", userInfo.image && userInfo.image[0])
  formData.append("updateImage", userInfo.updateImage)

  useEffect(() => {
    if (userId != undefined && userId != null && userId != null) {
      getUserProfile({
        url: `${process.env.REACT_APP_API_URL}/app/user/${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (
      gotUserProfile != undefined &&
      gotUserProfile != null &&
      gotUserProfile != ""
    ) {
      setUserInfo({
        name: gotUserProfile.data.user && gotUserProfile.data.user.name,
        email: gotUserProfile.data.user && gotUserProfile.data.user.email,
        mobile: gotUserProfile.data.user && gotUserProfile.data.user.mobile,
        dob: gotUserProfile.data.user && gotUserProfile.data.user.dob,
        alternateNumber: gotUserProfile.data.user.alternateNumber,
        image: gotUserProfile.data.user.image,
        updateImage:"null",
        url: gotUserProfile.data.user.image ? `${process.env.REACT_APP_IMAGE_URL}${gotUserProfile.data.user.image}` : ""
      });
    }
  }, [gotUserProfile]);

  useEffect(() => {
    if (
      updatedUserInfo != undefined &&
      updatedUserInfo != null &&
      updatedUserInfo != ""
    ) {
      navigate(-1);
    }
  }, [updatedUserInfo]);

  const handleClick = () => {
    updateUserInfo({
      url: `${process.env.REACT_APP_API_URL}/app/user/${userId && userId.data.id
        }/form`,
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
  };

  const handleOnChangeImage = (e) => {
    setMessage("")

    let valid = true;

    const files = Array.from(e.target.files)

    if (e.target.files) {
      files.map((file) => {
        const size = file.size / 1024;
        if (size > 100) {
          valid = false;
          setMessage("Please provide maximum 100kb size")
          setUserInfo({
            ...userInfo, image: "", url: ""
          })
        }
        if (
          !["application/jpg", "image/jpeg", "image/png"].includes(file.type)
        ) {
          valid = false;
          setMessage("Please provide correct file type from these jpg, jpeg, png")
          setUserInfo({
            ...userInfo, image: "", url: ""
          })
        }
      });
    }

    if (valid) {
      setUserInfo({
        ...userInfo, image: files, url: URL.createObjectURL(files[0]), updateImage: gotUserProfile.data.user.image ? gotUserProfile.data.user.image : "null"
      })
    }
  }

  return (
    <div className="view-profile-page">
      <Header />

      <div className="user-image-container text-center position-relative">
        <div className="user-image">
          {
            gotUserProfile && gotUserProfile.data.user ? <>{userInfo.url ? <img src={userInfo.url} alt="User" /> : <FaRegUserCircle />}</> : ""
          }
        </div>
        {isInputDisabled ? "" :
          <div className="user-image-input-container d-flex justify-content-center align-items-center m-auto">
            <label>
              <input
                disabled={isInputDisabled}
                className="border-0"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  handleOnChangeImage(e)

                }}
              />
              <div className="d-flex justify-content-center align-items-center">
                <img src="assets/common/camera.svg" alt="Camera" />
              </div>
            </label>
          </div>
        }

      </div>
      {message ? <p className="message">{message}</p> : ""}
      <div className="name-input-container">
        <p className="mb-0">Name</p>
        <input
          disabled={isInputDisabled}
          type="text"
          onChange={(e) => {
            setUserInfo({ ...userInfo, name: e.target.value });
          }}
          value={userInfo.name}
          className="border-0 bg-white"
        />
      </div>
      <div className="mobile-input-container">
        <p className="mb-0">Mobile No.</p>
        <input
          disabled
          type="text"
          onChange={(e) => {
            setUserInfo({ ...userInfo, mobile: e.target.value });
          }}
          value={userInfo.mobile}
          className="border-0 bg-white"
        />
      </div>
      <div className="email-input-container">
        <p className="mb-0">Email id</p>
        <input
          disabled={isInputDisabled}
          type="text"
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
          value={userInfo.email}
          className="border-0 bg-white"
        />
      </div>
      <div className="birthday-input-container">
        <p className="mb-0">Your Birthday</p>
        <input
          disabled={isInputDisabled}
          type="date"
          onChange={(e) => {
            setUserInfo({ ...userInfo, dob: e.target.value });
          }}
          value={moment(userInfo.dob).format("YYYY-MM-DD")}
          className="border-0 bg-white"
        />
        <p className="mb-0 birthday-text">
          (Please provide your correct birthday and year. We have free
          services and offers on Birthdays)
        </p>
      </div>
      <div className="alternate-input-container">
        <p className="mb-0">Alternate No.</p>
        <input
          disabled={isInputDisabled}
          type="text"
          onChange={(e) => {
            setUserInfo({ ...userInfo, alternateNumber: e.target.value });
          }}
          value={userInfo.alternateNumber}
          className="border-0 bg-white"
        />
      </div>
      {
        isInputDisabled ? <div className="edit-profile-container">
          <button
            onClick={() => {
              setIsInputDisabled(false);
            }}
            className="border-0"
          >
            Edit Profile
          </button>
        </div> : <div className="save-cancel-container">
          <button
            onClick={() => {
              handleClick();
            }}
            className="save border-0"
          >
            Save Changes
          </button>

          <button
            onClick={() => {
              setIsInputDisabled(true);
            }}
            className="cancel"
          >
            Cancel
          </button>
        </div>
      }

    </div>
  );
}

export default ViewProfile;
