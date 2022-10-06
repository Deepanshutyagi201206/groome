import React from "react";
import Header from "./header";

function Wallet() {

  return (
    <div className="wallet-page h-100">
      <Header/>

      <div className="wallet-container d-flex justify-content-between align-items-center bg-white">
        <div className="d-flex align-items-center">
          <div className="wallet-image d-grid justify-content-center align-items-center">
            <img src="assets/common/wallet.svg" alt="Wallet" />
          </div>
          <p className="name mb-0">G Cash</p>
        </div>
        <div>
          <p className="balance mb-0">&#8377;400</p>
        </div>
      </div>

      <div className="order-details-section">
        <div className="title">
          <p className="mb-0">Order Details</p>
        </div>
        <div className="order-details-container">
          <div className="order-detail bg-white d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center">
              <div className="wallet-image d-grid justify-content-center align-items-center">
                <img src="assets/common/wallet.svg" alt="Wallet" />
              </div>
              <div>
                <p className="date mb-0">23 Aug 2022</p>
                <p className="name">Gift Credits Added</p>
                <p className="expire-time mb-0">Expired</p>
              </div>
            </div>
            <div className="balance">
              <p className="mb-0">+ &#8377;500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
