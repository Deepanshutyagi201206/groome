import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";

import useUserId from "../../../customhooks/getuserid";

import useGetData from "../../../customhooks/getdata";

function BookAgain() {
  const [userId, userError] = useUserId();

  const [orders, setOrders] = useState([]);

  const [gotOrderList, orderListError, getOrderList] = useGetData();

  const salons = new Set();
  const salonObjects = [];

  useEffect(() => {
    if (userId != undefined && userId != null && userId != "") {
      getOrderList({
        url: `${process.env.REACT_APP_API_URL}/app/order/search?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (
      gotOrderList != undefined &&
      gotOrderList != null &&
      gotOrderList != ""
    ) {
      gotOrderList.data.orders.forEach((item) => {
        if (item.salon && item.salon.status == 1) {
          if (!salons.has(item.salon._id)) {
            salons.add(item.salon._id);
            salonObjects.push(item.salon);
          }
        }
      });

      setOrders(salonObjects);
    }
  }, [gotOrderList]);

  return (
    <>
      {orders.length > 0 ? (
        <div className="book-again-container">
          <div className="title-container d-flex justify-content-between align-items-center">
            <p className="title mb-0">Book Again</p>
            <Link to="/bookingsorders">View Order History</Link>
          </div>

          <div className="book-again-salons-container d-grid">
            {orders.map((item) => {
              return (
                <Link
                  to={item.status ? `/salon/${item.name}_${item._id}` : ""}
                  key={item._id}
                  className="book-again-salon d-flex"
                >
                  <div className="salon-image">
                    <img
                      src={item.logo ? `${process.env.REACT_APP_IMAGE_URL}${item.logo}` : "/assets/home/book_again_salon.png"}
                      alt="Salon"
                    />
                  </div>
                  <div className="book-again-salon-info">
                    <p className="salon-name mb-0">{item.name}</p>
                    <p className="time d-flex align-items-center">
                      <AiOutlineClockCircle />
                      <span>30 mins</span>
                    </p>
                    <p className="address mb-0">{item.address.city}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default BookAgain;
