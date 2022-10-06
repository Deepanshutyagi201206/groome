import React, { useEffect, useState } from "react";

function ToggleServicesPackages(props) {
  const [isService, setIsService] = useState(true);
  const [isProduct, setIsProduct] = useState(true);

  useEffect(() => {
    props.setIsServices(true);
    props.setIsPackages(true);
  }, []);

  return (
    <div className="toggle-services-packages-container d-flex">
      <div className="toggle-services-container d-flex justify-content-center align-items-center">
        <label className="switch">
          <input
            defaultChecked={isService}
            type="checkbox"
            onChange={(e) => {
              props.setIsServices(e.target.checked);
              setIsService(e.target.checked);
            }}
          />
          <span className="slider round"></span>
        </label>
        <p className="mb-0">Services</p>
      </div>
      <div className="toggle-packages-container d-flex justify-content-center align-items-center">
        <label className="switch">
          <input
            defaultChecked={isProduct}
            type="checkbox"
            onChange={(e) => {
              props.setIsPackages(e.target.checked);
              setIsProduct(e.target.checked);
            }}
          />
          <span className="slider round"></span>
        </label>
        <p className="mb-0">Packages</p>
      </div>
    </div>
  );
}

export default ToggleServicesPackages;
