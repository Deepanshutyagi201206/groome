import React from "react";
import { useNavigate } from "react-router-dom";

import useUserId from "../../../customhooks/getuserid";

function Proceed(props) {

  const [userId, userError] = useUserId();

  const navigate = useNavigate()

  const proceed = () => {

    if (userId) {
      let isProductOutOfStock = false;
      let isProductInActive = false;
      let isServiceInActive = false;
      let isSalonAcceptOrder = true
      let isUserAddress = false

      if (props.gotCartList.data.cart.serviceType != "At Salon") {
        if (props.gotAddress.data) {
          props.gotAddress.data.userAddresses.forEach((item) => {
            if (item.isDefault) {
              isUserAddress = true
            }
          })
        }

        if (props.gotCartList.data.cart.products.length > 0) {
          props.gotCartList.data.cart.products.forEach((item) => {
            if (item.count > item.product.currentStock) {
              isProductOutOfStock = true;
              props.setIsPopUp(true)
              props.setPopUpMessage((prev) => prev + "Sorry! You can't proceed because product is outofStock")
            }
          })
        }

        if (props.gotCartList.data.cart.products.length > 0) {
          props.gotCartList.data.cart.products.forEach((item) => {
            if (item.product.status != 1) {
              isProductInActive = true
              props.setIsPopUp(true)
              props.setPopUpMessage((prev) => prev + ", Product is not available")
            }
          })
        }

        if (props.gotCartList.data.cart.services.length > 0) {
          props.gotCartList.data.cart.services.forEach((item) => {
            if (item.service.status != 1) {
              isServiceInActive = true
              props.setIsPopUp(true)
              props.setPopUpMessage((prev) => prev + ", Service is not available")
            }
          })
        }

        if (!props.gotCartList.data.cart.salon.isAcceptingOrder) {
          isSalonAcceptOrder = false
          props.setIsPopUp(true)
          props.setPopUpMessage((prev) => prev + ", Salon is not available.")
        }

        if (!isUserAddress && !isProductOutOfStock && !isProductInActive && !isServiceInActive && isSalonAcceptOrder) {
          props.openAddressPage();
        }
        if (
          isUserAddress && props.gotCartList.data.cart.services.length > 0 && !isProductOutOfStock && !isProductInActive && !isServiceInActive && isSalonAcceptOrder) {
          props.setIsProceed(true)
        }
        if (isUserAddress && props.gotCartList.data.cart.services.length == 0 && !isProductOutOfStock && !isProductInActive && !isServiceInActive && isSalonAcceptOrder) {
          props.setIsProceed(true)
        }
      }

      else {
        if (props.gotCartList.data.cart.products.length > 0) {
          props.gotCartList.data.cart.products.forEach((item) => {
            if (item.count > item.product.currentStock) {
              isProductOutOfStock = true;
              props.setIsPopUp(true)
              props.setPopUpMessage((prev) => prev + "Sorry! You can't proceed because product is outofStock")
            }
          })
        }

        if (props.gotCartList.data.cart.products.length > 0) {
          props.gotCartList.data.cart.products.forEach((item) => {
            if (item.product.status != 1) {
              isProductInActive = true
              props.setIsPopUp(true)
              props.setPopUpMessage((prev) => prev + ", Product is not available")
            }
          })
        }

        if (props.gotCartList.data.cart.services.length > 0) {
          props.gotCartList.data.cart.services.forEach((item) => {
            if (item.service.status != 1) {
              isServiceInActive = true
              props.setIsPopUp(true)
              props.setPopUpMessage((prev) => prev + ", Service is not available")
            }
          })
        }

        if (!props.gotCartList.data.cart.salon.isAcceptingOrder) {
          isSalonAcceptOrder = false
          props.setIsPopUp(true)
          props.setPopUpMessage((prev) => prev + ", Salon is not available.")
        }

        if (
          props.gotCartList.data.cart.services.length > 0 && !isProductOutOfStock && !isProductInActive && !isServiceInActive && isSalonAcceptOrder) {
          props.setIsProceed(true)
        }
        if (props.gotCartList.data.cart.products.length > 0 && props.gotCartList.data.cart.services.length==0 && !isProductOutOfStock && !isProductInActive && !isServiceInActive && isSalonAcceptOrder) {
          props.setIsProceed(true)
        }
      }
      
    }

    if (userError) {
      navigate("/login")
    }

  };

  return (
    <div className="proceed-container d-flex justify-content-between align-items-center">
      <div>
        <p className="grand-total">Grand Total</p>
        <p className="price mb-0">
          {
            props.gotCartList ? <>{props.gotCartList.data.cart.services.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.services[0].service.currencySymbol) : props.gotCartList.data.cart.products.length > 0 ? String.fromCharCode(props.gotCartList.data.cart.products[0].product.currencySymbol) : ""}{Number(props.gotCartList.data.cart.grandTotal)}</> : props.gotGenericCart ? <>{props.gotGenericCart.data.genericCart.services.length > 0 ? String.fromCharCode(props.gotGenericCart.data.genericCart.services[0].service.currencySymbol) : props.gotGenericCart.data.genericCart.products.length > 0 ? String.fromCharCode(props.gotGenericCart.data.genericCart.products[0].product.currencySymbol) : ""}{Number(props.gotGenericCart.data.genericCart.grandTotal)}</> : ""
          }
        </p>
      </div>
      <div className="proceed">
        <button
          onClick={() => {
            proceed();
          }}
          className="border-0 d-flex justify-content-center align-items-center"
        >
          <span>Proceed</span>
          <img src="/assets/common/white_right.svg" alt="Right" />
        </button>
      </div>
    </div>
  );
}

export default Proceed;
