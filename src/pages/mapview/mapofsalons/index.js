import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";

function MapOfSalons(props) {

  const navigate = useNavigate()

  const [latlng, setLatlng] = useState({
    lat: "",
    lng: "",
  });

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
    setLatlng({
      lat: sessionStorage.getItem("lat"),
      lng: sessionStorage.getItem("lng"),
    })
  }, [])

  return (
    <>
      <div className="back-container">
        <button onClick={() => { navigate(-1) }} className="d-flex justify-content-center align-items-center">
          <CgClose />
        </button>
      </div>
      <Map
        className="map"
        google={window.google}
        zoom={5}
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
        <Marker
          position={{
            lat: latlng.lat,
            lng: latlng.lng,
          }}
        >
        </Marker>
        {props.location.map((item) => {
          return (
            <Marker
              // label={item.name}
              key={item._id}
              onClick={() => {
                props.scrolltosalon(item._id);
              }}
              position={{
                lat: parseFloat(item.location.lat),
                lng: parseFloat(item.location.lng),
              }}
            >
            </Marker>
          );
        })}
      </Map>
      <div className="currentlocation">
        <button onClick={() => { getcurrentlocation() }}>
          <BiCurrentLocation />
        </button>
      </div>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc",
})(MapOfSalons);
