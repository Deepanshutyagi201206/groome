import React from "react";

function SalonAddress(props) {
    return (
        <div className="salon-address-section">
            <div className="title-container">
                <p className="mb-0">Salon Address</p>
            </div>
            {props.gotOrderDetails && props.gotOrderDetails.data && props.gotOrderDetails.data.order.salon
                ? <div className="address-container d-flex align-items-center">
                    <div className="salon-image">
                        <img src={props.gotOrderDetails.data.order.salon.logo ? `${process.env.REACT_APP_IMAGE_URL}${props.gotOrderDetails.data.order.salon.logo}` : "/assets/home/book_again_salon.png"}
                            alt="Salon" />
                    </div>
                    <div>
                        <p className="name">{props.gotOrderDetails.data.order.salon.name}</p>
                        <p className="address mb-0">{props.gotOrderDetails.data.order.salon.address.line_1}, {props.gotOrderDetails.data.order.salon.address.city}, {props.gotOrderDetails.data.order.salon.address.state}, {props.gotOrderDetails.data.order.salon.address.pincode}</p>
                    </div>
                </div> : ""}
        </div>
    );
}

export default SalonAddress;
