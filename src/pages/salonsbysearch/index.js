import React from "react";

import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import Salon from "../../components/salon";
import useIsLoader from "../../customhooks/useisloader";
import useGetData from "../../customhooks/getdata";
import FilterSalons from "../../components/filtersalons"

import useUserId from "../../customhooks/getuserid";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader";

import Search from "./search";

import SearchSalons from "../../components/searchsalons";

function SalonsBySearch() {
  const params = useParams();

  console.log(params)

  const [latlng, setLatlng] = useState({
    lat: "",
    lat: "",
  });

  const [city, setCity] = useState("");

  const [country, setCountry] = useState("");

  const [isLoader, setIsLoader] = useIsLoader(true);

  const [salonsAround, setSalonsAround] = useState([]);

  let [perpage, setPerpage] = useState(3);

  const [salons, salonsError, getSalons] = useGetData();

  const [earliest, setEarliest] = useState("");
  const [men, setMen] = useState("");
  const [women, setWomen] = useState("");
  const [rating, setRating] = useState("");

  const [isSearchSalons, setIsSearchSalons] = useState(false);

  const [isScrollLoader, setIsScrollLoader] = useIsLoader();

  useEffect(() => {
    document.body.style.overflow = "scroll"
  }, [])

  useEffect(() => {
    if (latlng.lat && latlng.lng && city && country) {

      setIsScrollLoader(true);
      getSalons({
        url: `${process.env.REACT_APP_API_URL}/app/search/salon/${params.type}?name=${params.name}&nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&salonStatus=verified&isActive=true&per_page=${perpage}&page=1` + `${men && women ? `&type=unisex` : men ? `&type=male` : women ? `&type=female` : ``}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

    }

  }, [perpage]);

  useEffect(() => {
    if (latlng.lat && latlng.lng && city && country) {

      setIsLoader(true);
      getSalons({
        url: `${process.env.REACT_APP_API_URL}/app/search/salon/${params.type}?name=${params.name}&nearBy=${city},${country}&lat=${latlng.lat}&lng=${latlng.lng}&status=1&salonStatus=verified&isActive=true&per_page=${perpage}&page=1` + `${men && women ? `&type=unisex` : men ? `&type=male` : women ? `&type=female` : ``}`+`${rating ? `&rating=4` : ``}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIsSearchSalons(false)

    }


  }, [latlng.lat && latlng.lng, city, country, params.type && params.name, men, women, rating]);

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
      setIsScrollLoader(false)
    }
  }, [salons]);

  const increasePerpage = () => {
    setPerpage(perpage += 1);
  };

  return (
    <>
      <div className="salons-by-search-page d-grid">
        <div className="search-filter-container">
          <Search setIsSearchSalons={setIsSearchSalons} />
          <FilterSalons
            setEarliest={setEarliest}
            setWomen={setWomen}
            setMen={setMen}
            setRating={setRating}
          />
        </div>

        {isLoader ? (
          <Loader height={60} width={60} color={"#772286"} />
        ) : (
          <>
            {salons && salons.data.salons.length > 0 ? (
              <div className="salons-around-container">
                <div className="title">
                  <p className="mb-0">{salonsAround.length} Salons Around You</p>
                </div>
                <div className="salons">
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
                    <Salon
                      salons={salonsAround}
                    />
                  </InfiniteScroll>
                </div>
              </div>
            ) : (
              <div className="not-found text-center d-flex flex-column justify-content-center align-items-center">
                <img src="/assets/salonsbysearch/not_found.png" alt="Not found" />
                <p className="mb-0">Sorry! No results found</p>
              </div>
            )}
          </>
        )}
      </div>

      {
        isSearchSalons ? <SearchSalons setIsSearchSalons={setIsSearchSalons} /> : ""
      }
    </>
  );
}

export default SalonsBySearch;
