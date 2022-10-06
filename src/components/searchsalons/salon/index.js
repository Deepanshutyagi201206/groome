import React from "react";

import { Link } from "react-router-dom"

function Salon(props) {

    return <>
        {
            props.salons.map((item) => {
                return <div key={item._id}>
                    <Link to={`/salon/${item.name}_${item._id}`} className="salon d-flex">
                        <div>
                            <img
                                src={item.logo ? `${process.env.REACT_APP_IMAGE_URL}${item.logo}` : "/assets/home/book_again_salon.png"}
                                alt="Salon"
                            />
                        </div>
                        <div className="info d-flex flex-column justify-content-center">
                            <p className="name mb-0">{item.name}</p>
                            <p className="address mb-0">{item.address.city}</p>
                        </div>
                    </Link>                </div>
            })
        }
    </>

}

export default Salon