import React from "react";

import { useEffect, useState } from "react"

import InfiniteScroll from "react-infinite-scroll-component";

import useUserId from "../../customhooks/getuserid";
import Salon from "../../components/salon";
import useIsLoader from "../../customhooks/useisloader";
import useGetData from "../../customhooks/getdata";
import SearchSalons from "../../components/searchsalons";
import Search from "./search";
import Header from "./header";
import Loader from "../../components/loader"

import NotFound from "../../components/notfound";

function Favourites() {
  const [isLoader, setIsLoader] = useIsLoader(true);

  const [isScrollLoader, setIsScrollLoader] = useIsLoader();

  const [salonsAround, setSalonsAround] = useState([]);

  let [perpage, setPerpage] = useState(6);

  let [userId, userError] = useUserId();

  const [salons, salonsError, getSalons] = useGetData();

  const [likedSalons, likedSalonsError, getLikedSalons] = useGetData();

  const [isSearchSalons, setIsSearchSalons] = useState(false)

  const [latlng, setLatlng] = useState({
    lat: "",
    lat: "",
  });

  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");

  useEffect(() => {
    setIsScrollLoader(true);
    if (latlng.lat && latlng.lng && city && country) {
      getSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/search?nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&salonStatus=verified&isActive=true&per_page=${perpage}&page=1`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

  }, [perpage]);

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

  }, [latlng.lat && latlng.lng, city, country]);

  useEffect(() => {
    setLatlng({
      lat: sessionStorage.getItem("lat"),
      lng: sessionStorage.getItem("lng"),
    });

    setCity(sessionStorage.getItem("city"));

    setCountry(sessionStorage.getItem("country"));
  }, []);

  useEffect(() => {
    if (userId != null && userId != undefined && userId != "") {
      getLikedSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/like/search?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  useEffect(() => {
    if (
      salons != undefined &&
      salons != null &&
      salons != "" &&
      likedSalons != undefined &&
      likedSalons != null &&
      likedSalons != ""
    ) {
      setSalonsAround(
        salons.data.salons.filter((item) => {
          for (let i = 0; i <= likedSalons.data.likes.length - 1; i++) {
            if (item._id == likedSalons.data.likes[i].salon) {
              return item;
            }
          }
        })
      );
      setIsLoader(false);
      setIsScrollLoader(false)
    }
  }, [salons, likedSalons]);

  const increasePerpage = () => {
    setPerpage(perpage += 1);
  };

  return (
    <>
      <div className="favourites-page d-grid">
        <div className="header-search-container">
          <Header />
          <Search setIsSearchSalons={setIsSearchSalons} />
        </div>
        {isLoader ? <Loader width={60} height={60} color={"#772286"} /> : <>
          {
            salonsAround.length > 0 ? <div className="favourites-salons-container">
              <InfiniteScroll
                dataLength={salonsAround.length > 0
                  ? salonsAround.length : 1}
                next={increasePerpage}
                hasMore={true}
                loader={
                  isScrollLoader ? (
                    <Loader width={60} height={60} color={"#772286"} />
                  ) : (
                    ""
                  )
                }
                scrollThreshold={.5}
              >
                <Salon getLikedSalons={getLikedSalons} salons={salonsAround} />
              </InfiniteScroll>
            </div> :
              <NotFound />
          }
        </>}
      </div>

      {isSearchSalons ? <SearchSalons setIsSearchSalons={setIsSearchSalons} /> : ""}
    </>
  );
}

export default Favourites;
