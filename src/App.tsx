import React from "react";
import Map from "./components/Map";
import { useMap } from "./context/MapProvider";
import Header from "./components/Header";
import CommandForm from "./components/CommandForm";
import FileInput from "./components/FileInput";
import SiteReport from "./components/SiteReport";
import CommandList from "./components/CommandList";
import Message from "./components/Message";

export default function App(): JSX.Element {
  const { state, dispatch } = useMap();

  return (
    <div className="appParent">
      <Header />
      <div className="canvasParent">
        <Map width={785} height={400} />
        {state.message.length > 0 ? (
          <Message message={state.message} dispatch={dispatch} />
        ) : (
          <div className="appInputContainer">
            {state.simInProgress ? <CommandForm /> : <FileInput />}
          </div>
        )}
      </div>
      <div className="reportContainer">
        <SiteReport />
        <CommandList />
      </div>
    </div>
  );
}
