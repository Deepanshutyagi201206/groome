import React, { useEffect, useState } from "react";

import useUserId from "../../../customhooks/getuserid";

function Filter(props) {

  const [activeFilter, setActiveFilter] = useState();

  const [userId, userError] = useUserId();

  const filter = (value) => {
    setActiveFilter(value);
    props.setFilterName(value);
  };

  useEffect(() => {
    if (userId) {
      if (
        props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.serviceType ===
        "At Salon"
      ) {
        filter("SALON");
      } else if (
        props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.serviceType ===
        "At Home"
      ) {
        filter("SALON AT HOME");
      } else {
        filter("SALON AT HOME");
      }
    }

    if (userError) {
      if (
        props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.serviceType ===
        "At Salon"
      ) {
        filter("SALON");
      } else if (
        props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.serviceType ===
        "At Home"
      ) {
        filter("SALON AT HOME");
      } else {
        filter("SALON AT HOME");
      }
    }

  }, [userId, userError]);

  const handleClickForMessage = (value) => {
    props.setPopUpMessage("Sorry! Please remove items from cart to add items for" + " " + value);
    props.setIsPopUp(true);
  }

  return (
    <>
      <div className="filter-container">
        <div className="filters d-grid align-items-center">
          <button
            onClick={() => {
              props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems > 0 ? props.gotGenericCart.data.genericCart.serviceType && props.gotGenericCart.data.genericCart.serviceType === "At Salon" ? handleClickForMessage("Home.") : filter("SALON AT HOME") : props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems > 0 && props.gotCartList.data.cart.serviceType && props.gotCartList.data.cart.serviceType === "At Salon" ? handleClickForMessage("Home.") : filter("SALON AT HOME")

            }}
            className={
              activeFilter === "SALON AT HOME"
                ? "active border-0 h-100"
                : "border-0 h-100"
            }
          >
            SALON AT HOME
          </button>
          <button
            onClick={() => {
              props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems > 0 ? props.gotGenericCart.data.genericCart.serviceType && props.gotGenericCart.data.genericCart.serviceType === "At Home" ? handleClickForMessage("Salon.") : filter("SALON") : props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems > 0 && props.gotCartList.data.cart.serviceType && props.gotCartList.data.cart.serviceType === "At Home" ? handleClickForMessage("Salon.") : filter("SALON")
            }}
            className={
              activeFilter === "SALON"
                ? "active border-0 h-100"
                : "border-0 h-100"
            }
          >
            SALON
          </button>
          <button
            onClick={() => {
              filter("PRODUCTS");
            }}
            className={
              activeFilter === "PRODUCTS"
                ? "active border-0 h-100"
                : "border-0 h-100"
            }
          >
            PRODUCTS
          </button>
        </div>
      </div>
    </>
  );
}

export default Filter;
