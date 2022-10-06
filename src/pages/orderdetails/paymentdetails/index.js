import React from "react";

function PaymentDetails(props) {
  return (
    <div className="payment-details-container bg-white">
      <div className="title-container text-center">
        <p className="mb-0">Payment Details</p>
      </div>
      <div className="subtotal d-flex justify-content-between align-items-center">
        <p className="mb-0">Subtotal (inclusive tax):</p>
        <p className="mb-0">
          {props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders && props.gotOrderDetails.data.order.serviceOrders.services.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders.services[0].service.currencySymbol) : props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders && props.gotOrderDetails.data.order.productOrders.products.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders && props.gotOrderDetails.data.order.productOrders.products[0].product.currencySymbol) : ""}
          {props.location && props.location.state.itemType == "service" ? props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.servicesTotal) : props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.productsTotal)}
        </p>
      </div>
      <div className="discount d-flex justify-content-between align-items-center">
        <p className="mb-0">Discount:</p>
        <p className="mb-0">
        {props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders && props.gotOrderDetails.data.order.serviceOrders.services.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders.services[0].service.currencySymbol) : props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders && props.gotOrderDetails.data.order.productOrders.products.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders.products[0].product.currencySymbol) : ""}
        {props.location && props.location.state.itemType == "service" ? props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.servicesDiscount) : props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.productsDiscount)}
        </p>
      </div>
      <div className="coupon-discount d-flex justify-content-between align-items-center">
        <p className="mb-0">Coupon Discount:</p>
        <p className="mb-0">
          - {props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders && props.gotOrderDetails.data.order.serviceOrders.services.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders.services[0].service.currencySymbol) : props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders && props.gotOrderDetails.data.order.productOrders.products.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders.products[0].product.currencySymbol) : ""}
          {props.location && props.location.state.itemType == "service" ? props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.servicesCouponDiscount) : props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.productsCouponDiscount)}
        </p>
      </div>
      <div className="grand-total d-flex justify-content-between align-items-center">
        <p className="mb-0">Grand Total:</p>
        <p className="mb-0">
        {props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders && props.gotOrderDetails.data.order.serviceOrders.services.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.serviceOrders.services[0].service.currencySymbol) : props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders && props.gotOrderDetails.data.order.productOrders.products.length > 0 ? String.fromCharCode(props.gotOrderDetails && props.gotOrderDetails.data.order.productOrders.products[0].product.currencySymbol) : ""}
        {props.location && props.location.state.itemType == "service" ? props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.servicesGrandTotal) : props.gotOrderDetails && Number(props.gotOrderDetails.data.order.cartCalculations.productsGrandTotal)}
        </p>
      </div>
    </div>
  );
}

export default PaymentDetails;