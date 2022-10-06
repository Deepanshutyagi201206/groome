import React from "react";

import { Outlet, Navigate } from "react-router-dom";
import Islogin from "../islogin";

function Privateroutes() {

    return (
        <>
            {Islogin() ? (
                <>
                    <Outlet />
                </>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}

export default Privateroutes;