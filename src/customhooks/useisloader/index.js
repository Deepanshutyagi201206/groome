import { useState } from "react";

const useIsLoader = (props) => {
  const [isLoader, setIsLoader] = useState(props);

  return [isLoader, setIsLoader];
};

export default useIsLoader;
