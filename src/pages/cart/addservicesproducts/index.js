import React from "react";

import { useNavigate } from "react-router-dom";

function AddServiceProducts(props) {

  const navigate = useNavigate()

  return (
    <div className="add-services-packages-container bg-white">
      <div onClick={()=>{navigate(-1)}}
        className="add-services-packages d-flex justify-content-start align-items-center border-0 bg-white"
      >
        <img src="/assets/common/plus.svg" alt="Plus" />
        <p className="mb-0">Add more Services / Packages</p>
      </div>
    </div>
  );
}

export default AddServiceProducts;
