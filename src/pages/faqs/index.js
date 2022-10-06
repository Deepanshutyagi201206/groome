import React from "react";
import { useNavigate } from "react-router-dom";

function Faqs() {

  const navigate = useNavigate()

    return (
      <div className="faqs-page">
        <div className="header-container d-flex align-items-center">
          <div>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="border-0 bg-white"
            >
              <img src="/assets/common/back.svg" alt="Back" />
            </button>
          </div>
          <div className="w-100 text-center">
            <p className="mb-0">FAQs</p>
          </div>
        </div>

        <div className="faqs-container">
          <div className="faq d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="dot-image">
                <img src="/assets/faqs/ellipse.svg" alt="Ellipse" />
              </div>
              <p className="mb-0">Sed ut perspiciatis unde omnis iste natus?</p>
            </div>
            <button className="border-0 bg-white">
              <img src="/assets/common/down.svg" alt="Down" />
            </button>
          </div>
          <div className="faq d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="dot-image">
                <img src="/assets/faqs/ellipse.svg" alt="Ellipse" />
              </div>
              <p className="mb-0">Sed ut perspiciatis unde omnis iste natus?</p>
            </div>
            <button className="border-0 bg-white">
              <img src="/assets/common/down.svg" alt="Down" />
            </button>
          </div>
          <div className="faq d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="dot-image">
                <img src="/assets/faqs/ellipse.svg" alt="Ellipse" />
              </div>
              <p className="mb-0">Sed ut perspiciatis unde omnis iste natus?</p>
            </div>
            <button className="border-0 bg-white">
              <img src="/assets/common/down.svg" alt="Down" />
            </button>
          </div>
        </div>
      </div>
    );
}   

export default Faqs;