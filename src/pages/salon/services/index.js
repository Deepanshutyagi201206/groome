import React, { useEffect, useState } from "react";

import Rating from "../../../components/rating";
import useUpdateData from "../../../customhooks/updatedata";
import useUserId from "../../../customhooks/getuserid";

function Services(props) {
  const [addedService, addedServicesError, addService] = useUpdateData();

  const [addedGenericService, addedGenericServicesError, addGenericService] = useUpdateData();

  const [removedService, removedServicesError, removeService] = useUpdateData();

  const [removedGenericService, removedGenericServicesError, removeGenericService] = useUpdateData();

  const [userId, userError] = useUserId();

  const [serviceId, setServiceId] = useState([])

  const decreaseCount = (item) => {
    if (userId) {
      if (item.cartService.count > 1) {
        addService({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?service=${item._id
            }&count=${item.cartService.count - 1}&itemType=service&serviceType=${props.filterName === "SALON AT HOME"
              ? "At Home"
              : props.filterName === "SALON"
                ? "At Salon"
                : ""
            }`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      } else {
        removeService({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/remove?service=${item._id
            }&itemType=service&serviceType=${props.filterName === "SALON AT HOME"
              ? "At Home"
              : props.filterName === "SALON"
                ? "At Salon"
                : ""
            }`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      }
    }
    if (userError) {
      if (item.cartService.count > 1) {
        addGenericService({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?service=${item._id
            }&count=${item.cartService.count - 1}&itemType=service&serviceType=${props.filterName === "SALON AT HOME"
              ? "At Home"
              : props.filterName === "SALON"
                ? "At Salon"
                : ""
            }`,
          headers: {},
          body: {},
        });
      } else {
        removeGenericService({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/remove?service=${item._id
            }&itemType=service`,
          headers: {},
          body: {},
        });
      }
    }

  };

  const increaseCount = (item) => {
    if(userId){
      addService({
        url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?service=${item._id
          }&count=${item.cartService ? item.cartService.count + 1 : 1
          }&itemType=service&serviceType=${props.filterName === "SALON AT HOME"
            ? "At Home"
            : props.filterName === "SALON"
              ? "At Salon"
              : ""
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }
    if(userError){
      addGenericService({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?service=${item._id
          }&count=${item.cartService ? item.cartService.count + 1 : 1
          }&itemType=service&serviceType=${props.filterName === "SALON AT HOME"
            ? "At Home"
            : props.filterName === "SALON"
              ? "At Salon"
              : ""
          }`,
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
    )
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId && userId.data.id
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  }, [addedService, removedService]);

  useEffect(() => {
    if (
      (addedGenericService != undefined &&
        addedGenericService != null &&
        addedGenericService != "") ||
      (removedGenericService != undefined &&
        removedGenericService != null &&
        removedGenericService != "")
    )
      props.getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });
  }, [addedGenericService, removedGenericService]);

  const handleClickForMessage = () => {
    props.setPopUpMessage("Sorry! This salon is not accepting orders.");
    props.setIsPopUp(true);
  }

  const handleClickReadLess = (id) => {
    setServiceId(serviceId.filter((item) => {
      return item != id
    }))
  }

  return (
    <div className="services-container ">
      {props.categoryName ? (
        <div className="title-container">
          <p className="mb-0">{props.categoryName}</p>
        </div>
      ) : (
        ""
      )}
      <div className="services">
        {props.services && props.services.length > 0 ? (
          <>
            {props.services.map((item) => {
              return (
                <div
                  key={item._id}
                  className="service d-flex justify-content-between aling-items-center"
                >
                  <div className="service-info d-flex flex-column">
                    <p className="service-name mb-0">{item.name}</p>
                    <p className="category-name mb-0">
                      {item.category && item.category.name}
                    </p>
                    <div className="star-rating-container">
                      <Rating rating={item.rating} />
                    </div>

                    <div className="prices-container d-flex align-items-center">
                      {props.filterName === "SALON AT HOME" ? (
                        <>
                          {item.homeDiscountPrice > 0 ? (
                            <>
                              <p className="price mb-0">
                                {String.fromCharCode(item.currencySymbol)}
                                {item.homeDiscountPrice}
                              </p>
                              <p className="cut mb-0">
                                {String.fromCharCode(item.currencySymbol)}
                                {item.homeMrp}
                              </p>
                            </>
                          ) : (
                            <p className="price mb-0">
                              {String.fromCharCode(item.currencySymbol)}
                              {item.homeMrp}
                            </p>
                          )}
                        </>
                      ) : props.filterName === "SALON" ? (
                        <>
                          {item.salonDiscountPrice > 0 ? (
                            <>
                              <p className="price mb-0">
                                {String.fromCharCode(item.currencySymbol)}
                                {item.salonDiscountPrice}
                              </p>
                              <p className="cut mb-0">
                                {String.fromCharCode(item.currencySymbol)}
                                {item.salonMrp}
                              </p>
                            </>
                          ) : (
                            <p className="price mb-0">
                              {String.fromCharCode(item.currencySymbol)}
                              {item.salonMrp}
                            </p>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                    <p className="description mb-0">
                      {item.description.length > 60 ? <>{serviceId.includes(item._id) ? <>{item.description}<button onClick={() => { handleClickReadLess(item._id) }} className="border-0">....read less</button></> : <>{item.description.substring(0, 60)}<button onClick={() => { setServiceId((prev) => [...prev, item._id]) }} className="border-0">....read more</button></>}</> : item.description}

                    </p>
                  </div>
                  <div className="service-image">
                    <div>
                      <img

                        src={item.image ? `${process.env.REACT_APP_IMAGE_URL}${item.image}` : "/assets/salon/service.png"}
                        alt="Service"
                      />
                    </div>

                    {item.cartService ? (
                      <div className="add-remove-service d-flex justify-content-between align-items-center">
                        <button
                          onClick={() => {
                            decreaseCount(item);
                          }}
                          className="border-0"
                        >
                          -
                        </button>
                        <p className="number-of-service mb-0">
                          {item.cartService.count}
                        </p>
                        <button
                          onClick={() => {
                            increaseCount(item);
                          }}
                          className="border-0"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        className="add-service"
                        onClick={() => {
                          { props.salon && props.salon.data.salon.isAcceptingOrder ? increaseCount(item) : handleClickForMessage() }
                        }}
                      >
                        ADD+
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="message">
            <p className="mb-0">No Services</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Services;
