import React, { useEffect, useState } from "react";

import useGetData from "../../../customhooks/getdata";
import useUpdateData from "../../../customhooks/updatedata";
import useIsLoader from "../../../customhooks/useisloader";
import useUserId from "../../../customhooks/getuserid";
import Loader from "../../loader";
import NotFound from "../../notfound";
import DeleteAddress from "./deleteaddress";

import { RWebShare } from "react-web-share";

function BookAddress(props) {
  const [slideBookAddress, setSlideBookAddress] = useState({});

  const [isDeleteAddress, setIsDeleteAddress] = useState(false);

  const [isLoader, setIsLoader] = useIsLoader(true);

  const [userId, userError] = useUserId();

  const [gotAddress, addressError, getAddress] = useGetData();

  const [savedDeliveryAddress, saveDeliveryError, saveDeliveryAddress] = useUpdateData();

  const [addressId, setAddressId] = useState("")

  useEffect(() => {
    if (userId != undefined && userId != null && userId != "") {
      getAddress({
        url: `${process.env.REACT_APP_API_URL}/app/userAddress/search?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    setSlideBookAddress({
      transform: "translateX(0%)",
    });
  }, []);

  const back = () => {
    setSlideBookAddress({
      transform: "translateX(100%)",
    });
    setTimeout(() => {
      props.closeAddressPage();
    }, 1000);
  };

  const openChooseLocation = () => {
    props.setIsAddressForEdit(false)
    props.setIsOpenChooseLocation(true);

    setSlideBookAddress({
      transform: "translateX(100%)",
    });
    setTimeout(() => {
      props.setIsOpenBookAddress(false)
    }, 1000);
  };

  const handleClickEditAddress = (address) => {
    props.getEditAddress(address)
    props.setIsOpenChooseLocation(true);

    setSlideBookAddress({
      transform: "translateX(100%)",
    });
    setTimeout(() => {
      props.setIsOpenBookAddress(false)
    }, 1000);
  };

  useEffect(() => {
    if (gotAddress != undefined && gotAddress != null && gotAddress != "") {
      setIsLoader(false);
    }
  }, [gotAddress]);

  const handleClickSetDeliveryAddress = (addressId) => {
    saveDeliveryAddress({
      url: `${process.env.REACT_APP_API_URL}/app/userAddress/${addressId}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: {
        status: 1,
        isDefault: true,
      },
    });
  };

  const handleClickDeleteAddress = (addId) => {
    setAddressId(addId)
    setIsDeleteAddress(true)
  };

  useEffect(() => {
    if (
      savedDeliveryAddress != undefined &&
      savedDeliveryAddress != null &&
      savedDeliveryAddress != ""
    ) {
      if (props.getAddress) {
        props.getAddress({
          url: `${process.env.REACT_APP_API_URL}/app/userAddress/search?user=${userId.data.id}`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
      back();
    }
  }, [savedDeliveryAddress]);

  return (
    <>
      <div style={slideBookAddress} className="book-address d-grid">
        <div className="">
          <div className="header-container d-flex align-items-center">
            <div>
              <button
                onClick={() => {
                  back();
                }}
                className="border-0 bg-white"
              >
                <img src="/assets/common/back.svg" alt="Down" />
              </button>
            </div>
            <div className="w-100 text-center">
              <p className="mb-0">Address Book</p>
            </div>
          </div>

          <div className="add-address d-flex align-items-center">
            <button
              onClick={() => {
                openChooseLocation();
              }}
              className="border-0"
            >
              <img src="/assets/common/plus.svg" alt="Plus" />
            </button>
            <p className="mb-0">Add Address</p>
          </div>
        </div>
        {isLoader ? (
          <Loader width={60} height={60} color={"#772286"} />
        ) : (
          <>
            {gotAddress && gotAddress.data && gotAddress.data.userAddresses.length > 0 ? <div>
              {gotAddress && gotAddress.data && gotAddress.data.userAddresses.map((item) => {
                return (
                  <div key={item.id} className="address-container-section">
                    <div
                      onClick={() => {
                        handleClickSetDeliveryAddress(item._id);
                      }}
                      className="address-container d-flex"
                    >
                      <div className="address-image">
                        <img src={item.saveAddressAs == "Home" ? "/assets/common/home.svg" : item.saveAddressAs == "Work" ? "/assets/address/briefcase.svg" : "/assets/common/home.svg"} alt="Home" />
                      </div>
                      <div className="">
                        <p className="address-as mb-0">{item.saveAddressAs}</p>
                        <p className="address">{item.completeAddress}</p>
                      </div>
                    </div>
                    <div className="functionality-container d-flex">
                      <button
                        onClick={() => {
                          handleClickEditAddress(item)
                        }}
                        className="d-grid justify-content-center align-items-center"
                      >
                        <img src="/assets/common/edit.svg" alt="Edit" />
                      </button>
                      <button
                        onClick={() => {
                          handleClickDeleteAddress(item._id);
                        }}
                        className="d-grid justify-content-center align-items-center"
                      >
                        <img src="/assets/location/delete.svg" alt="Delete" />
                      </button>
                      <RWebShare data={{
                        text: "",
                        url: "",
                        title: "Share",
                      }}>
                        <button className="d-grid justify-content-center align-items-center">
                          <img src="/assets/common/share.svg" alt="Share" />
                        </button>
                      </RWebShare>

                    </div>
                  </div>
                );
              })}
            </div> : <NotFound />
            }
          </>
        )}
      </div>

      {
        isDeleteAddress ? <DeleteAddress addressId={addressId} getAddress={getAddress} fromParent={props.getAddress ? props.getAddress : ""} setIsDeleteAddress={setIsDeleteAddress} /> : ""
      }
    </>
  );
}

export default BookAddress;
