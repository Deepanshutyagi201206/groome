import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

import useGetData from "../../../../customhooks/getdata";

function ChooseLocation(props) {
  const [slideChooseLocation, setSlideChooseLocation] = useState({});

  const [city, setCity] = useState("");

  const [gotAddress, AddressError, getAddress] = useGetData();

  const [latlng, setLatlng] = useState({
    lat: "",
    lng: "",
  });

  useEffect(() => {
    if (latlng.lng && latlng.lng) {
      getAddress({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${latlng.lat},${latlng.lng}&key=AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc`,
        headers: {},
      });
    }
  }, [latlng.lat && latlng.lng]);

  const back = () => {
    setSlideChooseLocation({
      transform: "translateX(100%)",
    });

    props.setIsOpenSelectLocation(true);

    setTimeout(() => {
      props.setIsOpenChooseLocation(false);
    }, 1000);
  };

  useEffect(() => {
    setSlideChooseLocation({
      transform: "translateX(0%)",
    });
  }, []);

  useEffect(() => {
    setLatlng({
      lat: props.latlng.lat,
      lng: props.latlng.lng,
    });
  }, [props]);

  const confirm = () => {

    sessionStorage.setItem("isConfirm", true)

    props.getLatlng({
      latlng,
    });

    setSlideChooseLocation({
      transform: "translateX(100%)",
    });
    setTimeout(() => {
      props.setIsOpenChooseLocation(false);
      props.closeSelectLocation();
    }, 1000);
  };

  useEffect(() => {
    gotAddress &&
      gotAddress.data.results &&
      gotAddress.data.results.forEach((addresses) => {
        addresses.address_components.forEach((address) => {
          address.types.forEach((item) => {
            if (item === "locality") {
              setCity(address.long_name);
            }
          });
        });
      });
  }, [gotAddress]);

  return (

    <div style={slideChooseLocation} className="choose-location d-grid h-100">
      <div className="header-container d-flex align-items-center">
        <div>
          <button
            onClick={() => {
              back();
            }}
            className="border-0 bg-white"
          >
            <img src="/assets/common/back.svg" alt="Back" />
          </button>
        </div>
        <div className="w-100 text-center">
          <p className="mb-0">Choose Location</p>
        </div>
      </div>
      <Map
        className="map"
        google={window.google}
        zoom={11}
        initialCenter={{
          lat: latlng.lat,
          lng: latlng.lng,
        }}
        center={{
          lat: latlng.lat,
          lng: latlng.lng,
        }}
        disableDefaultUI={true}
      >
        <Marker position={{ lat: latlng.lat, lng: latlng.lng }} />
      </Map>
      <div>
        <div className="current-location-container w-100 border-0 d-flex justify-content-between bg-white">
          <div className="current-location d-flex ">
            <div className="location-icon d-grid">
              <img src="/assets/location/marker.svg" />
            </div>
            <div>
              <p className="location-text text-start">{city}</p>
              <p className="location text-start mb-0">
                {gotAddress && gotAddress.data.results[0].formatted_address}
              </p>
            </div>
          </div>
          <div className="change">
            <button
              onClick={() => {
                props.setIsOpenChange(true);
              }}
              className="border-0"
            >
              CHANGE
            </button>
          </div>
        </div>
        <div className="confirm-location">
          <button
            onClick={() => {
              confirm();
            }}
            className="d-grid justify-content-center align-items-center border-0"
          >
            Confirm Location
          </button>
        </div>
      </div>
    </div>
  );
}

const LoadingContainer = () => <div></div>;

export default GoogleApiWrapper({
  apiKey: "AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc",
  LoadingContainer: LoadingContainer,
})(ChooseLocation);
