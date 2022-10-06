import React from "react";

import { useEffect } from "react";
import useGetData from "../getdata";

const useUserId = () => {
  const [userId, userError, getUserId] = useGetData();

  useEffect(() => {
    getUserId({
      url: `${process.env.REACT_APP_API_URL}/user/loggedInUser/getId`,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }, []);

  return [userId, userError];
};

export default useUserId;
