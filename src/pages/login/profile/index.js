import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegUserCircle } from "react-icons/fa"

import useUpdateData from "../../../customhooks/updatedata";
import Loader from "../../../components/loader";
import useIsLoader from "../../../customhooks/useisloader";

function Profile(props) {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    dob: "",
    alternateNumber: "",
    image: "",
    url: "",
  });

  const navigate = useNavigate();

  const [isLoader, setIsLoader] = useIsLoader(false);

  const [imageMessage, setImageMessage] = useState("")
  const [nameMessage, setNameMessage] = useState("")
  const [emailMessage, setEmailMessage] = useState("")
  const [dobMessage, setDobMessage] = useState("")
  const [alternateNumberMessage, setAlternateNumberMessage] = useState("")

  const [updatedUserInfo, UserInfoError, updateUserInfo] = useUpdateData();

  const formData = new FormData();

  formData.append("name", userInfo.name)
  formData.append("email", userInfo.email)
  formData.append("dob", userInfo.dob)
  formData.append("alternateNumber", userInfo.alternateNumber)
  formData.append("image", userInfo.image && userInfo.image[0])

  useEffect(() => {
    if (
      updatedUserInfo != undefined &&
      updatedUserInfo != null &&
      updatedUserInfo != ""
    ) {
      if (updatedUserInfo.status === 200) {
        setIsLoader(false);
        navigate(-1);
      }
    }
  }, [updatedUserInfo]);

  const checkValidation = ()=>{
    if(userInfo.name==""){
      setNameMessage("Please provide name.")
    }
    if(userInfo.email==""){
      setEmailMessage("Please provide email.")
    }
    if(userInfo.dob==""){
      setDobMessage("Please provide DOB.")
    }
    if(userInfo.alternateNumber==""){
      setAlternateNumberMessage("Please provide alternate number.")
    }
    if(userInfo.image==""){
      setImageMessage("Please provide image.")
    }
  }

  const handleClick = () => {

    checkValidation()

    if(userInfo.name!="" && userInfo.email!="" && userInfo.dob!="" && userInfo.alternateNumber!="" && userInfo.image!=""){
      setIsLoader(true);

      updateUserInfo({
        url: `${process.env.REACT_APP_API_URL}/app/user/${props.userId}/form`,
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
    }
  };

  const handleOnChangeImage = (e) => {
    setImageMessage("")

    let valid = true;

    const files = Array.from(e.target.files)

    if (e.target.files) {
      files.map((file) => {
        const size = file.size / 1024;
        if (size > 100) {
          valid = false;
          setImageMessage("Please provide maximum 100kb size")
          setUserInfo({
            ...userInfo, image: "", url: ""
          })
        }
        if (
          !["application/jpg", "image/jpeg", "image/png"].includes(file.type)
        ) {
          valid = false;
          setImageMessage("Please provide correct file type from these jpg, jpeg, png")
          setUserInfo({
            ...userInfo, image: "", url: ""
          })
        }
      });
    }

    if (valid) {
      setUserInfo({
        ...userInfo, image: files, url: URL.createObjectURL(files[0]), updateImage: "null"
      })
    }
  }

  return (
    <div className="profile-page d-flex flex-column justify-content-between">
      <div>
        <div className="header text-center d-grid justify-content-center align-items-center">
          <p className="mb-0">Set up Profile</p>
        </div>

        <div className="input-fields-container d-flex flex-column justify-content-center">
          <div className="user-image-container position-relative text-center">
            <div className="user-image">
              {
                userInfo.url ? <img src={userInfo.url} alt="User" /> : <FaRegUserCircle />
              }

            </div>
            <div className="user-image-input-container d-flex justify-content-center align-items-center m-auto">
              <label>
                <input
                  className="border-0"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => {
                    handleOnChangeImage(e);
                  }}
                />
                <div className="camera-container d-flex justify-content-center align-items-center">
                  <img src="assets/common/camera.svg" alt="Camera" />
                </div>
              </label>
            </div>
            
          </div>

          
          <div className="mobile-container">
          {imageMessage ? <p className="message">{imageMessage}</p> : ""}
          {nameMessage ? <p className="message">{nameMessage}</p> : ""}
            <p className="mb-0">Name</p>
            <input
              type="text"
              onChange={(e) => {
                setNameMessage("")
                setUserInfo({ ...userInfo, name: e.target.value });
              }}
              className="border-0"
            />
          </div>
          <div className="mobile-container">
            <p className="mb-0">Mobile No.</p>
            <input
              disabled
              type="text"
              onChange={(e) => {
                
                setUserInfo({ ...userInfo, mobile: e.target.value });
              }}
              value={props.mobile}
              className="border-0 bg-white"
            />
          </div>
          <div>
          {emailMessage ? <p className="message">{emailMessage}</p> : ""}
            <p className="mb-0">Email id</p>
            <input
              type="text"
              onChange={(e) => {
                setEmailMessage("")
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
              className="border-0"
            />
          </div>
          <div className="birthday-input-container">
          {dobMessage ? <p className="message">{dobMessage}</p> : ""}
            <p className="mb-0">Your Birthday</p>
            <input
              type="date"
              onChange={(e) => {
                setDobMessage("")
                setUserInfo({ ...userInfo, dob: e.target.value });
              }}
              className="border-0"
            />
            <p className="mb-0 birthday-text">
              (Please provide your correct birthday and year. We have free
              services and offers on Birthdays)
            </p>
          </div>
          <div>
          {alternateNumberMessage ? <p className="message">{alternateNumberMessage}</p> : ""}
            <p className="mb-0">Alternate No.</p>
            <input
              type="text"
              onChange={(e) => {
                setAlternateNumberMessage("")
                setUserInfo({ ...userInfo, alternateNumber: e.target.value });
              }}
              className="border-0"
            />
          </div>
          <div className="proceed-button-container">
            <button
              onClick={() => {
                handleClick();
              }}
              className="border-0"
            >
              {isLoader ? (
                <Loader color={"#FFFFFF"} height={16} width={16} />
              ) : (
                "Proceed"
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="building-image-container">
        <img src="/assets/common/building.png" alt="Building" />
      </div>
    </div>
  );
}

export default Profile;
