import React from "react";

import { VscStarFull } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import usePostData from "../../../customhooks/postdata";

function ReviewRating(props) {
  const orderId = useParams();

  const [active, setActive] = useState(0);

  const [rating, setRating] = useState();
  const [review, setReview] = useState();

  const [postedData, postError, postData] = usePostData();

  const handleClickRating = (value) => {
    setActive(value);
    setRating(value);
  };

  const handleClickSubmit = () => {
    postData({
      url: `${process.env.REACT_APP_API_URL}/app/order/${
        props.gotOrderDetails && props.gotOrderDetails.data.order._id
      }/reviewAndRating`,

      body: {
        rating: rating,
        review: review,
      },
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  useEffect(() => {
    if (postedData != undefined && postedData != null && postedData != "") {
      props.getOrderDetails({
        url: `${process.env.REACT_APP_API_URL}/app/order/${orderId.orderId}`,
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    }

    console.log(postedData);
  }, [postedData]);

  return (
    <div className="salon-rating-section">
      {(props.gotOrderDetails &&
        props.gotOrderDetails.data.order.reviewAndRating === null) ||
      (props.gotOrderDetails && props.gotOrderDetails.data.order.reviewAndRating &&
        props.gotOrderDetails.data.order.reviewAndRating.status === 4) ? (
        <div>
          <div className="title">
            <p className="mb-0 text-start">Rate this order</p>
          </div>
          <div className="salon-ratings-container d-flex">
            <button
              onClick={() => {
                handleClickRating(1);
              }}
              className={
                active >= 1
                  ? "active d-flex justify-content-center align-items-center"
                  : "d-flex justify-content-center align-items-center"
              }
            >
              1<VscStarFull />
            </button>
            <button
              onClick={() => {
                handleClickRating(2);
              }}
              className={
                active >= 2
                  ? "active d-flex justify-content-center align-items-center"
                  : "d-flex justify-content-center align-items-center"
              }
            >
              2<VscStarFull />
            </button>
            <button
              onClick={() => {
                handleClickRating(3);
              }}
              className={
                active >= 3
                  ? "active d-flex justify-content-center align-items-center"
                  : "d-flex justify-content-center align-items-center"
              }
            >
              3<VscStarFull />
            </button>
            <button
              onClick={() => {
                handleClickRating(4);
              }}
              className={
                active >= 4
                  ? "active d-flex justify-content-center align-items-center"
                  : "d-flex justify-content-center align-items-center"
              }
            >
              4<VscStarFull />
            </button>
            <button
              onClick={() => {
                handleClickRating(5);
              }}
              className={
                active >= 5
                  ? "active d-flex justify-content-center align-items-center"
                  : "d-flex justify-content-center align-items-center"
              }
            >
              5<VscStarFull />
            </button>
          </div>

          <div className="salon-review-container">
            <textarea
              onChange={(e) => {
                setReview(e.target.value);
              }}
              type="text"
              placeholder="Write a review for this order."
            ></textarea>
          </div>

          <div className="submit-review">
            <button
              onClick={() => {
                handleClickSubmit();
              }}
              className="border-0 d-grid justify-content-center align-items-center"
            >
              Submit Review
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      {props.gotOrderDetails && props.gotOrderDetails.data.order.reviewAndRating &&
      props.gotOrderDetails.data.order.reviewAndRating.status == 1 ? (
        <div className="rated-section d-flex justify-content-betwen align-items-center">
          <p className="thank-you mb-0">Thank you for rating! You rated</p>
          <p className="rated mb-0 d-flex justify-content-center align-items-center">
            {props.gotOrderDetails &&
              props.gotOrderDetails.data.order.reviewAndRating.rating}
            <VscStarFull />
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReviewRating;
