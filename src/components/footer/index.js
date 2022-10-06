import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container d-flex justify-content-between">
      <div
        className={
          window.location.pathname == "/"
            ? "active text-center"
            : "text-center"
        }
      >
        <Link to="/">
          <div className="image d-grid justify-content-center align-items-center">
            <img
              src={
                window.location.pathname == "/"
                  ? "/assets/component/footer/home_active.svg"
                  : "/assets/component/footer/home.svg"
              }
            />
          </div>
          <p className="mb-0">Home</p>
        </Link>
      </div>
      <div
        className={
          window.location.pathname == "/salons/isSalon"
            ? "active text-center"
            : "text-center"
        }
      >
        <Link to="/salons/isSalon">
          <div className="image d-grid justify-content-center align-items-center">
            <img
              src={
                window.location.pathname == "/salons/isSalon"
                  ? "/assets/component/footer/grooming_active.svg"
                  : "/assets/component/footer/grooming.svg"
              }
            />
          </div>
          <p className="mb-0">Salon</p>
        </Link>
      </div>
      <div
        className={
          window.location.pathname == "/salons/isHome"
            ? "active text-center"
            : "text-center"
        }
      >
        <Link to="/salons/isHome">
          <div className="image d-grid justify-content-center align-items-center">
            <img
              src={
                window.location.pathname == "/salons/isHome"
                  ? "/assets/component/footer/athome_active.svg"
                  : "/assets/component/footer/athome.svg"
              }
            />
          </div>
          <p className="mb-0">Salon at Home</p>
        </Link>
      </div>
      <div
        className={
          window.location.pathname == "/salons/isProduct"
            ? "active text-center"
            : "text-center"
        }
      >
        <Link to="/salons/isProduct">
          <div className="image d-grid justify-content-center align-items-center">
            <img
              src={
                window.location.pathname == "/salons/isProduct"
                  ? "/assets/component/footer/lotion_active.svg"
                  : "/assets/component/footer/lotion.svg"
              }
            />
          </div>
          <p className="mb-0">Cosmetics</p>
        </Link>
      </div>
      <div
        className={
          window.location.pathname == "/mapview"
            ? "active text-center"
            : "text-center"
        }
      >
        <Link to="/mapview">
          <div className="image d-grid justify-content-center align-items-center">
            <img
              src={
                window.location.pathname == "/mapview"
                  ? "/assets/component/footer/map_active.svg"
                  : "/assets/component/footer/map.svg"
              }
            />
          </div>
          <p className="mb-0">Map View</p>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
