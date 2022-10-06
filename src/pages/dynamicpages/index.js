import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetData from "../../customhooks/getdata";

import useIsLoader from "../../customhooks/useisloader";
import Loader from "../../components/loader";

import moment from "moment";

function DynamicPages() {

    const navigate = useNavigate()

    const param = useParams()

    const [gotPage, pageError, getPage] = useGetData();

    const [isLoader, setIsLoader] = useIsLoader(true)

    useEffect(() => {
        getPage({
            url: `${process.env.REACT_APP_API_URL}/app/dynamicPage/search?status=1&title=${param.title}`,
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
    }, []);

    useEffect(() => {
        if (gotPage != undefined && gotPage != null && gotPage != "") {
            setIsLoader(false)
        }
    }, [gotPage])

    const ConvertStringToHTML = () => {
        return { __html: gotPage && gotPage.data && gotPage.data.dynamicPages.length > 0 ? gotPage.data.dynamicPages[0].description : "No description" };
    }

    return (
        <div className="dynamic-page d-grid">
            <div className="header-container d-flex align-items-center">
                <div>
                    <button
                        className="border-0 bg-white"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <img src="/assets/common/back.svg" alt="Back" />
                    </button>
                </div>
                <div className="w-100 text-center">
                    <p className="mb-0">{param.title}</p>
                </div>
            </div>

            {
                isLoader ? <Loader height={60} width={60} color={"#772286"} /> : <div className="description-title-container">
                    <div className="title">
                        <p className="mb-0">{gotPage && gotPage.data && gotPage.data.dynamicPages.length > 0 ? gotPage.data.dynamicPages[0].title : "No title"}</p>
                    </div>
                    <div className="description">
                        <p dangerouslySetInnerHTML={ConvertStringToHTML()}>
                        </p>
                    </div>
                    <div className="last-updated">

                    {gotPage && gotPage.data && gotPage.data.dynamicPages.length > 0 ? <p className="mb-0">Last updated on {moment(gotPage && gotPage.data && gotPage.data.dynamicPages.length > 0 && gotPage.data.dynamicPages[0].updatedAt).format('MM MMMM YYYY')}</p> : ""}
                        
                    </div>
                </div>
            }
        </div>
    );
}

export default DynamicPages