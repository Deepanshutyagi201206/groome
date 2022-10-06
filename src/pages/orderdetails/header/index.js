import React from "react";

import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  return (
    <div className="header-container">
      <div className="header d-flex align-items-center">
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
          <p className="mb-0">

            
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.salon &&
              props.gotOrderDetails.data.order.salon.name}
          </p>
        </div>
      </div>
      <div className="order-id-container d-flex justify-content-between align-items-center">
        <div className="order-id d-flex align-items-center">
          <p className="mb-0">Order#:</p>
          <p className="mb-0">
          {props.location.state && props.location.state.itemType == "service" ? props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders.orderId : props.location.state && props.location.state.itemType == "product" ? props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders.orderId: "" }
          </p>
        </div>
        <div>
          <p className="amount mb-0">
            
            {props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders && props.gotOrderDetails.data.order.serviceOrders.services.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders.services[0].service.currencySymbol) : props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders && props.gotOrderDetails.data.order.productOrders.products.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders.products[0].product.currencySymbol) : ""}
            {props.location && props.location.state && props.location.state.itemType == "service" ? props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.servicesGrandTotal) : props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.productsGrandTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Header;
