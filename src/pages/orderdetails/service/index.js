import moment from "moment";
import { AiOutlineClockCircle } from "react-icons/ai";
import React from "react";


function Service(props) {

  console.log(props)

  return (
    <>
      <div className="appointment-stylist-container">
        <div className="title d-flex justify-content-between align-items-center">
          <p className="mb-0">Appointment On</p>
          <p className="mb-0">By Stylist</p>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <p className="date mb-0">
              {props.gotOrderDetails &&
                moment(
                  props.gotOrderDetails.data.order.serviceOrders.slotDate
                ).format("ddd, DD MMM")}
            </p>
            <p className="time mb-0">
              {props.gotOrderDetails &&
                props.gotOrderDetails.data.order.serviceOrders.slotTime}
            </p>
          </div>
          <p className="stylist mb-0">{props.gotOrderDetails &&
                props.gotOrderDetails.data.order.serviceOrders.stylist ? props.gotOrderDetails.data.order.serviceOrders.stylist : "No stylist assigned"}</p>
        </div>
      </div>

      <div className="services-container">
        <div className="title">
          <p className="stylist mb-0">Services</p>
        </div>
        {props.gotOrderDetails &&
          props.gotOrderDetails.data.order.serviceOrders.services.map(
            (item) => {
              return (
                <div key={item._id} className="service-container">
                  <div className="service d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="service-image">
                        <img
                          src={item.service.image ? `${process.env.REACT_APP_IMAGE_URL}${item.service.image}` : "/assets/salon/service.png"}
                          alt="Product"
                        />
                      </div>
                      <div className="service-info d-flex flex-column justify-content-center">
                        <p className="name mb-0">{item.service.name}</p>
                        <p className="time d-flex align-items-center mb-0">
                          <AiOutlineClockCircle />{" "}
                          <span>{item.service.duration} mins</span>
                        </p>
                        <p className="quantity mb-0">Quantity: {item.count}</p>
                      </div>
                    </div>
                    <div className="amount">

                      {props.gotOrderDetails.data.order.serviceOrders.serviceType == "At Salon" ? (

                        <>
                          
                          {item.service.salonDiscountPrice > 0 ? <p className="mb-0">
                            {String.fromCharCode(item.service.currencySymbol)}
                            {item.service.salonDiscountPrice}
                          </p> : (
                            <p className="mb-0">
                              {String.fromCharCode(item.service.currencySymbol)}
                              {item.service.salonMrp}
                            </p>
                          )
                          }
                        </>
                      ) : props.gotOrderDetails.data.order.serviceOrders.serviceType == "At Home" ? (
                        <>

                          {item.service.homeDiscountPrice > 0 ? <p className="mb-0">
                            {String.fromCharCode(item.service.currencySymbol)}
                            {item.service.homeDiscountPrice}
                          </p> : (
                            <p className="mb-0">
                              {String.fromCharCode(item.service.currencySymbol)}
                              {item.service.homeMrp}
                            </p>
                          )
                          }
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            }
          )}

        <div className="service-type d-flex justify-content-between align-items-center">
          <p className="mb-0"> Service Type:</p>
          <p className="mb-0">
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.serviceOrders.serviceType}
          </p>
        </div>
      </div>
    </>
  );
}

export default Service;
