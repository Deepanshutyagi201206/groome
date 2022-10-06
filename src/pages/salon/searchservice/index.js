import React from "react";

import { useState, useEffect, useCallback } from "react";

import Search from "./search";
import Services from "../services";
import ToggleServicesPackages from "../toggleservicespackages";
import Proceed from "../proceed";

import { CgClose } from "react-icons/cg";

function SearchService(props) {

  const [services, setServices] = useState([]);

  const [isServices, setIsServices] = useState("");
  const [isPackages, setIsPackages] = useState("");

  const [searchQuery, setsearchQuery] = useState("");

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";
  })

  useEffect(() => {
    return callback
  }, []);

  const cancel = () => {
    props.setIsSearchServices(false);
    document.body.style.overflow = "scroll";
  };

  useEffect(() => {
    if (searchQuery != "") {
      setServices(
        props.services.filter((item) => {
          if (isServices) {
            if (item.isService) {
              if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return item;
              }
            }
          }
          if (isPackages) {
            if (item.isPackage) {
              if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return item;
              }
            }
          }
          if (isServices && isPackages) {
            if (item.isService || item.isPackage) {
              if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                return item;
              }
            }
          }
        })
      );
    } else {
      setServices([]);
    }
  }, [searchQuery, isPackages, isServices]);

  return (
    <div
      className="search-service-page d-flex flex-column justify-content-between h-100"
    >
      <div>
        <div className="header-search-container">
          <div className="header d-flex justify-content-between align-items-center">
            <p className="title mb-0">Search</p>
            <ToggleServicesPackages
              setIsServices={setIsServices}
              setIsPackages={setIsPackages}
            />
            <button
              onClick={() => {
                cancel();
              }}
              className="cancel"
            >
              <CgClose />
            </button>
          </div>
          <Search setsearchQuery={setsearchQuery} />
        </div>

        {services.length > 0 ? (
          <Services
            getGenericCart={props.getGenericCart}
            setIsPopUp={props.setIsPopUp}
            setPopUpMessage={props.setPopUpMessage}
            salon={props.salon}
            getCartList={props.getCartList}
            filterName={props.filterName}
            categoryName={props.categoryName}
            services={services}
          />
        ) : (
          ""
        )}
      </div>
      {props.gotCartList && props.gotCartList.data.cart && props.gotCartList.data.cart.totalItems > 0 || props.gotGenericCart && props.gotGenericCart.data.genericCart && props.gotGenericCart.data.genericCart.totalItems > 0 ? (
        <Proceed gotGenericCart={props.gotGenericCart} gotCartList={props.gotCartList} />
      ) : (
        ""
      )}
    </div>
  );
}

export default SearchService;
