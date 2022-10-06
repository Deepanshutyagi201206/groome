import React, { useState, useEffect } from "react";

import { BiCurrentLocation } from "react-icons/bi";

import Autocomplete from "react-google-autocomplete";

import useGetData from "../../../../customhooks/getdata";

function SelectLocation(props) {
  const [slideSelectLocation, setSlideSelectLocation] = useState({});

  const [latlng, setLatlng] = useState({
    lat: "",
    lng: "",
  });

  const [gotCurrentAddress, currentAddressError, getCurrentAddress] =
    useGetData();

  useEffect(() => {
    if (latlng.lng && latlng.lng) {
      getCurrentAddress({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${latlng.lat},${latlng.lng}&key=AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc`,
        headers: {},
      });
    }
  }, [latlng.lat && latlng.lng]);

  const getcurrentlocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (coords) => {
        setLatlng({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getcurrentlocation();
  }, []);

  const back = () => {
    setSlideSelectLocation({
      transform: "translateY(100%)",
    });
    setTimeout(() => {
      props.closeSelectLocation();
    }, 1000);
  };

  const cancel = () => {
    setSlideSelectLocation({
      transform: "translateY(100%)",
    });
    setTimeout(() => {
      props.setIsOpenChange(false);
    }, 1000);
  };

  useEffect(() => {
    setSlideSelectLocation({
      transform: "translateY(0%)",
    });
  }, []);

  const handleClickUseCurrentLocation = () => {
    setSlideSelectLocation({
      transform: "translateY(100%)",
    });

    props.getLatlng(latlng.lat, latlng.lng);

    props.setIsOpenChooseLocation(true);

    setTimeout(() => {
      props.setIsOpenSelectLocation(false);

      if (props.setIsOpenChange) {
        props.setIsOpenChange(false);
      }
    }, 1000);
  };

  const placeSelected = (place) => {
    props.getLatlng(
      place.geometry.location.lat(),
      place.geometry.location.lng()
    );

    setSlideSelectLocation({
      transform: "translateY(100%)",
    });

    props.setIsOpenChooseLocation(true);

    setTimeout(() => {
      props.setIsOpenSelectLocation(false);

      if (props.setIsOpenChange) {
        props.setIsOpenChange(false);
      }
    }, 1000);
  };

  return (
    <div style={slideSelectLocation} className="select-location h-100">
      {props.isOpenChange ? (
        <div className="header-container d-flex align-items-center">
          <div>
            <button
              onClick={() => {
                cancel();
              }}
              className="border-0 bg-white"
            >
              <img src="/assets/common/down.svg" alt="Down" />
            </button>
          </div>
          <div className="w-100 text-center">
            <p className="mb-0">Change Location</p>
          </div>
        </div>
      ) : (
        <div className="header-container d-flex align-items-center">
          <div>
            <button
              onClick={() => {
                back();
              }}
              className="border-0 bg-white"
            >
              <img src="/assets/common/down.svg" alt="Down" />
            </button>
          </div>
          <div className="w-100 text-center">
            <p className="mb-0">Select a Location</p>
          </div>
        </div>
      )}

      <div className="search-usecurrent-location-container">
        <div className="search-container">
          <div className="search d-flex justify-content-start align-items-center">
            <Autocomplete
              placeholder="Search locality, city name...."
              apiKey={"AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc"}
              onPlaceSelected={(place) => {
                placeSelected(place);
              }}
              options={{
                types: ["(regions)"]
                // componentRestrictions: { country: "ru" },
              }}
            />
            <img src="/assets/common/search_icon.svg" alt="Search" />
          </div>
        </div>

        <div className="usecurrent-location-container">
          <div
            className="sub-usecurrent-location-container w-100 d-flex justify-content-between align-items-center"
            onClick={() => {
              handleClickUseCurrentLocation();
            }}
          >
            <div className="usecurrent-location d-flex">
              <div className="location-icon d-grid">
                <BiCurrentLocation />
              </div>
              <div>
                <p className="location-text text-start">Use Current location</p>
                <p className="location text-start mb-0">
                  {gotCurrentAddress &&
                    gotCurrentAddress.data.results[0].formatted_address}
                </p>
              </div>
            </div>
            <div className="right-image">
              <button className="border-0 bg-white">
                <img src="/assets/common/purple_right.svg" alt="Right" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectLocation;
