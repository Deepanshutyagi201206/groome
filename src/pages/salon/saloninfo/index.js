import React, { useEffect, useState } from "react";
import { VscStarFull } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

import useDeleteData from "../../../customhooks/deletedata";
import usePostData from "../../../customhooks/postdata";
import useUserId from "../../../customhooks/getuserid";
import useGetData from "../../../customhooks/getdata";
import { RWebShare } from "react-web-share";

import { Carousel } from "react-responsive-carousel";

function SalonInfo(props) {
  const [userId, userError] = useUserId();

  const [salon, setSalon] = useState();

  const navigate = useNavigate();

  const [postedLike, likeerror, postData] = usePostData();

  const [deletedLike, deleteerror, deleteData] = useDeleteData();

  const [likedSalons, likedSalonsError, getLikedSalons] = useGetData();

  const [isLiked, setIsLiked] = useState(false);

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

  const likeUnlikeSalon = (id, isLiked) => {
    if(userId){
      if (isLiked) {
        deleteData({
          url: `${process.env.REACT_APP_API_URL}/app/salon/${id}/like`,
          body: {},
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        props.salon.data.salon.isLiked = false;
      } else {
        postData({
          url: `${process.env.REACT_APP_API_URL}/app/salon/${id}/like`,
          body: {},
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      }
    }
    if(userError){
      navigate("/login")
    }
  };

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
    }
  }, [postedLike, deletedLike]);

  useEffect(() => {
    if (likedSalons != undefined && likedSalons != null && likedSalons != "") {
      setIsLiked(false);
      likedSalons.data.likes.forEach((likedItem) => {
        if (props.salon.data.salon._id == likedItem.salon) {
          setIsLiked(true);
        }
      });

      
    }
    setSalon(props.salon);
  }, [props, likedSalons]);

  return (
    <div className="salon-info position-relative">
      <div className="back-heart-main-container position-absolute w-100">
        <div className="back-heart-container d-flex justify-content-between align-items-center">
          <button
            className="border-0 d-grid"
            onClick={() => {
              navigate(-1);
            }}
          >
            <img src="/assets/salon/back.svg" alt="Back" />
          </button>
          <button
            onClick={() => {
              likeUnlikeSalon(
                salon && salon.data.salon._id,
                isLiked
              );
            }}
            className="heart d-grid justify-content-center align-items-center border-0"
          >
            <img
              src={
                isLiked
                  ? "/assets/common/like.svg"
                  : "/assets/common/unlike.svg"
              }
              alt="Heart"
            />
          </button>
        </div>
        <div className="share-container text-end">
          <RWebShare data={{
            text: "",
            url: "",
            title: "Share",
          }}>
            <button className="border-0 d-grid justify-content-center align-items-center">
              <img src="/assets/common/share.svg" alt="Share" />
            </button>
          </RWebShare>

        </div>
      </div>
      <div className="salon-image-container">
        {salon && salon.data.salon ? <>{
          salon && salon.data.salon.images.length > 0 ? <Carousel stopOnHover = {true} preventMovementUntilSwipeScrollTolerance ={true} autoPlay infiniteLoop={true} renderIndicator={(onClickHandler, isSelected, index, label) => {
            if (isSelected) {
              return (
                <li
                  style={{ ...indicatorStyles, background: '#772286' }}
                  aria-label={`Selected: ${label} ${index + 1}`}
                  title={`Selected: ${label} ${index + 1}`}
                />
              );
            }
            return (
              <li
                style={indicatorStyles}
                onClick={onClickHandler}
                onKeyDown={onClickHandler}
                value={index}
                key={index}
                role="button"
                tabIndex={0}
                title={`${label} ${index + 1}`}
                aria-label={`${label} ${index + 1}`}
              />
            );
          }}
            renderArrowNext={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button className="d-flex justify-content-center align-items-center border-0" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, right: 20 }}>
                  <img style={{ width: "12px", height: "12px" }} src="/assets/common/purple_right.svg" />
                </button>
              )
            }
            renderArrowPrev={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button className="d-flex justify-content-center align-items-center border-0" type="button" onClick={onClickHandler} title={label} style={{ ...arrowStyles, left: 20, transform: "rotate(180deg)" }}>
                  <img style={{ width: "12px", height: "12px" }} src="/assets/common/purple_right.svg" />
                </button>
              )
            } showThumbs={false} showStatus={false}>
            {
              salon.data.salon.images.map((salonImage, index) => {
                return <img key={index} src={`${process.env.REACT_APP_IMAGE_URL}${salonImage}`} alt="Salon" />
              })
            }
          </Carousel> : <img
            src="/assets/home/salon.png"
            alt="Salon"
          />
        }</> : ""}
      </div>

      <div className="name-address-rating-container">
        <div className="d-flex justify-content-between align-items-center">
          <p className="name mb-0">{salon && salon.data.salon.name}</p>
          <p className="rating d-flex justify-content-center align-items-center mb-0 ">
            <span>{salon && salon.data.salon.rating}</span>
            <VscStarFull />
          </p>
        </div>
        <div>
          <p className="address mb-0">
            {salon && salon.data.salon.address.city}
          </p>
        </div>
      </div>
      <div className="icons-container d-flex">
        <div>
          <img src="/assets/salon/spray.svg" alt="Spray" />
        </div>
        <div>
          <img src="/assets/salon/shield.svg" alt="Shield" />
        </div>
        <div>
          <img src="/assets/salon/diamond.svg" alt="Diamond" />
        </div>
      </div>
    </div>
  );
}

export default SalonInfo;
