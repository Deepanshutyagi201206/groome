import React from "react";

import { useCallback } from "react";

import { useEffect, useState } from "react";
import Search from "./search";
import useGetData from "../../customhooks/getdata";

import useIsLoader from "../../customhooks/useisloader";

import Salon from "./salon";
import Service from "./service";
import Product from "./product";
import ServiceCategory from "./servicecategory";
import ProductCategory from "./productcategory";

function SearchSalons(props) {

  const [gotsalons, salonsError, getSalons] = useGetData();

  const [salons, setSalons] = useState([])

  const [searchQuery, setSearchQuery] = useState("")

  const [isLoader, setIsLoader] = useIsLoader(false);

  const [latlng, setLatlng] = useState({
    lat: "",
    lat: "",
  });

  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";
  })

  useEffect(() => {
    return callback
  }, []);

  const cancel = () => {
    props.setIsSearchSalons(false);
    document.body.style.overflow = "scroll";
  };

  const handleOnchange = (query) => {
    setIsLoader(true)
    getSalons({
      url: `${process.env.REACT_APP_API_URL}/app/search/homepage/all?nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&isActive=true&q=${query}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }


  useEffect(() => {
    if (gotsalons != undefined && gotsalons != null && gotsalons != "" && searchQuery != "") {
      setSalons(gotsalons)
      setIsLoader(false)
    }
    else {
      setSalons([])
      setIsLoader(false)
    }
  }, [gotsalons])


  useEffect(() => {
    setLatlng({
      lat: sessionStorage.getItem("lat"),
      lng: sessionStorage.getItem("lng"),
    });

    setCity(sessionStorage.getItem("city"));

    setCountry(sessionStorage.getItem("country"));
  }, [])

  return (
    <div
      className="search-salons-page h-100"
    >


      <Search cancel={cancel} handleOnchange={handleOnchange} setSearchQuery={setSearchQuery} setSalons={setSalons} isLoader={isLoader} />

      {
        isLoader ? "" : <>
          {
            salons && salons.data && salons.data.salons.length > 0 ? <Salon salons={salons.data.salons} cancel = {cancel} /> : ""
          }

          {
            salons && salons.data && salons.data.serviceCategory.length > 0 ? <ServiceCategory cancel = {cancel} category={salons.data.serviceCategory} /> : ""
          }

          {
            salons && salons.data && salons.data.services ? <Service cancel = {cancel} services={salons.data.services} /> : ""
          }

          {
            salons && salons.data && salons.data.productCategory.length > 0 ? <ProductCategory cancel = {cancel} category={salons.data.productCategory} /> : ""
          }

          {
            salons && salons.data && salons.data.products ? <Product cancel = {cancel} products={salons.data.products} /> : ""
          }
        </>
      }


    </div>
  );
}

export default SearchSalons;
