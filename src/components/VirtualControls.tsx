import React, { useState } from "react";
import styled from "styled-components";
import { advance, changeDir, endSimulation } from "../actions";
import { IAction } from "../interfaces";
import { useMap } from "../context/MapProvider";

const VirtualCtrlContainer = styled.div`
  position: absolute;
  bottom: 0px;
  right: 150px;
`;

const CtrlRow = styled.div`
  display: flex;
`;

const VirtualBtn = styled.button`
  width: 50px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  background-color: #424242;
  border: none;
  border-radius: 4px;
  outline: none;
  margin: 3px;
`;

const CtrlInput = styled.input`
  width: 42px;
  font-size: 20px;
  text-align: center;
  margin: 3px;
`;

const QuitBtn = styled.button`
  width: 106px;
  height: 50px;
  text-align: center;
  cursor: pointer;
  font-size: 18px;
  color: #fff;
  background-color: #424242;
  border: none;
  border-radius: 4px;
  outline: none;
  margin: 3px;
`;

export default function VirtualControls(): JSX.Element {
  const { state, dispatch } = useMap();
  const [blocks, setBlocks] = useState(1);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBlocks(parseInt(e.target.value, 10));
  };

  const advanceHandler = () => {
    if (blocks > 0) return dispatch(advance(state, blocks));
  };

  const turnHandler = (dir: string): IAction => {
    return dispatch(changeDir(state, dir));
  };

  const quitHandler = (): IAction => {
    return dispatch(endSimulation("Simulation Ended by User"));
  };

  return (
    <VirtualCtrlContainer data-testid="virtual-control">
      <CtrlRow>
        <VirtualBtn data-testid="adv-btn" onClick={advanceHandler}>
          A
        </VirtualBtn>
        <CtrlInput
          data-testid="steps-input"
          onChange={onChangeHandler}
          type="number"
          value={blocks}
        />
      </CtrlRow>
      <CtrlRow>
        <VirtualBtn data-testid="left-btn" onClick={() => turnHandler("l")}>
          L
        </VirtualBtn>
        <VirtualBtn data-testid="right-btn" onClick={() => turnHandler("r")}>
          R
        </VirtualBtn>
      </CtrlRow>
      <QuitBtn data-testid="quit-btn" onClick={quitHandler}>
        QUIT
      </QuitBtn>
    </VirtualCtrlContainer>
  );
}
