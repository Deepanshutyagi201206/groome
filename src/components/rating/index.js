import React from "react";
import StarRatings from "react-star-ratings";

function Rating(props) {
    return (
      <div className="rating d-flex justify-content-start align-items-center">
        <StarRatings
          rating={props.rating}
          starRatedColor="#FFCE00"
          numberOfStars={5}
          name="rating"
        />
        <p className="number-of-rating mb-0">{props.rating}</p>
      </div>
    );
}

export default Rating