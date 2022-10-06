import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";

import useUpdateData from "../../../customhooks/updatedata";

import useUserId from "../../../customhooks/getuserid";

import { useEffect } from "react";

function Service(props) {
  const [addedService, addedServicesError, addService] = useUpdateData();

  const [removedService, removedServicesError, removeService] = useUpdateData();

  const [addedGenericService, addedGenericServicesError, addGenericService] = useUpdateData();

  const [removedGenericService, removedGenericServicesError, removeGenericService] = useUpdateData();

  const [userId, userError] = useUserId(false);

  const [serviceId, setServiceId] = useState([])

  const decreaseServiceCount = (item) => {
    if (userId) {
      if (item.count > 1) {
        addService({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?service=${item.service._id
            }&count=${item.count - 1}}&itemType=service&serviceType=${props.gotCartList.data.cart.serviceType
            }`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      } else {
        removeService({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/remove?service=${item.service._id}&itemType=service&serviceType=${props.gotCartList.data.cart.serviceType}`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      }
    }

    if (userError) {
      if (item.count > 1) {
        addGenericService({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?service=${item.service._id
            }&count=${item.count - 1}}&itemType=service&serviceType=${props.gotGenericCart.data.genericCart.serviceType
            }`,
          headers: {},
          body: {},
        });
      } else {
        removeGenericService({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/remove?service=${item.service._id}&itemType=service`,
          headers: {},
          body: {},
        });
      }
    }
  };

  const increaseServiceCount = (item) => {
    if (userId) {
      addService({
        url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?service=${item.service._id
          }&count=${item.count + 1}&itemType=service&serviceType=${props.gotCartList.data.cart.serviceType
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }

    if (userError) {
      addGenericService({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?service=${item.service._id
          }&count=${item.count + 1}&itemType=service&serviceType=${props.gotGenericCart.data.genericCart.serviceType
          }`,
        headers: {},
        body: {},
      });
    }
  };

  const removeServiceFromCart = (item) => {
    if (userId) {
      removeService({
        url: `${process.env.REACT_APP_API_URL}/app/cart/item/remove?service=${item.service._id}&itemType=service&serviceType=${props.gotCartList.data.cart.serviceType}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }
    if (userError) {
      removeGenericService({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/remove?service=${item.service._id}&itemType=service`,
        headers: {},
        body: {},
      });
    }
  };

  useEffect(() => {
    if (
      (addedService != undefined &&
        addedService != null &&
        addedService != "") ||
      (removedService != undefined &&
        removedService != null &&
        removedService != "")
    ) {
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [addedService, removedService]);

  useEffect(() => {
    if (
      (addedGenericService != undefined &&
        addedGenericService != null &&
        addedGenericService != "") ||
      (removedGenericService != undefined &&
        removedGenericService != null &&
        removedGenericService != "")
    ) {
      props.getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });
    }
  }, [addedGenericService, removedGenericService]);

  const handleClickReadLess = (id) => {
    setServiceId(serviceId.filter((item) => {
      return item != id
    }))
  }

  return (
    <>
      {userId && props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.services && props.gotCartList.data.cart.services.length>0 && props.gotCartList.data.cart.services.map((item) => {
        return (
          <div key={item._id} className="item-container bg-white">
            <div className="item d-flex justify-content-between">
              <div className="d-flex">
                <div className="item-image">
                  <img
                    src={item.service.image ? `${process.env.REACT_APP_IMAGE_URL}${item.service.image}` : "/assets/salon/service.png"}
                    alt="Image"
                  />
                </div>
                <div className="item-info">
                  <p className="name">{item.service.name}</p>
                  <p className="description">
                    {
                      item.service.description.length > 60 ? <>{serviceId.includes(item.service._id) ? <>{item.service.description}<button onClick={() => { handleClickReadLess(item.service._id) }} className="border-0">....read less</button></> : <>{item.service.description.substring(0, 60)}<button onClick={() => { setServiceId((prev) => [...prev, item.service._id]) }} className="border-0">....read more</button></>}</> : item.service.description
                    }

                  </p>
                  <p className="time d-flex justify-content-start align-items-center mb-0">
                    <AiOutlineClockCircle />
                    <span>{item.service.duration} mins</span>
                  </p>
                </div>
              </div>
              <div className="close">
                <button
                  onClick={() => {
                    removeServiceFromCart(item);
                  }}
                  className="border-0"
                >
                  <CgClose />
                </button>
              </div>
            </div>
            <div className="quantity-container d-flex justify-content-between align-items-center">
              <div className="quantity d-flex align-items-center">
                <div>
                  <p className="text mb-0">Quantity:</p>
                </div>
                <div className="increase-decrease d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => {
                      decreaseServiceCount(item);
                    }}
                    className="border-0"
                  >
                    -
                  </button>
                  <p className="mb-0">{item.count}</p>
                  <button
                    onClick={() => {
                      increaseServiceCount(item);
                    }}
                    className="border-0"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex">
                {props.gotCartList.data.cart.serviceType === "At Home" ? (
                  <>
                    {item.service.homeDiscountPrice > 0 ? (
                      <>
                        <p className="price mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.homeDiscountPrice * item.count}
                        </p>
                        <p className="cut mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.homeMrp * item.count}
                        </p>
                      </>
                    ) : (
                      <p className="price mb-0">
                        {String.fromCharCode(item.service.currencySymbol)}
                        {item.service.homeMrp * item.count}
                      </p>
                    )}
                  </>
                ) : props.gotCartList.data.cart.serviceType === "At Salon" ? (
                  <>
                    {item.service.salonDiscountPrice > 0 ? (
                      <>
                        <p className="price mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.salonDiscountPrice * item.count}
                        </p>
                        <p className="cut mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.salonMrp * item.count}
                        </p>
                      </>
                    ) : (
                      <p className="price mb-0">
                        {String.fromCharCode(item.service.currencySymbol)}
                        {item.service.salonMrp * item.count}
                      </p>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}

      {userError && props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.services && props.gotGenericCart.data.genericCart.services.length>0 && props.gotGenericCart.data.genericCart.services.map((item) => {
        return (
          <div key={item._id} className="item-container bg-white">
            <div className="item d-flex justify-content-between">
              <div className="d-flex">
                <div className="item-image">
                  <img
                    src={item.service.image ? `${process.env.REACT_APP_IMAGE_URL}${item.service.image}` : "/assets/salon/service.png"}
                    alt="Image"
                  />
                </div>
                <div className="item-info">
                  <p className="name">{item.service.name}</p>
                  <p className="description">
                    {
                      item.service.description.length > 60 ? <>{serviceId.includes(item.service._id) ? <>{item.service.description}<button onClick={() => { handleClickReadLess(item.service._id) }} className="border-0">....read less</button></> : <>{item.service.description.substring(0, 60)}<button onClick={() => { setServiceId((prev) => [...prev, item.service._id]) }} className="border-0">....read more</button></>}</> : item.service.description
                    }

                  </p>
                  <p className="time d-flex justify-content-start align-items-center mb-0">
                    <AiOutlineClockCircle />
                    <span>{item.service.duration} mins</span>
                  </p>
                </div>
              </div>
              <div className="close">
                <button
                  onClick={() => {
                    removeServiceFromCart(item);
                  }}
                  className="border-0"
                >
                  <CgClose />
                </button>
              </div>
            </div>
            <div className="quantity-container d-flex justify-content-between align-items-center">
              <div className="quantity d-flex align-items-center">
                <div>
                  <p className="text mb-0">Quantity:</p>
                </div>
                <div className="increase-decrease d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => {
                      decreaseServiceCount(item);
                    }}
                    className="border-0"
                  >
                    -
                  </button>
                  <p className="mb-0">{item.count}</p>
                  <button
                    onClick={() => {
                      increaseServiceCount(item);
                    }}
                    className="border-0"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="d-flex">
                {props.gotGenericCart.data.genericCart.serviceType === "At Home" ? (
                  <>
                    {item.service.homeDiscountPrice > 0 ? (
                      <>
                        <p className="price mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.homeDiscountPrice * item.count}
                        </p>
                        <p className="cut mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.homeMrp * item.count}
                        </p>
                      </>
                    ) : (
                      <p className="price mb-0">
                        {String.fromCharCode(item.service.currencySymbol)}
                        {item.service.homeMrp * item.count}
                      </p>
                    )}
                  </>
                ) : props.gotGenericCart.data.genericCart.serviceType === "At Salon" ? (
                  <>
                    {item.service.salonDiscountPrice > 0 ? (
                      <>
                        <p className="price mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.salonDiscountPrice * item.count}
                        </p>
                        <p className="cut mb-0">
                          {String.fromCharCode(item.service.currencySymbol)}
                          {item.service.salonMrp * item.count}
                        </p>
                      </>
                    ) : (
                      <p className="price mb-0">
                        {String.fromCharCode(item.service.currencySymbol)}
                        {item.service.salonMrp * item.count}
                      </p>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Service;
