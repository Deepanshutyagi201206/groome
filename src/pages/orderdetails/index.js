import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";


import ReviewRating from "./reviewrating";

import moment from "moment";

import useGetData from "../../customhooks/getdata";
import { useEffect } from "react";
import Header from "./header";
import Salon from "./salon";
import Service from "./service";
import Product from "./product";
import PaymentDetails from "./paymentdetails";
import Address from "./address";
import SalonAddress from "./salonaddress";

function OrderDetails() {

  const orderId = useParams();

  const location = useLocation();

  const [gotOrderDetails, orderDetailsError, getOrderDetails] = useGetData();

  useEffect(() => {
    if (orderId != undefined && orderId != null && orderId != "") {
      getOrderDetails({
        url: `${process.env.REACT_APP_API_URL}/app/order/${orderId.orderId}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [orderId]);

  const [serviceStatus, setServiceStatus] = useState([
    "pending",
    "confirmed",
    "in transit",
    "started",
    "ended",
    "cancelled",
  ])

  const [productStatus, setProductStatus] = useState([
    "pending",
    "confirmed",
    "shipped",
    "delivered",
    "cancelled",
  ])

  console.log(gotOrderDetails)

  return (
    <div className="order-details-page">
      <Header location={location} gotOrderDetails={gotOrderDetails} />

      <div className="order-placed-payment-status-container bg-white">
        <div className="title d-flex justify-content-between align-items-center">
          <p className="mb-0">Order Placed</p>
          <p className="mb-0">Payment</p>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <p className="date-time mb-0">
            {moment(
              gotOrderDetails && gotOrderDetails.data.order.orderDate
            ).format("ddd, DD MMM, hh:mm A")}
          </p>
          <p className="status mb-0">{gotOrderDetails && gotOrderDetails.data && gotOrderDetails.data.order.transactions.length > 0 && gotOrderDetails.data.order.transactions[0].paymentStatus}</p>
        </div>
      </div>

      <Salon gotOrderDetails={gotOrderDetails} />
      <div className="order-details-section bg-white">
        <div className="order-details-title d-flex justify-content-between align-items-center">
          <p className="mb-0">Order Details</p>
          {location.state && location.state.itemType == "service" ? <p className={Number(gotOrderDetails && gotOrderDetails.data.order.serviceOrders.servicesProcessingStatus) == 2 ? "confirmed status mb-0" : "status mb-0"}>{serviceStatus[Number(gotOrderDetails && gotOrderDetails.data.order.serviceOrders.servicesProcessingStatus)]}</p> : ""}
          {location.state && location.state.itemType == "product" ? <p className={Number(gotOrderDetails && gotOrderDetails.data.order.productOrders.productsProcessingStatus) == 2 ? "confirmed status mb-0" : "status mb-0"}>{productStatus[Number(gotOrderDetails && gotOrderDetails.data.order.productOrders.productsProcessingStatus)]}</p> : ""}
        </div>

        {location.state && location.state.itemType == "service" ? (
          <Service gotOrderDetails={gotOrderDetails} />
        ) : (
          <Product gotOrderDetails={gotOrderDetails} />
        )}
      </div>

      <PaymentDetails location={location} gotOrderDetails={gotOrderDetails} />

      <div className="payment-method d-flex justify-content-between align-items-center bg-white">
        <p className="mb-0">Payment Mode</p>
        <p className="mb-0">{gotOrderDetails && gotOrderDetails.data && gotOrderDetails.data.order.transactions
          && gotOrderDetails.data.order.transactions.length > 0 && gotOrderDetails.data.order.transactions
          [0].paymentMode && gotOrderDetails.data.order.transactions
          [0].paymentMode}</p>
      </div>

      <ReviewRating
        gotOrderDetails={gotOrderDetails}
        getOrderDetails={getOrderDetails}
      />

      {gotOrderDetails && gotOrderDetails.data && gotOrderDetails.data.order.serviceOrders && gotOrderDetails.data.order.serviceOrders.services.length > 0 && gotOrderDetails.data.order.serviceOrders.serviceType == "At Salon" ? <SalonAddress gotOrderDetails={gotOrderDetails} /> :
        <Address gotOrderDetails={gotOrderDetails} />}

      <div className="need-help-section d-flex align-items-center">
        <div className="image d-grid justify-content-center align-items-center">
          <img
            src="/assets/orderdetails/customer_service.svg"
            alt="CustomerService"
          />
        </div>
        <div>
          <p className="need-help">Need help with your booking?</p>
          <p className="chat-with mb-0">Chat with our support executive</p>
        </div>
      </div>

      <div className="book-again-section">
        <Link
          to={gotOrderDetails.data.order.salon.status == 1 ? `/salon/${gotOrderDetails && gotOrderDetails.data.order.salon.name
            }_${gotOrderDetails && gotOrderDetails.data.order.salon._id
            }` : ""}
          className="border-0 d-flex justify-content-center align-items-center"
        >
          <img src="/assets/orderdetails/rotate_right.svg" alt="Rotate" />
          <p className="mb-0">Book Again</p>
        </Link>
      </div>
    </div>
  );
}

export default OrderDetails;
