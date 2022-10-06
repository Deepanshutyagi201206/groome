import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import SalonInfo from "./saloninfo";
import Filter from "./filter";
import AtHomeCategories from "./atsaloncategories";
import AtSalonCategories from "./athomecategories";
import ProductCategories from "./productcategories";
import Search from "./search";
import ToggleServicesPackages from "./toggleservicespackages";
import Services from "./services";
import Products from "./products";
import Proceed from "./proceed";

import PopUp from "../../components/popup";

import SearchProduct from "./searchproduct";
import SearchService from "./searchservice";

import useUserId from "../../customhooks/getuserid";

import Loader from "../../components/loader";
import useIsLoader from "../../customhooks/useisloader";

import useGetData from "../../customhooks/getdata";

import useIsPopUp from "../../customhooks/ispopup";

import usePostData from "../../customhooks/postdata";

import useDeleteData from "../../customhooks/deletedata";

function Salon() {

  const salonNameId = useParams()

  const salonId = salonNameId.salonNameId.split("_")[1]

  const [isLoader, setIsLoader] = useIsLoader(true);

  const [isPopUp, setIsPopUp] = useIsPopUp(false);

  const [userId, userError] = useUserId();

  const [popUpMessage, setPopUpMessage] = useState("");

  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [salon, setSalon] = useState();

  const [servicesCategories, setServicesCategories] = useState([]);

  const [productsCategories, setProductsCategories] = useState([]);

  const [isProducts, setIsProducts] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [filterName, setFilterName] = useState("");
  const [isServices, setIsServices] = useState("");
  const [isPackages, setIsPackages] = useState("");
  const [searchQuery, setsearchQuery] = useState("");

  const [isSearchProducts, setIsSearchProducts] = useState(false);

  const [isSearchServices, setIsSearchServices] = useState(false);

  const [productCategoryName, setProductCategoryName] = useState("");

  const [gotSalon, gotSalonError, getSalon] = useGetData();

  const [gotServices, serviceError, getServices] = useGetData();

  const [gotProducts, productsError, getProducts] = useGetData();

  const [gotCartList, cartListError, getCartList] = useGetData();

  const [createdCartId, createCartError, createCart] = usePostData();

  const [gotGenericCart, genericCartError, getGenericCart] = useGetData();

  const [movedGenericCart, movedGenericCartError, moveGenericCart] = useDeleteData();

  useEffect(() => {
    document.body.style.overflow = "scroll"
  }, [])

  useEffect(() => {
    if (userError) {
      if ((gotSalon != undefined && gotSalon != null && gotSalon != "") && (localStorage.getItem("cartId") == "" || localStorage.getItem("cartId") == null || localStorage.getItem("cartId") == undefined)) {
        createCart({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart`,
          headers: {
            "Content-type": "application/json",
          },
          body: { salon: gotSalon.data.salon._id }
        })
      }
    }
  }, [userError, gotSalon])

  useEffect(() => {
    if ((createdCartId != undefined && createdCartId != null && createdCartId != "") && (localStorage.getItem("cartId") == "" || localStorage.getItem("cartId") == null || localStorage.getItem("cartId") == undefined)) {

      localStorage.setItem("cartId", createdCartId.data.genericCart._id)
    }

  }, [createdCartId])

  useEffect(() => {
    if (userError || userId || createdCartId) {
      if (localStorage.getItem("cartId") != "" && localStorage.getItem("cartId") != null && localStorage.getItem("cartId") != undefined) {
        getGenericCart({
          url: `${process.env.REACT_APP_API_URL}/app/genericCart/${localStorage.getItem("cartId") ? localStorage.getItem("cartId") : createdCartId.data.genericCart._id}`,
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
  }, [userError, userId, createdCartId])

  useEffect(() => {
    getSalon({
      url: `${process.env.REACT_APP_API_URL}/app/salon/${salonId}`,
      headers: {},
    });
  }, [])

  useEffect(() => {
    getProducts({
      url: `${process.env.REACT_APP_API_URL}/app/product/search?productType=salon&Status=1&isActive=true&salon=${salonId}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    getServices({
      url: `${process.env.REACT_APP_API_URL}/app/service/search?Status=1&isActive=true&salon=${salonId}`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (gotSalon != undefined && gotSalon != null && gotSalon != "") {
      setSalon(gotSalon);
    }
  }, [gotSalon]);

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
    if ((filterName === "SALON AT HOME" || filterName === "SALON")) {
      setIsProducts(false);

      setServices(
        gotServices.data.services.filter((item) => {
          item.filterName = filterName;
          item.cartService = ""

          gotCartList && gotCartList.data && gotCartList.data.cart && gotCartList.data.cart.services.forEach((cartItem) => {
            if (item._id === cartItem.service._id) {
              item.cartService = cartItem;
            }
          });

          gotGenericCart && gotGenericCart.data && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.services.forEach((cartItem) => {

            if (item._id === cartItem.service._id) {
              item.cartService = cartItem;
            }
          });

          if (filterName === "SALON AT HOME") {
            setServicesCategories(
              gotSalon.data.salon.serviceAtHomeCategory
            );

            if (item.isHome) {
              if (categoryName === "Recommended") {
                if (isServices) {
                  if (item.isService) {
                    return item;
                  }
                }
                if (isPackages) {
                  if (item.isPackage) {
                    return item;
                  }
                }
                if (isServices && isPackages) {
                  if (item.isService || item.isPackage) {
                    return item;
                  }
                }
              } else if (categoryName == item.category.name) {
                if (isServices) {
                  if (item.isService) {
                    return item;
                  }
                }
                if (isPackages) {
                  if (item.isPackage) {
                    return item;
                  }
                }
                if (isServices && isPackages) {
                  if (item.isService || item.isPackage) {
                    return item;
                  }
                }
              }
            }
          } else if (filterName === "SALON") {
            setServicesCategories(
              gotSalon.data.salon.serviceAtSalonCategory
            );
            if (item.isSalon) {

              if (categoryName === "Recommended") {
                if (isServices) {
                  if (item.isService) {
                    return item;
                  }
                }
                if (isPackages) {
                  if (item.isPackage) {
                    return item;
                  }
                }
                if (isServices && isPackages) {
                  if (item.isService || item.isPackage) {
                    return item;
                  }
                }
              } else if (categoryName == item.category.name) {
                if (isServices) {
                  if (item.isService) {
                    return item;
                  }
                }
                if (isPackages) {
                  if (item.isPackage) {
                    return item;
                  }
                }
                if (isServices && isPackages) {
                  if (item.isService || item.isPackage) {
                    return item;
                  }
                }
              }
            }
          }
        })
      );
    }
  }, [
    filterName,
    categoryName,
    isServices,
    isPackages,
    searchQuery,
    gotCartList,
    gotGenericCart
  ]);

  useEffect(() => {
    if (filterName === "PRODUCTS") {
      setIsProducts(true);

      setProducts(
        gotProducts.data.products.filter((item) => {

          setProductsCategories(
            gotSalon.data.salon.productCategory
          );

          item.cartProduct = "";
          gotCartList && gotCartList.data.cart &&
            gotCartList.data.cart.products.forEach((cartItem) => {
              if (item._id === cartItem.product._id) {
                item.cartProduct = cartItem;
              }
            });

          gotGenericCart && gotGenericCart.data.genericCart &&
            gotGenericCart.data.genericCart.products.forEach((cartItem) => {
              if (item._id === cartItem.product._id) {
                item.cartProduct = cartItem;
              }
            });

          if (productCategoryName === "Recommended") {
            return item;
          } else if (productCategoryName === item.category.name) {
            return item;
          }
        })
      );
    }
  }, [filterName, productCategoryName, searchQuery, gotCartList, gotGenericCart]);

  useEffect(() => {
    if (
      gotSalon != undefined &&
      gotSalon != null &&
      gotSalon != "" &&
      gotServices != undefined &&
      gotServices != null &&
      gotServices != "" &&
      gotProducts != undefined &&
      gotProducts != null &&
      gotProducts != "" &&
      gotGenericCart != undefined &&
      gotGenericCart != null &&
      gotGenericCart != ""

    ) {
      setIsLoader(false);
    }
  }, [
    gotSalon &&
    gotServices &&
    gotProducts &&
    gotGenericCart
  ]);

  useEffect(() => {
    if (
      gotSalon != undefined &&
      gotSalon != null &&
      gotSalon != "" &&
      gotServices != undefined &&
      gotServices != null &&
      gotServices != "" &&
      gotProducts != undefined &&
      gotProducts != null &&
      gotProducts != "" &&
      gotCartList != undefined &&
      gotCartList != null &&
      gotCartList != ""

    ) {
      setIsLoader(false);
    }
  }, [
    gotSalon &&
    gotServices &&
    gotProducts &&
    gotCartList
  ]);

  return (
    <>
      <div className="salon-page d-flex flex-column justify-content-between">
        {isLoader ? (
          <Loader color={"#772286"} height={60} width={60} />
        ) : (
          <>
            <div>
              <SalonInfo salon={salon} />

              <Filter gotGenericCart={gotGenericCart} setIsPopUp={setIsPopUp} setPopUpMessage={setPopUpMessage} gotCartList={gotCartList} setFilterName={setFilterName} />

              {isProducts ? (
                <ProductCategories
                  setProductCategoryName={setProductCategoryName}
                  productsCategories={
                    productsCategories
                  }
                />
              ) : filterName === "SALON AT HOME" ? (
                <AtHomeCategories
                  setCategoryName={setCategoryName}
                  categories={servicesCategories}
                />
              ) : filterName === "SALON" ? (
                <AtSalonCategories
                  setCategoryName={setCategoryName}
                  categories={servicesCategories}
                />
              ) : (
                ""
              )}
              <div style={{ paddingBottom: isProducts ? "15px" : "0px" }}>
                <Search
                  setIsSearchServices={setIsSearchServices}
                  setIsSearchProducts={setIsSearchProducts}
                  filterName={filterName}
                  setsearchQuery={setsearchQuery}
                  placeholder={
                    isProducts ? "Search Salon Products" : "Search Salon Services"
                  }

                />
              </div>

              {isProducts ? (
                ""
              ) : (
                <ToggleServicesPackages
                  setIsServices={setIsServices}
                  setIsPackages={setIsPackages}
                />
              )}

              {isProducts ? (
                <Products
                  getGenericCart={getGenericCart}
                  setIsPopUp={setIsPopUp} setPopUpMessage={setPopUpMessage}
                  salon={salon}
                  getCartList={getCartList}
                  productCategoryName={productCategoryName}
                  products={products}
                />
              ) : (
                <Services
                  getGenericCart={getGenericCart}
                  setIsPopUp={setIsPopUp} setPopUpMessage={setPopUpMessage}
                  salon={salon}
                  getCartList={getCartList}
                  filterName={filterName}
                  categoryName={categoryName}
                  services={services}
                />
              )}
            </div>

            {
              gotCartList && gotCartList.data.cart && gotCartList.data.cart.totalItems > 0 || gotGenericCart && gotGenericCart.data.genericCart && gotGenericCart.data.genericCart.totalItems > 0 ? <Proceed gotCartList={gotCartList} gotGenericCart={gotGenericCart} /> : ""
            }
          </>
        )}
      </div>
      <>
        {isSearchProducts ? (
          <SearchProduct
            getGenericCart={getGenericCart}
            setIsPopUp={setIsPopUp}
            setPopUpMessage={setPopUpMessage}
            salon={salon}
            gotCartList={gotCartList}
            gotGenericCart={gotGenericCart}
            setIsSearchProducts={setIsSearchProducts}
            getCartList={getCartList}
            products={products}
          />
        ) : isSearchServices ? (
          <SearchService
            getGenericCart={getGenericCart}
            setIsPopUp={setIsPopUp}
            setPopUpMessage={setPopUpMessage}
            salon={salon}
            gotCartList={gotCartList}
            gotGenericCart={gotGenericCart}
            setIsSearchServices={setIsSearchServices}
            getCartList={getCartList}
            filterName={filterName}
            services={services}
          />
        ) : (
          ""
        )}
      </>

      {isPopUp ? <PopUp isSearchServices={isSearchServices} isSearchProducts={isSearchProducts} setIsPopUp={setIsPopUp} message={popUpMessage} /> : ""}
    </>
  );
}

export default Salon;
