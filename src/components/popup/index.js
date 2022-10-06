import React, { useCallback, useEffect } from "react";

function PopUp(props) {

  const callback = useCallback(() => {
    document.body.style.overflow = "scroll";

    if (props.isSearchServices || props.isSearchProducts) {
      document.body.style.overflow = "hidden";
    }
    if (props.setPopUpMessage) {
      props.setPopUpMessage("")
    }
  })

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return callback
  }, [])

  const cancel = () => {
    props.setIsPopUp(false);
    document.body.style.overflow = "scroll";

    if (props.isSearchServices || props.isSearchProducts) {
      document.body.style.overflow = "hidden";
    }
    if (props.setPopUpMessage) {
      props.setPopUpMessage("")
    }
  };

  return (
    <div
      className="popup-page d-flex justify-content-center align-items-center"
    >
      <div className="popup d-flex flex-column justify-content-center align-items-center">
        <p className="mb-0 text-center">{props.message}</p>
        <button
          onClick={() => {
            cancel();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default PopUp;
