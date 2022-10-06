import { useEffect, useState } from "react";
import ChooseLocation from "./chooselocation";
import SelectLocation from "./selectlocation";
import React from "react";

function Location(props) {
  const [isOpenChooseLocation, setIsOpenChooseLocation] = useState(false);

  const [isOpenSelectLocation, setIsOpenSelectLocation] = useState(true);

  const [isOpenChange, setIsOpenChange] = useState(false);

  const [latlng, setLatlng] = useState({
    lat: "",
    lng: "",
  });

  const getLatlng = (lat, lng) => {
    setLatlng({
      lat: lat,
      lng: lng,
    });
  };

  return (
    <div className="location-page h-100">
      {isOpenChooseLocation ? (
        <ChooseLocation
          getLatlng={props.getLatlng}
          latlng={latlng}
          setIsOpenChange={setIsOpenChange}
          setIsOpenSelectLocation={setIsOpenSelectLocation}
          closeSelectLocation={props.closeSelectLocation}
          setIsOpenChooseLocation={setIsOpenChooseLocation}
        />
      ) : (
        ""
      )}
      {isOpenSelectLocation ? (
        <SelectLocation
          getLatlng={getLatlng}
          setIsOpenSelectLocation={setIsOpenSelectLocation}
          setIsOpenChooseLocation={setIsOpenChooseLocation}
          closeSelectLocation={props.closeSelectLocation}
        />
      ) : (
        ""
      )}

      {isOpenChange ? (
        <div className="change-location-page">
          <SelectLocation
            getLatlng={getLatlng}
            setIsOpenChange={setIsOpenChange}
            isOpenChange={isOpenChange}
            setIsOpenSelectLocation={setIsOpenSelectLocation}
            setIsOpenChooseLocation={setIsOpenChooseLocation}
            closeSelectLocation={props.closeSelectLocation}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Location;
