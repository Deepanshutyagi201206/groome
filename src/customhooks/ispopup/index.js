import { useState } from "react";

const useIsPopUp = (props) => {
  const [isPopUp, setIsPopUp] = useState(props);

  return [isPopUp, setIsPopUp];
};

export default useIsPopUp;
