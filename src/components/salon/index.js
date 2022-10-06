import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscStarFull } from "react-icons/vsc";

import useUserId from "../../customhooks/getuserid";
import usePostData from "../../customhooks/postdata";
import useDeleteData from "../../customhooks/deletedata";
import useGetData from "../../customhooks/getdata";

import { Carousel } from 'react-responsive-carousel';

function Salon(props) {
  const [userId, userError] = useUserId();

  const navigate = useNavigate()

  const [likedSalonsId, setLikedSalonsId] = useState([]);

  const [postedLike, likeerror, postData] = usePostData();

  const [deletedLike, deleteerror, deleteData] = useDeleteData();

  const [likedSalons, likedSalonsError, getLikedSalons] = useGetData();

  const [arrowStyles, setArrowStyles] = useState({
    position: 'absolute',
    zIndex: 2,
    top: 'calc(50%)',
    cursor: 'pointer',
    backgroundColor: "white",
    height: "20px",
    width: "20px",
    borderRadius: "100%"
  })

  const [indicatorStyles, setIndicatorStyles] = useState({
    background: '#fff',
    width: 8,
    height: 8,
    borderRadius: "100%",
    display: 'inline-block',
    margin: '0 5px',
  })

  useEffect(() => {
    if (userId != null && userId != undefined && userId != "") {
      getLikedSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/like/search?user=${userId && userId.data.id
          }`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }
  }, [userId]);

  const handleClickLike = (item) => {
    if(userId){
      postData({
        url: `${process.env.REACT_APP_API_URL}/app/salon/${item._id}/like`,
        body: {},
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

    if(userError){
      navigate("/login")
    }
  };

  const handleClickUnlike = (item) => {
    deleteData({
      url: `${process.env.REACT_APP_API_URL}/app/salon/${item._id}/like`,
      body: {},
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  useEffect(() => {
    if (
      (postedLike != null && postedLike != undefined && postedLike != "") ||
      (deletedLike != null && deletedLike != undefined && deletedLike != "")
    ) {
      getLikedSalons({
        url: `${process.env.REACT_APP_API_URL}/app/salon/like/search?user=${userId.data.id}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (props.getLikedSalons) {
        props.getLikedSalons({
          url: `${process.env.REACT_APP_API_URL}/app/salon/like/search?user=${userId.data.id}`,
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
    }
  }, [postedLike, deletedLike]);

  useEffect(() => {
    setLikedSalonsId([])
    likedSalons && likedSalons.data.likes.forEach((likedItem) => {
      setLikedSalonsId((prev) => [...prev, likedItem.salon])
    });
  }, [likedSalons]);

  useEffect(() => {
    if (props.salons != undefined && props.salons != "" && props.salons != null) {
      const element = document.getElementsByClassName("slider-wrapper")
      for (let i = 0; i <= element.length - 1; i++) {
        element[i].style.borderRadius = "8px 8px 0px 0px"
      }
    }
  }, [props])


  return (
    <>
      {props.salons.map((item) => {
        return (
          <div id={item._id} key={item._id} className="salon position-relative">
            <div className="like">

              {likedSalonsId.includes(item._id) ? (
                <button
                  onClick={() => {
                    handleClickUnlike(item);
                  }}
                  className="border-0 position-absolute d-grid justify-content-center align-items-center"
                >
                  <img src="/assets/common/like.svg" alt="Like" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleClickLike(item);
                  }}
                  className="border-0 position-absolute d-grid justify-content-center align-items-center"
                >
                  <img src="/assets/common/unlike.svg" alt="Like" />
                </button>
              )}
            </div>
            <div>
              <div className="position-relative">
                <div className="offers">
                  <p className="mb-0">20% Discount</p>
                </div>
                <div className="salon-image">
                  {
                    item.images.length > 0 ? <Carousel stopOnHover = {true} preventMovementUntilSwipeScrollTolerance={true} infiniteLoop={true} showIndicators={false} autoPlay
                      // renderIndicator={(onClickHandler, isSelected, index, label) => {
                      //     if (isSelected) {
                      //         return (
                      //             <li
                      //                 style={{ ...indicatorStyles, background: '#772286' }}
                      //                 aria-label={`Selected: ${label} ${index + 1}`}
                      //                 title={`Selected: ${label} ${index + 1}`}
                      //             />
                      //         );
                      //     }
                      //     return (
                      //         <li
                      //             style={indicatorStyles}
                      //             onClick={onClickHandler}
                      //             onKeyDown={onClickHandler}
                      //             value={index}
                      //             key={index}
                      //             role="button"
                      //             tabIndex={0}
                      //             title={`${label} ${index + 1}`}
                      //             aria-label={`${label} ${index + 1}`}
                      //         />
                      //     );
                      // }}
                      renderArrowNext={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                          <button className="d-flex justify-content-center align-items-center border-0" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 15 }}>
                            <img style={{ width: "12px", height: "12px" }} src="/assets/common/purple_right.svg" />
                          </button>
                        )
                      }
                      renderArrowPrev={(onClickHandler, hasNext, label) =>
                        hasNext && (
                          <button className="d-flex justify-content-center align-items-center border-0" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 15, transform: "rotate(180deg)" }}>
                            <img style={{ width: "12px", height: "12px" }} src="/assets/common/purple_right.svg" />
                          </button>
                        )
                      } showThumbs={false} showStatus={false} onClickItem={() => { navigate(`/salon/${item.name}_${item._id}`) }}>
                      {
                        item.images.map((salonImage, index) => {
                          return <img key={index} src={`${process.env.REACT_APP_IMAGE_URL}${salonImage}`} alt="Salon" />
                        })
                      }
                    </Carousel> : <img
                      src="/assets/home/salon.png"
                      alt="Salon"
                    />
                  }
                </div>
                <div className="time-distance position-absolute d-flex justify-content-center align-items-center">
                  <AiOutlineClockCircle />
                  <p className="mb-0">
                    {10 * Math.round(item.distanceInKm)} mins | {Math.round(item.distanceInKm)} Kms
                  </p>
                </div>
              </div>
              <Link to={`/salon/${item.name}_${item._id}`} className="salon-info d-block">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="name mb-0">{item.name}</p>
                  <p className="rating d-flex justify-content-center align-items-center mb-0">
                    <span>{item.rating}</span>
                    <VscStarFull />
                  </p>
                </div>
                <div className="address d-flex justify-content-between align-items-center">
                  <p className="mb-0">{item.address.city}</p>
                  <p className="mb-0">&#8377;&#8377;&#8377;</p>
                </div>
                <div className="book d-flex align-items-center">
                  <img src="/assets/component/salon/flash.svg" alt="Flash" />
                  <p className="mb-0">
                    1200+ appointments booked from here recently
                  </p>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Salon;
