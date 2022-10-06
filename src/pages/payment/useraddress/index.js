import React from "react";

function UserAddress(props) {

  return (
    <div className="address-section">
      <div className="title-container d-flex justify-content-between align-items-center">
        <p className="mb-0">Address</p>
        <button
          onClick={() => {
            props.openAddressPage();
          }}
          className="border-0 bg-white"
        >
          CHANGE
        </button>
      </div>
      {props.address.map((item) => {
        return (
          <div key={item.id}>
            {item.isDefault ? (
              <div key={item.id} className="address-container d-grid">
                <div className="home-image">
                  <img src={item.saveAddressAs == "Home" ? "/assets/common/home.svg" : item.saveAddressAs == "Work" ? "/assets/address/briefcase.svg" : "/assets/common/home.svg"} alt="Home" />
                </div>
                <div>
                  <p className="home">{item.saveAddressAs}</p>
                  <p className="address mb-0">{item.completeAddress}</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

export default UserAddress;
