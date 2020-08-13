import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { IMapProps } from "../interfaces";
import { useMap } from "../context/MapProvider";
import VirtualControls from "../components/VirtualControls";

const MapContainer = styled.div`
  position: relative;
`;

const Canvas = styled.canvas`
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #01678c;
`;

export default function Map({ width, height }: IMapProps): JSX.Element {
  const { state } = useMap();
  const layout = state.mapSite;
  const passed = state.visited;
  const rows = state.totalRows;
  const cols = state.totalCols;

  const len = 30;
  const pad = 35;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    ctx?.clearRect(0, 0, width, height);

    if (canvas && rows && cols) {
      if (ctx) {
        for (let i = 0; i < rows; ++i) {
          for (let j = 0; j < cols; ++j) {
            switch (layout[i][j]) {
              case "o":
                ctx.strokeStyle = "#0FAAF5";
                break;
              case "r":
                ctx.strokeStyle = "#F58C0C";
                break;
              case "t":
                ctx.strokeStyle = "#95F518";
                break;
              case "T":
                ctx.strokeStyle = "#CE0CF5";
                break;
              default:
                break;
            }
            ctx.font = "16px serif";
            if (passed[i][j] === 1) {
              ctx.fillStyle = "#60bf49a8";
              ctx.fillRect(j * pad + 10, i * pad + 10, len, len);
            }
            ctx.strokeRect(j * pad + 10, i * pad + 10, len, len);
            ctx.fillStyle = "#312d2a";
            ctx.fillText(layout[i][j], j * pad + 21, i * pad + 30);
          }
        }
      }
    }
  }, [layout, passed, rows, cols, width, height]);
  return (
    <MapContainer>
      <Canvas ref={canvasRef} width={width} height={height} />
      {state.simInProgress && <VirtualControls />}
    </MapContainer>
  );
}
