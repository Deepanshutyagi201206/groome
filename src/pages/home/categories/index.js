import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../../components/loader";
import NotFound from "../../../components/notfound";

import useGetData from "../../../customhooks/getdata";
import useIsLoader from "../../../customhooks/useisloader";

function Categories() {
  const [isLoader, setIsLoader] = useIsLoader(true);

  const [categories, setCategories] = useState([]);

  const [gotCategories, categoriesError, getCategory] = useGetData();

  useEffect(() => {
    getCategory({
      url: `${process.env.REACT_APP_API_URL}/app/salonCategory/search?status=1`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (
      gotCategories !== undefined &&
      gotCategories !== null &&
      gotCategories !== ""
    ) {
      setCategories(gotCategories.data.salonCategories);
      setIsLoader(false);
    }
  }, [gotCategories]);

  return (
    <div className="categories-container">
      <div className="title">
        <p className="title mb-0">Book which Beautifies you</p>
      </div>
      {isLoader ? (
        <Loader height={60} width={60} color={"#772286"} />
      ) : 
        <>
          {
          categories.length==0 ? <NotFound/> : <div className="categories d-grid justify-content-between">
            {categories.map((item) => {
              return (
                <div key={item._id} className="category text-center">
                  <Link to={`/salonsbycategory/${item._id}`}>
                    <img
                      src={item.image ? `${process.env.REACT_APP_IMAGE_URL}${item.image}` : "/assets/home/category.png"}
                      alt="Category"
                    />
                  </Link>
                  <p className="mb-0">{item.name}</p>
                </div>
              );
            })}
          </div>
          }
        </>
      }
    </div>
  );
}

export default Categories;
