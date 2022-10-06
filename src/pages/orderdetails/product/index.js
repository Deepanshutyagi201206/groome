import React from "react";

function Product(props) {

  return (
    <div className="products-container">
      <div className="title">
        <p className="mb-0">Products</p>
      </div>
      {props.gotOrderDetails &&
        props.gotOrderDetails.data.order.productOrders.products.map((item) => {
          return (
            <div key={item._id} className="product-container">
              <div className="product d-flex justify-content-between">
                <div className="d-flex">
                  <div className="product-image">
                    <img
                      src={item.product.image ? `${process.env.REACT_APP_IMAGE_URL}${item.product.image}` : "/assets/orderdetails/product.png"}
                      alt="Product"
                    />
                  </div>
                  <div className="product-info d-flex flex-column justify-content-center">
                    <p className="name mb-0">{item.product.name}</p>
                    <p className="quantity mb-0">{item.product.quantity}</p>
                    <p className="quantity mb-0">Quantity: {item.count}</p>
                  </div>
                </div>
                <div className="amount">
                  {item.product.discountPrice > 0 ? (
                    <>
                      <p className="mb-0">
                        {String.fromCharCode(item.product.currencySymbol)}
                        {item.product.discountPrice}
                      </p>
                    </>
                  ) : (
                    <p className="mb-0">
                      {String.fromCharCode(item.product.currencySymbol)}
                      {item.mrp}
                    </p>)}
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default Product;
