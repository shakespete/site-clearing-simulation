import React from "react";
import styled from "styled-components";
import { IMessageProps } from "../interfaces";

const AppMessage = styled.div`
  font-size: 20px;
  margin-top: 30px;
  height: 40px;
  line-height: 40px;
  vertical-align: middle;
  color: #fff;
  background-color: #e96d5b;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
`;

const Reset = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 0;
  margin-left: 20px;
  height: 40px;
  width: 150px;
  border-radius: 4px;
  border: none;
  background-color: #322e2b;
  color: #ffffff;
  text-shadow: none;
  line-height: 40px;
  vertical-align: middle;
  cursor: pointer;
`;

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
    <AppMessage>
      {message} <Reset onClick={resetApp}>Reset</Reset>
    </AppMessage>
  );
}
