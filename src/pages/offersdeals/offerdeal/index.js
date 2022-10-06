import React from "react";

function OfferDeal(props) {
  return (
    <div className="offers-deals-container">
      {props.coupons.map((item) => {
        return (
          <div key={item._id} className="offer-deal-container">
            <div className="title">
              <p className="mb-0">{item.title}</p>
            </div>
            <div className="offer-deal bg-white">
              <div className="offer-deal-image">
                <img src="/assets/offersdeals/offersdeals.png" alt="Offer" />
              </div>
              <div className="coupon-code-container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <p className="coupon-code-text mb-0">COUPON CODE:</p>
                  <p className="coupon-code mb-0">{item.code}</p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(item.code);
                    }}
                    className="copy-code border-0 d-grid justify-content-center align-items-center"
                  >
                    <img src="/assets/offersdeals/copy.svg" alt="Copy" />
                  </button>
                </div>
                <div>
                  <button className="info border-0 d-grid justify-content-center align-items-center">
                    <img src="/assets/offersdeals/info.svg" alt="Info" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OfferDeal;
