import { useState } from "react";
import axios from "axios";

const usePostData = () => {
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const postData = async (params) => {
    try {
      const postedData = await axios.post(
        params.url,
        params.body,
        { headers: params.headers }
      );

      setData(postedData);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return [data, error, postData];
};

export default usePostData;
