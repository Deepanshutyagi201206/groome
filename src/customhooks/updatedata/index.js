import { useState } from "react";
import axios from "axios";

const useUpdateData = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const updateData = async (params) => {
    try {
      const updatedData = await axios.put(params.url, params.body, {
        headers: params.headers,
      });

      setData(updatedData);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return [data, error, updateData];
};

export default useUpdateData;
