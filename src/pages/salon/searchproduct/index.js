import React from "react";

import { useEffect, useState, useCallback } from "react";
import Search from "./search";

import { CgClose } from "react-icons/cg";
import Products from "../products";
import Proceed from "../proceed";

function SearchProduct(props) {

  const [products, setProducts] = useState([]);

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";
  })

  useEffect(() => {
    return callback
  }, []);

  const cancel = () => {
    props.setIsSearchProducts(false);
    document.body.style.overflow = "scroll";
  };

  const filterProducts = (searchQuery) => {
    if (searchQuery != "") {
      setProducts(
        props.products.filter((item) => {
          if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return item;
          }
        })
      );
    } else {
      setProducts([]);
    }
  };

  return (
    <div
      className="search-product-page d-flex flex-column justify-content-between h-100"
    >
      <div>
        <div className="header-search-container">
          <div className="header d-flex justify-content-between align-items-center">
            <p className="title mb-0">Search</p>
            <button
              onClick={() => {
                cancel();
              }}
              className="cancel"
            >
              <CgClose />
            </button>
          </div>
          <Search filterProducts={filterProducts} />
        </div>

        {products.length > 0 ? (
          <Products
            getGenericCart={props.getGenericCart}
            setIsPopUp={props.setIsPopUp}
            setPopUpMessage={props.setPopUpMessage}
            salon={props.salon}
            getCartList={props.getCartList}
            productCategoryName={props.productCategoryName}
            products={products}
          />
        ) : (
          ""
        )}
      </div>
      {props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems > 0 || props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems > 0 ? (
        <Proceed gotGenericCart = {props.gotGenericCart} gotCartList={props.gotCartList} />
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchProduct;
