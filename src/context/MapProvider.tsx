import React, { createContext, useContext, useReducer } from "react";
import { IState, IAction } from "../interfaces";

const initialState: IState = {
  currentDirection: "E",
  mapSite: [],
  visited: [],
  commList: [],
  commCount: 0,
  fuelUsage: 0,
  paintDmg: 0,
  protectedTree: 0,
  totalRows: 0,
  totalCols: 0,
  unclearedSquares: 0,
  currRow: 0,
  currCol: -1,
  simInProgress: false,
  message: "",
};

const MapContext = createContext<IState | any>(initialState);
export const useMap = (): any => useContext(MapContext);

const computeTotal = (store: IState): number => {
  let uncleared = 0;
  for (let i = 0; i < store.totalRows; ++i) {
    for (let j = 0; j < store.totalCols; ++j) {
      if (store.visited[i][j] === 0 && store.mapSite[i][j] !== "T") {
        uncleared++;
      }
    }
  }
  return uncleared;
};

function reducer(state: IState, action: IAction): IState {
  const mapLayout = action.payload;
  const mapRows = mapLayout.length;
  const mapCols = mapLayout[0]?.length;
  const visitedMap = Array(mapRows);
  switch (action.type) {
    case "GENERATE_MAP":
      for (let i = 0; i < mapRows; ++i) {
        visitedMap[i] = Array(mapCols).fill(0);
      }

      return {
        ...state,
        mapSite: action.payload,
        visited: visitedMap,
        totalRows: mapRows,
        totalCols: mapCols,
        simInProgress: true,
      };
    case "ADVANCE": {
      let message = "";
      let unclearedTotal = 0;
      if (action.payload.protected) {
        message = "Destruction of Protected Tree";
        unclearedTotal = computeTotal(state);
      }

      return {
        ...state,
        currRow: action.payload.row,
        currCol: action.payload.col,
        commList: [...state.commList, action.payload.command],
        visited: action.payload.visited,
        fuelUsage: state.fuelUsage + action.payload.fuel,
        paintDmg: state.paintDmg + action.payload.paint,
        protectedTree: action.payload.protected,
        unclearedSquares: unclearedTotal,
        message,
      };
    }
    case "CHANGE_DIR": {
      return {
        ...state,
        commList: [...state.commList, action.payload.command],
        currentDirection: action.payload.direction,
      };
    }
    case "END_SIMULATION": {
      const unclearedTotal = computeTotal(state);

      return {
        ...state,
        simInProgress: false,
        message: action.payload,
        unclearedSquares: unclearedTotal,
      };
    }
    case "RESET_SIM": {
      return initialState;
    }
    default:
      return state;
  }
}

export function MapProvider({
  children,
}: JSX.ElementChildrenAttribute): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MapContext.Provider value={{ state, dispatch }}>
      {children}
    </MapContext.Provider>
  );
}
