import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import moment from "moment";

import useUserId from "../../customhooks/getuserid";
import Search from "./search"
import useGetData from "../../customhooks/getdata";
import useIsLoader from "../../customhooks/useisloader";
import Loader from "../../components/loader";

import SearchSalons from "../../components/searchsalons";
import NotFound from "../../components/notfound";

function BookingsOrders() {
  const navigate = useNavigate();

  const location = useLocation();

  const [orders, setOrders] = useState([]);

  const [isLoader, setIsLoader] = useIsLoader(true);

  const [userId, userError] = useUserId();

  const [gotOrderList, orderListError, getOrderList] = useGetData();

  const [isSearchSalons, setIsSearchSalons] = useState(false);

  useEffect(() => {
    if (userId != undefined && userId != null && userId != "") {
      getOrderList({
        url: `${process.env.REACT_APP_API_URL}/app/order/search?user=${userId.data.id}&status=1`,
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
      
      setOrders(gotOrderList.data.orders.filter((item)=>{
        return item.qrCode==false
      }));
      setIsLoader(false);
    }
  }, [gotOrderList]);

  return (
    <>
      <div className="booking-order-page d-grid">
        <div className="header-search-container position-sticky">
          <div className="header-container d-flex align-items-center">
            <div>
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="border-0 bg-white"
              >
                <img src="/assets/common/back.svg" alt="Down" />
              </button>
            </div>
            <div className="w-100 text-center">
              <p className="mb-0">Bookings & Orders</p>
            </div>
          </div>

          <Search setIsSearchSalons={setIsSearchSalons} />
        </div>

        {isLoader ? (
          <Loader width={60} height={60} color={"#772286"} />
        ) : (
          <>
            {
              orders.length > 0 ? <div className="booking-salons-container d-flex flex-column">
                {orders.map((item) => {
                  return (
                    <div key={item._id} className="booking-salon-container">
                      <div className="booking-salon d-flex justify-content-between align-items-center">
                        <div className="d-flex">
                          <div className="booking-salon-image">
                            <img
                              src={item.salon && item.salon.logo ? `${process.env.REACT_APP_IMAGE_URL}${item.salon && item.salon.logo}` : "/assets/home/book_again_salon.png"}
                              alt="Salon"
                            />
                          </div>
                          <div className="booking-salon-info d-flex flex-column justify-content-center">
                            <p className="name mb-0">
                              {item.salon && item.salon.name}
                            </p>
                            <p className="address mb-0">
                              {item.salon && item.salon.address.city}
                            </p>
                          </div>
                        </div>
                        <div className="d-flex flex-column justify-content-between">
                          <Link
                            to={item.salon.status==1 ? `/salon/${item.salon && item.salon.name}_${item.salon && item.salon._id }`:""}
                            className="view-salon border-0"
                          >
                            View Salon
                          </Link>
                        </div>
                      </div>

                      <div className="order-id-section d-flex justify-content-between">
                        <div className="order-id-container">
                          <p className="order-id">Order#{item.orderId}</p>
                          <p className="total-amount mb-0">Total Amount - {item.serviceOrders && item.serviceOrders.services.length > 0 ? String.fromCharCode(item.serviceOrders.services[0].service.currencySymbol) : item.productOrders && item.productOrders.products.length > 0 ? String.fromCharCode(item.productOrders.products[0].product.currencySymbol) : ""}{item.grandTotal
                          } </p>
                        </div>
                        {/* <div>
                          <p className="confirmed d-grid justify-content-center align-items-center border-0 mb-0">
                            Confirmed
                          </p>
                        </div> */}
                      </div>

                      {item.productOrders ? (
                        <div className="service-name-container d-flex justify-content-between align-items-center">
                          <p className="mb-0">
                            {item.productOrders.products.length} x Products
                          </p>
                          <Link
                            to={`/orderdetails/${item._id}`}
                            state={{ itemType: "product" }}
                            className="view-details border-0 bg-white"
                          >
                            View Details
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}

                      {item.serviceOrders ? (
                        <div className="service-name-container d-flex justify-content-between align-items-center">
                          <p className="mb-0">
                            {item.serviceOrders.services.length} x Services
                          </p>
                          <Link
                            to={`/orderdetails/${item._id}`}
                            state={{ itemType: "service" }}
                            className="view-details border-0 bg-white"
                          >
                            View Details
                          </Link>
                        </div>
                      ) : (
                        ""
                      )}

                      <div className="date-container d-flex justify-content-between align-items-center"></div>

                      <div className="payment-mode-section d-flex justify-content-between align-items-center">
                        <div className="date-container">
                          <p className="date mb-0">
                            {moment(item.orderDate).format("ddd, DD MMM, hh:mm A")}
                          </p>
                        </div>
                        <div className="payment-mode-container">
                          <p className="mb-0">Payment mode: {item.transactions
                            && item.transactions.length > 0 && item.transactions
                            [0].paymentMode && item.transactions
                            [0].paymentMode}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div> : <NotFound />
            }
          </>
        )}
      </div>

      {isSearchSalons ? <SearchSalons setIsSearchSalons={setIsSearchSalons} /> : ""}
    </>
  );
}

export default BookingsOrders;
