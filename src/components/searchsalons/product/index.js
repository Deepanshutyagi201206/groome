import React from "react";

import {useNavigate } from "react-router-dom"

function Product(props) {

    const navigate = useNavigate()

    const handleClick = (key)=>{
        navigate(`/searchsalons/product/${key}`)
        props.cancel()
    }

    return <>
        {
            Object.keys(props.products).map((key, index) => {
                console.log(key)
                return <div key={index} >
                    <button onClick={()=>{handleClick(key)}} className="product d-flex">
                        {/* <div>
                            <img src={`
    https://getlookplus-v2-2502.herokuapp.com${item.image}`} alt="Salon" />
                        </div> */}
                        <div className="info d-flex flex-column justify-content-center">
                            <p className="name mb-0">{key}</p>
                            <p className="title mb-0">Product</p>
                        </div>
                    </button>
                </div>
            })
        }
    </>
}

export default Product