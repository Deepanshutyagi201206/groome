import React from "react"

function NotFound() {
    return <div className="not-found text-center d-flex flex-column justify-content-center align-items-center">
        <img src="/assets/salonsbysearch/not_found.png" alt="Not found" />
        <p className="mb-0">Sorry! No results found</p>
    </div>
}

export default NotFound