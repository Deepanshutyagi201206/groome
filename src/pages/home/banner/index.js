import React, { useEffect } from "react";

import useGetData from "../../../customhooks/getdata";

function Banner() {

  const [banners, bannerError, getBanner] = useGetData();

  useEffect(() => {
    getBanner({
      url: `${process.env.REACT_APP_API_URL}/app/banner/list`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  return (
    <>
      {banners && banners.data && banners.data.banners.length > 0 ?
        <div className="banner-container d-flex align-items-center">

          {banners.data.banners.map((item) => {
            return <div key={item._id}>
              <img src={item.image ? `${process.env.REACT_APP_IMAGE_URL}${item.image}` : "/assets/home/banner.png"} alt="Banner" />
            </div>
          })}
        </div> : ""}
    </>
  );
}

export default Banner