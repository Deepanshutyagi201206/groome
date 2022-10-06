import React from "react";

import { useNavigate } from "react-router-dom";

function Header(props) {

  const navigate = useNavigate();

    return (
      <div className="header-container d-flex align-items-center">
        <div>
          <button
            onClick={() => {
              props.setIsOpenCoupon(false)
            }}
            className="border-0 bg-white"
          >
            <img src="/assets/common/back.svg" alt="Down" />
          </button>
        </div>
        <div className="w-100 text-center">
          <p className="mb-0">Coupons</p>
        </div>
      </div>
    );
    
}

export default Header