import { useEffect, useState, useCallback } from "react";
import ChooseLocation from "./chooselocation";
import SelectLocation from "./selectlocation";
import BookAddress from "./bookaddress";
import React from "react";

function Address(props) {
  const [isOpenChooseLocation, setIsOpenChooseLocation] = useState(false);

  const [isOpenBookAddress, setIsOpenBookAddress] = useState(true);

  const [AddressForEdit, setAddressForEdit] = useState("")

  const [isAddressForEdit, setIsAddressForEdit] = useState(false)

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";
  })

  useEffect(() => {
    return callback
  }, [])

  const getEditAddress = (address) => {
    setAddressForEdit(address)
    setIsAddressForEdit(true)
  }

  return (
    <div className="address-page h-100">
      {isOpenChooseLocation ? (
        <ChooseLocation
          AddressForEdit={AddressForEdit}
          isAddressForEdit={isAddressForEdit}
          setIsOpenChooseLocation={setIsOpenChooseLocation}
          setIsOpenBookAddress={setIsOpenBookAddress}
        />
      ) : (
        ""
      )}
      {isOpenBookAddress ? (
        <BookAddress
          setIsProceed={props.setIsProceed}
          setIsAddressForEdit={setIsAddressForEdit}
          getEditAddress={getEditAddress}
          getAddress={props.getAddress}
          setIsOpenBookAddress={setIsOpenBookAddress}
          closeAddressPage={props.closeAddressPage}
          setIsOpenChooseLocation={setIsOpenChooseLocation}
        />
      ) : (
        ""
      )}


    </div>
  );
}

export default Address;
