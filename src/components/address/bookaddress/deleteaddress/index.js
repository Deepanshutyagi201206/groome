import React from "react";
import { useEffect } from "react";

import useDeleteData from "../../../../customhooks/deletedata";
import useUserId from "../../../../customhooks/getuserid";

function DeleteAddress(props) {

  const [deletedAddress, deleteAddressError, deleteAddress] = useDeleteData();

  const [userId, userError] = useUserId();

  const handleClickDeleteAddress = () => {
    deleteAddress({
      url: `${process.env.REACT_APP_API_URL}/app/userAddress/${props.addressId}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  useEffect(() => {
    if (
      deletedAddress != undefined &&
      deletedAddress != null &&
      deletedAddress != ""
    ) {
      props.getAddress({
        url: `${process.env.REACT_APP_API_URL}/app/userAddress/search?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (props.fromParent) {
        props.fromParent({
          url: `${process.env.REACT_APP_API_URL}/app/userAddress/search?user=${userId.data.id}`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }

      props.setIsDeleteAddress(false)
    }
  }, [deletedAddress]);

  return (
    <div className="delete-address-container d-flex justify-content-center align-items-center">
      <div className="delete-address-section d-flex flex-column justify-content-center align-items-center">
        <p className="mb-0 message text-center">Are you sure you want to delete
          this address?</p>
        <div className="d-flex justify-content-between align-items-center w-100">
          <button
            onClick={() => {
              props.setIsDeleteAddress(false)
            }}
            className="no"
          >
            No
          </button>
          <button
            onClick={() => {
              handleClickDeleteAddress()
            }}
            className="yes"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteAddress;
