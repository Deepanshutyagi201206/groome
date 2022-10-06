import React from "react";

function SalonAddress(props) {
    return (
        <div className="salon-address-section">
            <div className="title-container">
                <p className="mb-0">Salon Address</p>
            </div>
            {props.gotCartList && props.gotCartList.data && props.gotCartList.data.cart.salon
                ? <div className="address-container d-flex align-items-center">
                    <div className="salon-image">
                        <img src={props.gotCartList.data.cart.salon.logo ? `${process.env.REACT_APP_IMAGE_URL}${props.gotCartList.data.cart.salon.logo}` : "/assets/home/book_again_salon.png"}
                            alt="Salon" />
                    </div>
                    <div>
                        <p className="name">{props.gotCartList.data.cart.salon.name}</p>
                        <p className="address mb-0">{props.gotCartList.data.cart.salon.address.line_1}, {props.gotCartList.data.cart.salon.address.city}, {props.gotCartList.data.cart.salon.address.state}, {props.gotCartList.data.cart.salon.address.pincode}</p>
                    </div>
                </div> : ""}
        </div>
    );
}

export default SalonAddress;
