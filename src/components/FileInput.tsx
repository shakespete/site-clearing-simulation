import React, { useRef } from "react";
import { useMap } from "../context/MapProvider";
import { endSimulation } from "../actions";

const validateInput = (inputArr: string[]): boolean => {
  const arr = inputArr.map((a: string) => a.length);
  const unequalStringLen = arr.every((val, i, len) => val === len[0]);
  const invalidLettersCheck = inputArr.map((a: string) =>
    a.match(/^[o,r,t,T]+$/g)
  );
  const invalidLetter = invalidLettersCheck.every((val) => val !== null);
  return unequalStringLen && invalidLetter;
};

export default function FileInput(): JSX.Element {
  const { dispatch } = useMap();

  let fileReader: any;
  const processLayout = () => {
    const content = fileReader.result;
    const mapString = content.split("\n");
    const mapTrimmed = mapString.map((s: string) =>
      s.replace(/\r\n|\n|\r/gm, "")
    );

    const validInput = validateInput(mapTrimmed);
    if (!validInput) return dispatch(endSimulation("Invalid Input Data"));

    const mapLayout = mapTrimmed.map((row: string) => row.split(""));
    if (mapTrimmed?.length) {
      return dispatch({
        type: "GENERATE_MAP",
        payload: mapLayout,
      });
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      fileReader = new FileReader();
      fileReader.onloadend = processLayout;
      fileReader.readAsText(file);
    }
  };

  const fileInput = useRef<HTMLInputElement>(null);
  const triggerFileInput = () => {
    fileInput?.current?.click();
  };

  return (
    <>
      <div className="btn" onClick={triggerFileInput}>
        File Input
      </div>
      <input
        data-testid="text-file-input"
        type="file"
        name="siteMap"
        accept="text/plain"
        ref={fileInput}
        onChange={onChange}
        hidden
      ></input>
    </>
  );
}
