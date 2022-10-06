import React from "react";

import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate();

    return (
      <div className="header-container d-flex align-items-center">
        <div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-0 bg-white p-0"
          >
            <img src="/assets/common/back.svg" alt="Back" />
          </button>
        </div>
        <div className="w-100 text-center">
          <p className="mb-0">Profile View</p>
        </div>
      </div>
    );
}

export default Header