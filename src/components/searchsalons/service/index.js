import React from "react";

import { useNavigate } from "react-router-dom"

function Service(props) {

    const navigate = useNavigate()

    const handleClick = (key)=>{
        navigate(`/searchsalons/service/${key}`)
        props.cancel()
    }

    return <>
        {
            Object.keys(props.services).map((key, index) => {
                return <div key={index} >
                    <button onClick={()=>{handleClick(key)}} className="service d-flex">
                        {/* <div>
                            <img src={`
    https://getlookplus-v2-2502.herokuapp.com${item.image}`} alt="Salon" />
                        </div> */}
                        <div className="info d-flex flex-column justify-content-center">
                            <p className="name mb-0">{key}</p>
                            <p className="title mb-0">Service</p>
                        </div>
                    </button>
                </div>
            })
        }
    </>
}

export default Service