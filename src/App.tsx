import React from "react";
import styled from "styled-components";
import Map from "./components/Map";
import { useMap } from "./context/MapProvider";
import Header from "./components/Header";
import CommandForm from "./components/CommandForm";
import FileInput from "./components/FileInput";
import SiteReport from "./components/SiteReport";
import CommandList from "./components/CommandList";
import Message from "./components/Message";

const AppParent = styled.div`
  background-color: #f1efed;
  width: 100%;
  padding: 60px 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CanvasParent = styled.div`
  background-color: #e0ddda;
  padding: 30px 0px 0px 0px;
`;

const InputContainer = styled.div`
  margin-top: 30px;
  height: 40px;
  background-color: #312d2a;
  padding: 20px 0px;
  display: flex;
  justify-content: center;
`;

const ReportContainer = styled.div`
  margin-top: 20px;
  padding: 0px;
  display: flex;
  justify-content: center;
`;

export default function App(): JSX.Element {
  const { state, dispatch } = useMap();

  return (
    <AppParent>
      <Header />
      <CanvasParent>
        <Map width={785} height={400} />
        {state.message.length > 0 ? (
          <Message message={state.message} dispatch={dispatch} />
        ) : (
          <InputContainer>
            {state.simInProgress ? <CommandForm /> : <FileInput />}
          </InputContainer>
        )}
      </CanvasParent>
      <ReportContainer>
        <SiteReport />
        <CommandList />
      </ReportContainer>
    </AppParent>
  );
}
