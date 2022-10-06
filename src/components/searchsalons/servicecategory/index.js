import React from "react";

import { useNavigate } from "react-router-dom"

function ServiceCategory(props) {

    const navigate = useNavigate()

    const handleClick = (name)=>{
        navigate(`/searchsalons/serviceCategory/${name}`)
        props.cancel()
    }

    return <>
        {
            props.category.map((item) => {
                return <div key={item._id}>
                    <button onClick={()=>{handleClick(item.name)}} className="category d-flex justify-content-center align-items-center">
                        <div >
                            <img src={item.image ? `${process.env.REACT_APP_IMAGE_URL}${item.image}` : "/assets/home/book_again_salon.png"} alt="Salon" />
                        </div>
                        <div className="info d-flex flex-column text-start">
                            <p className="name mb-0">{item.name}</p>
                            <p className="title mb-0">Service Category</p>
                        </div>
                    </button>
                </div>
            })
        }
    </>
}

export default ServiceCategory