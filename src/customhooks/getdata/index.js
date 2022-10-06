import React from "react";

import { useState } from "react";
import axios from "axios";

const useGetData = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const getData = async (params) => {
    try {
      const gotData = await axios.get(params.url, { headers: params.headers });

      setData(gotData);
    } catch (error) {
      setError(error);
      console.log(error);
      setData(undefined)
    }
  };

  return [data, error, getData];
};

export default useGetData;
