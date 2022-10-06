import React from "react";
import { useState, useEffect } from "react";

import usePostData from "../../../customhooks/postdata";
import useUpdateData from "../../../customhooks/updatedata";

function GetAddress(props) {
  const [slideGetAddress, setSlideGetAddress] = useState({});

  const [active, setActive] = useState();

  const [address, setAddress] = useState({
    saveAddressAs: "",
    completeAddress: "",
    flatNumber: "",
    nearestLandmark: "",
    status: 1,
    lat: "",
    lng: ""
  });

  const [addedAddress, addAddressError, addAddress] = usePostData();

  const [editedAddress, editAddressError, editAddress] = useUpdateData();

  useEffect(() => {
    setSlideGetAddress({
      transform: "translateY(0%)",
    });
  }, []);

  useEffect(() => {
    if (
      addedAddress != undefined &&
      addedAddress != null &&
      addedAddress != ""
    ) {
      props.setIsOpenChooseLocation(false);
      props.setIsOpenGetAddress(false);
      props.setIsOpenBookAddress(true);
      console.log(addedAddress);
    }
  }, [addedAddress]);

  useEffect(() => {
    if (
      editedAddress != undefined &&
      editedAddress != null &&
      editedAddress != ""
    ) {
      props.setIsOpenChooseLocation(false);
      props.setIsOpenGetAddress(false);
      props.setIsOpenBookAddress(true);
    }
  }, [editedAddress]);

  const back = () => {
    setSlideGetAddress({
      transform: "translateY(100%)",
    });
    setTimeout(() => {
      props.setIsOpenGetAddress(false);
    }, 1000);
  };

  const handleChange = (value) => {

    setActive(value)
    setAddress({
      ...address, saveAddressAs: value
    })
  }

  const handleClick = () => {

    if (props.isAddressForEdit) {
      editAddress({
        url: `${process.env.REACT_APP_API_URL}/app/userAddress/${props.AddressForEdit && props.AddressForEdit._id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: address,
      });
    }
    else {
      addAddress({
        url: `${process.env.REACT_APP_API_URL}/app/userAddress`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: address,
      });
    }
  };

  useEffect(() => {
    setAddress({
      ...address, lat: props.latlng.lat, lng: props.latlng.lng
    })

    if (props.isAddressForEdit && props.AddressForEdit) {
      if (props.AddressForEdit.saveAddressAs != "Home" && props.AddressForEdit.saveAddressAs != "Work" && props.AddressForEdit.saveAddressAs != "Hotel") {
        handleChange("Others")
      }
      else {
        handleChange(props.AddressForEdit.saveAddressAs)
      }
      setAddress({
        ...address,
        saveAddressAs: props.AddressForEdit.saveAddressAs,
        completeAddress: props.AddressForEdit.completeAddress,
        flatNumber: props.AddressForEdit.flatNumber,
        nearestLandmark: props.AddressForEdit.nearestLandmark,
        lat: props.latlng.lat,
        lng: props.latlng.lng
      })
    }

  }, [props])

  return (
    <div style={slideGetAddress} className="get-address d-grid">
      <div
        onClick={() => {
          back();
        }}
        className="cancel-container d-grid justify-content-center align-items-end h-100"
      >
        <button className="d-grid justify-content-center align-items-center">
          <img src="/assets/location/cancel.svg" alt="Cancel" />
        </button>
      </div>
      <div className="address-section-container bg-white">
        <div className="address-section">
          <div className="address-title">
            <p className="mb-0">Enter Complete Address</p>
          </div>
          <div className="address-type-section">
            <div className="title">
              <p className="mb-0">Save address as* </p>
            </div>
            {active === "Others" ? (
              <div className="other-address-type-container d-grid">
                <div className="others-button">
                  <button>Others</button>
                </div>

                <div className="other-input-container d-flex">
                  <input
                    onChange={(e) => {
                      setAddress({ ...address, saveAddressAs: e.target.value });
                    }}
                    className="border-0"
                    type="text"
                    placeholder="Save as"
                    value={address.saveAddressAs}
                  />
                  <button
                    onClick={() => {
                      handleChange("Home");
                    }}
                    className="border-0 d-grid justify-content-center align-items-center"
                  >
                    <img src="/assets/location/white_cancel.svg" alt="Cancel" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="address-type-container d-flex justify-content-between align-items-center w-100">
                <button
                  onClick={() => {
                    handleChange("Home");
                  }}
                  className={
                    active === "Home"
                      ? "active d-grid justify-content-center align-items-center"
                      : "d-grid justify-content-center align-items-center"
                  }
                >
                  Home
                </button>
                <button
                  onClick={() => {
                    handleChange("Work");
                  }}
                  className={
                    active === "Work"
                      ? "active d-grid justify-content-center align-items-center"
                      : "d-grid justify-content-center align-items-center"
                  }
                >
                  Work
                </button>
                <button
                  onClick={() => {
                    handleChange("Hotel");
                  }}
                  className={
                    active === "Hotel"
                      ? "active d-grid justify-content-center align-items-center"
                      : "d-grid justify-content-center align-items-center"
                  }
                >
                  Hotel
                </button>
                <button
                  onClick={() => {
                    handleChange("Others");
                  }}
                  className={
                    active === "Others"
                      ? "active d-grid justify-content-center align-items-center"
                      : "d-grid justify-content-center align-items-center"
                  }
                >
                  Others
                </button>
              </div>
            )}
          </div>
          <div className="complete-address-section">
            <div className="title">
              <p className="mb-0">Complete Address*</p>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setAddress({ ...address, completeAddress: e.target.value });
                }}
                type="text"
                placeholder="Complete Address"
                value={address.completeAddress}
              />
            </div>
          </div>
          <div className="floor-section">
            <div className="title">
              <p className="mb-0">Floor (Optional)*</p>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setAddress({ ...address, flatNumber: e.target.value });
                }}
                type="text"
                placeholder="Floor"
                value={address.flatNumber}
              />
            </div>
          </div>
          <div className="nearby-landmark-section">
            <div className="title">
              <p className="mb-0">Nearby Landmark (optional)*</p>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setAddress({ ...address, nearestLandmark: e.target.value });
                }}
                type="text"
                placeholder="Nearby Landmark"
                value={address.nearestLandmark}
              />
            </div>
          </div>
        </div>

        <div className="save-address">
          <button
            onClick={() => {
              handleClick();
            }}
            className="border-0"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetAddress;
