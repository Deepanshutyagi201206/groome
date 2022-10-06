import React from "react";
import { useState, useEffect } from "react";

import Header from "./header";
import Search from "./search";
import FilterSalons from "../../components/filtersalons";
import Banner from "./banner";
import BookAgain from "./bookagain";
import Categories from "./categories";
import SalonsAround from "./salonsaround";
import Footer from "../../components/footer";

import Location from "./location";

import SearchSalons from "../../components/searchsalons";

import useUserId from "../../customhooks/getuserid";
import useGetData from "../../customhooks/getdata";

import useDeleteData from "../../customhooks/deletedata";

import useIsLoader from "../../customhooks/useisloader";

import Discard from "./discard";
import CartAlert from "./cartalert";

function Home() {
  const [isLoader, setIsLoader] = useIsLoader(true);

  const [isScrollLoader, setIsScrollLoader] = useIsLoader();

  const [salonsAround, setSalonsAround] = useState([]);

  const [userId, userError] = useUserId([]);

  let [perpage, setPerpage] = useState(1);

  const [salons, salonsError, getSalons] = useGetData();

  const [gotCartList, cartListError, getCartList] = useGetData();

  const [latlng, setLatlng] = useState({
    lat: "",
    lat: "",
  });

  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");

  const [earliest, setEarliest] = useState("");
  const [men, setMen] = useState("");
  const [women, setWomen] = useState("");
  const [rating, setRating] = useState("");

  const [isShowDiscard, setIsShowDiscard] = useState(false);

  const [isSearchSalons, setIsSearchSalons] = useState(false)

  const [isOpenSelectLocation, setIsOpenSelectLocation] = useState(false);

  const [gotAddress, AddressError, getAddress] = useGetData();

  const [gotGenericCart, genericCartError, getGenericCart] = useGetData();

  const [movedGenericCart, movedGenericCartError, moveGenericCart] = useDeleteData();

  useEffect(() => {
    if (latlng.lng && latlng.lng) {
      getAddress({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${latlng.lat},${latlng.lng}&key=AIzaSyCjcIh4rzaoDV5pWhuGUjmpxuSLEF1YLtc`,
        headers: {},
      });
    }
  }, [latlng.lat && latlng.lng]);


  useEffect(() => {

    setIsScrollLoader(true);

    if (latlng.lat && latlng.lng && city && country) {
      getSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/search?nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&salonStatus=verified&isActive=true&per_page=${perpage}&page=1` + `${men && women ? `&type=unisex` : men ? `&type=male` : women ? `&type=female` : ``}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [perpage]);

  useEffect(() => {

    setSalonsAround([])

    setIsLoader(true);

    if (latlng.lat && latlng.lng && city && country) {
      getSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/search?nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&salonStatus=verified&isActive=true&per_page=${perpage}&page=1` + `${men && women ? `&type=unisex` : men ? `&type=male` : women ? `&type=female` : ``}` + `${rating ? `&rating=4` : ``}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [latlng.lat && latlng.lng && city, country, men, women, rating]);

  useEffect(() => {
    if (userId) {
      if (gotGenericCart != null && gotGenericCart != undefined && gotGenericCart != "") {
        if (gotGenericCart && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.totalItems > 0) {
          moveGenericCart({
            url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}/move`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: {}
          })
        }
        else {
          getCartList({
            url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
        }
      }
    }
  }, [gotGenericCart && userId])

  useEffect(() => {
    if (movedGenericCart != undefined && movedGenericCart != null && movedGenericCart != "") {
      getCartList({
        url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      getGenericCart({
        url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
        headers: {},
      });

    }
  }, [movedGenericCart]);

  useEffect(() => {
    if (userError || userId) {
      if (localStorage.getItem("cartId") != "" && localStorage.getItem("cartId") != null && localStorage.getItem("cartId") != undefined) {

        getGenericCart({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId")}`,
          headers: {},
        });
      }
      else {
        if(userId){
          getCartList({
            url: `${process.env.REACT_APP_API_URL}/app/cart?user=${userId.data.id}`,
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          
        }
      }
    }

  }, [userError, userId])

  useEffect(() => {

    if (salons != null && salons != "" && salons != undefined) {
      setIsLoader(false);
      setIsScrollLoader(false);
      setSalonsAround(salons.data.salons);
    }
  }, [salons]);

  const increasePerpage = () => {
    setPerpage(perpage += 1);
  };

  const openDiscard = () => {
    setIsShowDiscard(true);
    document.body.style.overflow = "hidden";
  };

  const closeDiscard = () => {
    document.body.style.overflow = "scroll";
    setIsShowDiscard(false);
  }

  const getcurrentlocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (coords) => {

        setLatlng({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        });

      },
      (err) => {
        console.log(err);

        setLatlng({
          lat: 12.9715987,
          lng: 77.5945627,
        });
      }
    );
  };

  useEffect(() => {

    if (!sessionStorage.getItem("isConfirm")) {
      getcurrentlocation();
    }

    else {
      setLatlng({
        lat: sessionStorage.getItem("lat"),
        lng: sessionStorage.getItem("lng"),
      });
    }

  }, []);


  const getLatlng = (latlng) => {
    setLatlng({
      lat: latlng.latlng.lat,
      lng: latlng.latlng.lng,
    });
  };

  const openSelectLocation = () => {
    document.body.style.overflow = "hidden";

    setIsOpenSelectLocation(true);
  };

  const closeSelectLocation = () => {
    document.body.style.overflow = "scroll";

    setIsOpenSelectLocation(false);
  };

  useEffect(() => {
    if (gotAddress != undefined && gotAddress != null && gotAddress != "") {

      gotAddress.data.results &&
        gotAddress.data.results.forEach((addresses) => {
          addresses.address_components.forEach((address) => {
            address.types.forEach((item) => {
              if (item === "locality") {
                setCity(address.long_name);
                sessionStorage.setItem("city", address.long_name);
              }

              if (item === "country") {
                sessionStorage.setItem("country", address.long_name);
                sessionStorage.setItem("lat", latlng.lat);
                sessionStorage.setItem("lng", latlng.lng);
                setCountry(address.long_name)
              }
            });
          });
        });
    }
  }, [gotAddress]);

  return (
    <>
      {isShowDiscard ? (
        <Discard getGenericCart={getGenericCart} closeDiscard={closeDiscard} getCartList={getCartList} />
      ) : (
        ""
      )}

      <div className="home-page d-flex flex-column justify-content-between">
        <div>
          <Header city={city} gotAddress={gotAddress} openSelectLocation={openSelectLocation} />
          <div className="search-filter-container">
            <Search setIsSearchSalons={setIsSearchSalons} />
            <FilterSalons
              setEarliest={setEarliest}
              setWomen={setWomen}
              setMen={setMen}
              setRating={setRating}
            />
          </div>
          <Banner />
          <BookAgain />
          <Categories />
          <SalonsAround
            salons={salons && salons.data.salons}
            isScrollLoader={isScrollLoader}
            isLoader={isLoader}
            increasePerpage={increasePerpage}
            salonsAround={salonsAround}
          />
        </div>
        <div className="footer-cart-container">
          {(gotCartList &&
            gotCartList.data.cart &&
            gotCartList.data.cart.totalItems > 0) || (gotGenericCart &&
              gotGenericCart.data.genericCart &&
              gotGenericCart.data.genericCart.totalItems > 0) ? (
            <CartAlert gotGenericCart={gotGenericCart} gotCartList={gotCartList} openDiscard={openDiscard} />
          ) : (
            ""
          )}

          <Footer />
        </div>
      </div>

      {isSearchSalons ? <SearchSalons setIsSearchSalons={setIsSearchSalons} /> : ""}

      {isOpenSelectLocation ? (
        <Location
          getLatlng={getLatlng}
          closeSelectLocation={closeSelectLocation}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Home;
