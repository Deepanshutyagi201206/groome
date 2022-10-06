import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import GetAddress from "../getaddress";

import useGetData from "../../../customhooks/getdata";
import SelectLocation from "../selectlocation";

function ChooseLocation(props) {
  const [isOpenGetAddress, setIsOpenGetAddress] = useState(false);

  const [city, setCity] = useState("");

  const [slideChooseLocation, setSlideChooseLocation] = useState({});

  const [gotAddress, AddressError, getAddress] = useGetData();

  const [isOpenChange, setIsOpenChange] = useState(false);

  useEffect(() => {
    setSlideChooseLocation({
      transform: "translateY(0%)",
    });
  }, []);

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
    props.setIsOpenBookAddress(true);

    setSlideChooseLocation({
      transform: "translateY(100%)",
    });
    setTimeout(() => {
      props.setIsOpenChooseLocation(false);
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

  useEffect(() => {
    if (props.isAddressForEdit) {
      setLatlng({
        lat: props.AddressForEdit.lat,
        lng: props.AddressForEdit.lng,
      });
    }
    else {
      setLatlng({
        lat: sessionStorage.getItem("lat"),
        lng: sessionStorage.getItem("lng"),
      });
    }
  }, [props]);

  return (
    <>
      <div style={slideChooseLocation} className="choose-location d-grid">
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
            lat: 40.854885,
            lng: 88.081807,
          }}
          center={{
            lat: 40.854885,
            lng: 88.081807,
          }}
          disableDefaultUI={true}
        >
          <Marker position={{ lat: 40.854885, lng: 88.081807 }} />
        </Map>
        <div className="bg-white d-flex flex-column justify-content-between">
          <div className="current-location-container w-100 border-0 d-flex justify-content-between">
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
                  setIsOpenChange(true);
                }}
                className="border-0"
              >
                CHANGE
              </button>
            </div>
          </div>
          <div className="enter-complete-address">
            <button
              onClick={() => {
                setIsOpenGetAddress(true);
              }}
              className="border-0"
            >
              Enter Complete Address
            </button>
          </div>
        </div>
      </div>
      {isOpenGetAddress ? (
        <GetAddress
          latlng={latlng}
          AddressForEdit={props.AddressForEdit}
          isAddressForEdit={props.isAddressForEdit}
          setIsOpenBookAddress={props.setIsOpenBookAddress}
          setIsOpenChooseLocation={props.setIsOpenChooseLocation}
          setIsOpenGetAddress={setIsOpenGetAddress}
        />
      ) : (
        ""
      )}

      {isOpenChange ? (
        <SelectLocation
          setLatlng={setLatlng}
          setIsOpenChange={setIsOpenChange}
        />
      ) : (
        ""
      )}
    </>
  );
}

const LoadingContainer = () => <div></div>;

export default GoogleApiWrapper({
  apiKey: "AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc",
  LoadingContainer: LoadingContainer,
})(ChooseLocation);
