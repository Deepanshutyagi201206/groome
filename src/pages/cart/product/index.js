import React, { useState } from "react";

import { CgClose } from "react-icons/cg";
import { AiOutlineClockCircle } from "react-icons/ai";

import useUpdateData from "../../../customhooks/updatedata";

import useUserId from "../../../customhooks/getuserid";

import { useEffect } from "react";

function Product(props) {
  const [addedProduct, addedProductError, addProduct] = useUpdateData();

  const [removedProduct, removedProductError, removeProduct] = useUpdateData();

  const [addedGenericProduct, addedGenericProductError, addGenericProduct] = useUpdateData();

  const [removedGenericProduct, removedGenericProductError, removeGenericProduct] = useUpdateData();

  const [userId, userError] = useUserId(false);

  const [productId, setProductId] = useState([])

  const decreaseProductCount = (item) => {
    if (userId) {
      if (item.count > 1) {
        addProduct({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?product=${item.product._id
            }&count=${item.count - 1}&itemType=product`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      } else {
        removeProduct({
          url: `${process.env.REACT_APP_API_URL}/app/cart/item/remove?product=${item.product._id}&itemType=product`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: {},
        });
      }
    }

    if (userError) {
      if (item.count > 1) {
        addGenericProduct({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?product=${item.product._id
            }&count=${item.count - 1}&itemType=product`,
          headers: {},
          body: {},
        });
      } else {
        removeGenericProduct({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/remove?product=${item.product._id}&itemType=product`,
          headers: {},
          body: {},
        });
      }
    }
  };

  const increaseProductCount = (item) => {
    if (userId) {
      addProduct({
        url: `${process.env.REACT_APP_API_URL}/app/cart/item/add?product=${item.product._id
          }&count=${item.count + 1}&itemType=product`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }

    if (userError) {
      addGenericProduct({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/add?product=${item.product._id
          }&count=${item.count + 1}&itemType=product`,
        headers: {},
        body: {},
      });
    }
  };

  const removeProductFromCart = (item) => {
    if (userId) {
      removeProduct({
        url: `${process.env.REACT_APP_API_URL}/app/cart/item/remove?product=${item.product._id}&itemType=product`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {},
      });
    }
    if (userError) {
      removeGenericProduct({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/item/remove?product=${item.product._id}&itemType=product`,
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
    ) {
      props.getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [addedProduct, removedProduct]);

  useEffect(() => {
    if (
      (addedGenericProduct != undefined &&
        addedGenericProduct != null &&
        addedGenericProduct != "") ||
      (removedGenericProduct != undefined &&
        removedGenericProduct != null &&
        removedGenericProduct != "")
    ) {
      props.getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });
    }
  }, [addedGenericProduct, removedGenericProduct]);

  const handleClickForMessage = () => {
    props.setPopUpMessage("Sorry! This product is not in stock.");
    props.setIsPopUp(true);
  }

  const handleClickReadLess = (id) => {
    setProductId(productId.filter((item) => {
      return item != id
    }))
  }

  return (
    <>
      {props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.products && props.gotCartList.data.cart.products.length > 0 && props.gotCartList.data.cart.products.map((item) => {
        return (
          <div key={item._id} className="item-container bg-white">
            <div className="item d-flex justify-content-between">
              <div className="d-flex">
                <div className="item-image">
                  <img
                    src={item.product.image ? `${process.env.REACT_APP_IMAGE_URL}${item.product.image}` : "/assets/salon/service.png"}
                    alt="Image"
                  />
                </div>
                <div className="item-info">
                  <p className="name">{item.product.name}</p>
                  <p className="description">
                    {item.product.description.length > 60 ? <>{productId.includes(item.product._id) ? <>{item.product.description}<button onClick={() => { handleClickReadLess(item.product._id) }} className="border-0">....read less</button></> : <>{item.product.description.substring(0, 60)}<button onClick={() => { setProductId((prev) => [...prev, item.product._id]) }} className="border-0">....read more</button></>}</> : item.product.description}

                  </p>
                  <p className="time d-flex justify-content-start align-items-center mb-0">
                    <AiOutlineClockCircle />
                    <span>30 mins</span>
                  </p>
                </div>
              </div>
              <div className="close">
                <button
                  onClick={() => {
                    removeProductFromCart(item);
                  }}
                  className="border-0"
                >
                  <CgClose />
                </button>
              </div>
            </div>
            <div className="quantity-container d-flex justify-content-between align-items-center">
              <div className="quantity d-flex align-items-center">
                <div>
                  <p className="text mb-0">Quantity:</p>
                </div>
                <div className="increase-decrease d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => {
                      decreaseProductCount(item);
                    }}
                    className="border-0"
                  >
                    -
                  </button>
                  <p className="mb-0">{item.count}</p>
                  <button
                    onClick={() => {
                      { item.product.currentStock <= item.count ? handleClickForMessage() : increaseProductCount(item) }

                    }}
                    className="border-0"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="d-flex">
                {item.product.discountPrice > 0 ? (
                  <>
                    <p className="price mb-0">
                      {String.fromCharCode(item.product.currencySymbol)}
                      {item.product.discountPrice * item.count}
                    </p>
                    <p className="cut mb-0">
                      {String.fromCharCode(item.product.currencySymbol)}
                      {item.product.mrp * item.count}
                    </p>
                  </>
                ) : (
                  <p className="price mb-0">
                    {String.fromCharCode(item.productcurrencySymbol)}
                    {item.product.mrp * item.count}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.products && props.gotGenericCart.data.genericCart.products.length > 0 && props.gotGenericCart.data.genericCart.products.map((item) => {
        return (
          <div key={item._id} className="item-container bg-white">
            <div className="item d-flex justify-content-between">
              <div className="d-flex">
                <div className="item-image">
                  <img
                    src={item.product.image ? `${process.env.REACT_APP_IMAGE_URL}${item.product.image}` : "/assets/salon/service.png"}
                    alt="Image"
                  />
                </div>
                <div className="item-info">
                  <p className="name">{item.product.name}</p>
                  <p className="description">
                    {item.product.description.length > 60 ? <>{productId.includes(item.product._id) ? <>{item.product.description}<button onClick={() => { handleClickReadLess(item.product._id) }} className="border-0">....read less</button></> : <>{item.product.description.substring(0, 60)}<button onClick={() => { setProductId((prev) => [...prev, item.product._id]) }} className="border-0">....read more</button></>}</> : item.product.description}

                  </p>
                  <p className="time d-flex justify-content-start align-items-center mb-0">
                    <AiOutlineClockCircle />
                    <span>30 mins</span>
                  </p>
                </div>
              </div>
              <div className="close">
                <button
                  onClick={() => {
                    removeProductFromCart(item);
                  }}
                  className="border-0"
                >
                  <CgClose />
                </button>
              </div>
            </div>
            <div className="quantity-container d-flex justify-content-between align-items-center">
              <div className="quantity d-flex align-items-center">
                <div>
                  <p className="text mb-0">Quantity:</p>
                </div>
                <div className="increase-decrease d-flex justify-content-between align-items-center">
                  <button
                    onClick={() => {
                      decreaseProductCount(item);
                    }}
                    className="border-0"
                  >
                    -
                  </button>
                  <p className="mb-0">{item.count}</p>
                  <button
                    onClick={() => {
                      { item.product.currentStock <= item.count ? handleClickForMessage() : increaseProductCount(item) }

                    }}
                    className="border-0"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="d-flex">
                {item.product.discountPrice > 0 ? (
                  <>
                    <p className="price mb-0">
                      {String.fromCharCode(item.product.currencySymbol)}
                      {item.product.discountPrice * item.count}
                    </p>
                    <p className="cut mb-0">
                      {String.fromCharCode(item.product.currencySymbol)}
                      {item.product.mrp * item.count}
                    </p>
                  </>
                ) : (
                  <p className="price mb-0">
                    {String.fromCharCode(item.productcurrencySymbol)}
                    {item.product.mrp * item.count}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default Product;
