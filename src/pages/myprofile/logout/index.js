import { useCallback, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Logout(props) {

  const navigate = useNavigate()

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";
  })

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return callback
  })

  const handleClickOnLogout = () => {
    sessionStorage.clear()
    localStorage.clear()
    document.body.style.overflow = "scroll";
    props.setIsShowLogout(false);
    navigate("/login")
  };


  return (
    <div className="logout-section-container d-flex justify-content-center align-items-center">
      <div className="logout-section d-flex flex-column justify-content-center align-items-center">
        <p className="mb-0 message">Are you sure you want to Logout?</p>
        <div className="d-flex justify-content-between align-items-center w-100">
          <button
            onClick={() => {
              props.setIsShowLogout(false);
            }}
            className="cancel"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleClickOnLogout();
            }}
            className="logout"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
