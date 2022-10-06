import React from "react";
import { useEffect, useState } from "react";

import useUserId from "../../../customhooks/getuserid";
import Rating from "../../../components/rating";
import useUpdateData from "../../../customhooks/updatedata";

function Products(props) {
  const [addedProduct, addedProductError, addProduct] = useUpdateData();

  const [removedProduct, removedProductError, removeProduct] = useUpdateData();

  const [addedGenericProduct, addedGenericProductError, addGenericProduct] = useUpdateData();

  const [removedGenericProduct, removedGenericProductError, removeGenericProduct] = useUpdateData();

  const [userId, userError] = useUserId();

  const [productId, setProductId] = useState([])

  const decreaseCount = (item) => {
    if (userId) {
      if (item.cartProduct.count > 1) {
        addProduct({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?product=${item._id
            }&count=${item.cartProduct.count - 1}&itemType=product`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      } else {
        removeProduct({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/remove?product=${item._id}&itemType=product`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      }
    }
    if (userError) {
      if (item.cartProduct.count > 1) {
        addGenericProduct({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?product=${item._id
            }&count=${item.cartProduct.count - 1}&itemType=product`,
          headers: {},
          body: {},
        });
      } else {
        removeGenericProduct({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/remove?product=${item._id}&itemType=product`,
          headers: {},
          body: {},
        });
      }
    }
  };

  const increaseCount = (item) => {
    if (userId) {
      addProduct({
        url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?product=${item._id
          }&count=${item.cartProduct ? item.cartProduct.count + 1 : 1
          }&itemType=product`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }
    if (userError) {
      addGenericProduct({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?product=${item._id
          }&count=${item.cartProduct ? item.cartProduct.count + 1 : 1
          }&itemType=product`,
        headers: {},
        body: {},
      });
    }
  };

  useEffect(() => {
    if (
      (addedProduct != undefined &&
        addedProduct != null &&
        addedProduct != "") ||
      (removedProduct != undefined &&
        removedProduct != null &&
        removedProduct != "")
    )
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId && userId.data.id
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  }, [addedProduct, removedProduct]);

  useEffect(() => {
    if (
      (addedGenericProduct != undefined &&
        addedGenericProduct != null &&
        addedGenericProduct != "") ||
      (removedGenericProduct != undefined &&
        removedGenericProduct != null &&
        removedGenericProduct != "")
    )
      props.getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });
  }, [addedGenericProduct, removedGenericProduct]);

  const handleClickForMessage = (value) => {
    props.setPopUpMessage(value);
    props.setIsPopUp(true);
  }

  const handleClickReadLess = (id) => {
    setProductId(productId.filter((item) => {
      return item != id
    }))
  }

  return (
    <div className="products-container">
      {props.productCategoryName ? (
        <div className="title-container">
          <p className="mb-0">{props.productCategoryName}</p>
        </div>
      ) : (
        ""
      )}

      <div className="products d-grid justify-content-between">
        {props.products.length > 0 ? (
          <>
            {props.products.map((item) => {
              return (
                <div className="product" key={item._id}>
                  <div className="image-container">
                    <img
                      src={item.image ? `${process.env.REACT_APP_IMAGE_URL}${item.image}` : "/assets/salon/product.png"}
                      alt="Product"
                    />
                  </div>
                  <div className="product-info">
                    <p className="name mb-0">{item.name}</p>
                    <div className="quantity-add-container d-flex justify-content-between align-items-cenjter">
                      <div>
                        <p className="quantity mb-0">{item.quantity}</p>
                        <>
                          {item.discountPrice > 0 ? (
                            <>
                              <p className="price mb-0">
                                {String.fromCharCode(item.currencySymbol)}
                                {item.discountPrice}
                              </p>
                              <p className="cut mb-0">
                                {String.fromCharCode(item.currencySymbol)}
                                {item.mrp}
                              </p>
                            </>
                          ) : (
                            <p className="price mb-0">
                              {String.fromCharCode(item.currencySymbol)}
                              {item.mrp}
                            </p>
                          )}
                        </>
                      </div>

                      {item.cartProduct ? (
                        <div className="add-remove-product d-flex justify-content-between align-items-center">
                          <button
                            onClick={() => {
                              decreaseCount(item);
                            }}
                            className="border-0"
                          >
                            -
                          </button>
                          <p className="number-of-product mb-0">
                            {item.cartProduct.count}
                          </p>
                          <button
                            onClick={() => {
                              { item.currentStock <= item.cartProduct.count ? handleClickForMessage("Sorry! This product is not in stock.") : increaseCount(item) }
                            }}
                            className="border-0"
                          >
                            +
                          </button>
                        </div>
                      ) : item.currentStock == 0 ? (
                        <button disabled className="out-of-stock">
                          Out of Stock
                        </button>
                      ) : (
                        <button
                          className="add-product"
                          onClick={() => {

                            { props.salon.data.salon.isAcceptingOrder ? (item.currentStock <= item.cartProduct.count ? handleClickForMessage("Sorry! This product is not in stock.") : increaseCount(item)) : handleClickForMessage("Sorry! This salon is not accepting orders.") }
                          }}>
                          ADD+
                        </button>
                      )}
                    </div>
                    <div className="star-rating-container">
                      <Rating rating={item.rating} />
                    </div>
                    <div>
                      <p className="description mb-0">
                        {
                          item.description.length > 60 ? <>{productId.includes(item._id) ? <>{item.description}<button onClick={() => { handleClickReadLess(item._id) }} className="border-0">....read less</button></> : <>{item.description.substring(0, 60)}<button onClick={() => { setProductId((prev) => [...prev, item._id]) }} className="border-0">....read more</button></>}</> : item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="message">
            <p className="mb-0">No Products</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
