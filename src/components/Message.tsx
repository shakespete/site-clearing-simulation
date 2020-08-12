import React from "react";
import { IMessageProps } from "../interfaces";

export default function Message({
  message,
  dispatch,
}: IMessageProps): JSX.Element {
  const resetApp = () => {
    dispatch({
      type: "RESET_SIM",
      payload: "",
    });
  };

  return (
    <div className="appMessage">
      {message}{" "}
      <button className="btnReset" onClick={resetApp}>
        Reset
      </button>
    </div>
  );
}
