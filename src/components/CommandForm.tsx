import React, { useState } from "react";
import styled from "styled-components";
import { useMap } from "../context/MapProvider";
import { advance, changeDir, endSimulation } from "../actions";

const CommandInput = styled.input`
  height: 30px;
  font-size: 18px;
`;

const CurrDirection = styled.span`
  color: #fff;
  margin-left: 20px;
`;

export default function CommandForm(): JSX.Element {
  const [command, setCommand] = useState("");
  const { state, dispatch } = useMap();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const commArray = command.trim().toLowerCase().split(" ");
    if (commArray[0].length > 0) {
      const comm = commArray[0];

      if ((comm === "a" || comm === "advance") && commArray.length === 2) {
        if (
          state.currRow === 0 &&
          state.currCol === -1 &&
          state.currentDirection !== "E"
        ) {
          setCommand("");
          return dispatch(
            endSimulation("Invalid Command: Exceeds Site Bounds")
          );
        }
        const steps: number = parseInt(commArray[1], 10);
        if (!isNaN(steps)) {
          setCommand("");
          dispatch(advance(state, steps));
        }
      } else if (comm === "l" || comm === "left") {
        setCommand("");
        dispatch(changeDir(state, "l"));
      } else if (comm === "r" || comm === "right") {
        setCommand("");
        dispatch(changeDir(state, "r"));
      } else if (comm === "q" || comm === "quit") {
        setCommand("");
        dispatch(endSimulation("Simulation Ended by User"));
      }
    }
  };

  return (
    <form onSubmit={submit}>
      <CommandInput
        data-testid="command-input"
        type="text"
        onChange={onChangeHandler}
        value={command}
      />
      <CurrDirection>
        Current Direction: <strong>{state.currentDirection}</strong>
      </CurrDirection>
    </form>
  );
}
