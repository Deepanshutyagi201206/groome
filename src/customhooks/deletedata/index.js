import React from "react";

import { useState } from "react";
import axios from "axios";

const useDeleteData = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const deleteData = async (params) => {
    try {
      const deletedData = await axios.delete(
        params.url,
        {
          headers: params.headers,
        },
        params.body
      );

      setData(deletedData);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return [data, error, deleteData];
};

export default useDeleteData;
