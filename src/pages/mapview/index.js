import React from "react"
import { useState, useEffect } from "react";

import MapOfSalons from "./mapofsalons";
import Footer from "../../components/footer";
import Salon from "../../components/salon";
import Loader from "../../components/loader";

import useIsLoader from "../../customhooks/useisloader";
import useGetData from "../../customhooks/getdata";

import NotFound from "../../components/notfound";

function Mapview() {

  const [isLoader, setIsLoader] = useIsLoader();

  const [salonsAround, setSalonsAround] = useState([]);

  const [salons, salonsError, getSalons] = useGetData();

  const [latlng, setLatlng] = useState({
    lat: "",
    lat: "",
  });

  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");

  let [perpage, setPerpage] = useState(3);

  useEffect(() => {
    setIsLoader(true);
    if (latlng.lat && latlng.lng && city && country) {
      getSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/search?nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&salonStatus=verified&isActive=true&per_page=${perpage}&page=1`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [latlng.lat && latlng.lng, city, country, perpage]);

  useEffect(() => {
    setLatlng({
      lat: sessionStorage.getItem("lat"),
      lng: sessionStorage.getItem("lng"),
    });

    setCity(sessionStorage.getItem("city"));

    setCountry(sessionStorage.getItem("country"));
  }, []);

  useEffect(() => {
    if (
      salons != undefined &&
      salons != null &&
      salons != ""
    ) {
      setSalonsAround(salons.data.salons);
      setIsLoader(false);
      setPerpage(salons.data.salons.length)
    }
  }, [salons]);

  useEffect(() => {
    const element = document.getElementById("salons-container");
    element.addEventListener("scroll", () => {
      const { scrollWidth, clientWidth, scrollLeft } = element;
      if (scrollLeft + clientWidth >= scrollWidth - 2) {
        setPerpage((per_page)=>per_page += 1);
      }
    });
  }, []);

  const scrolltosalon = (id) => {
    const salons = document.getElementsByClassName("salon");

    for (let loop = 0; loop <= salons.length - 1; loop++) {
      if (salons[loop].id === id) {
        window.scrollTo(0, 506);
        const salonscontainer = document.getElementById("salons-container");
        let clientwidth = salons[loop].clientWidth + 20;
        salonscontainer.scrollTo(loop * clientwidth, 0);
      }
    }
  };

  return (
    <div className="mapview-page d-grid h-100">
      <MapOfSalons scrolltosalon={scrolltosalon} location={salonsAround} />
      <div id="salons-container" className="salons-container d-flex">
        <Salon salons={salonsAround} />
        {isLoader ? <Loader height={60} width={60} color={"#772286"} /> : ""}
        {!isLoader && salonsAround.length==0 ? <NotFound/> : ""}
      </div>
      <Footer />
    </div>
  );
}

export default Mapview;