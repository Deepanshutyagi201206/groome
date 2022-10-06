import React from "react";
import { TailSpin } from "react-loader-spinner";

function Loader(props) {
  return (
    <div className="loader d-grid justify-content-center align-items-center m-auto">
      <TailSpin color={props.color} height={props.width} width={props.height} />
    </div>
  );
}

export default Loader;
