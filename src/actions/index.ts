import { IState, IAction } from "../interfaces";

/**
 * Action Creators
 */

const checkBoundError = (
  dir: string,
  currPos: number,
  bound: number,
  steps: number
): boolean => {
  switch (dir) {
    case "E":
      return currPos + steps >= bound;
    case "W":
      return currPos - steps < 0;
    case "N":
      return currPos - steps < 0;
    case "S":
      return currPos + steps >= bound;
    default:
      return true;
  }
};

export const advance = (store: IState, steps: number): IAction => {
  const siteVis = JSON.parse(JSON.stringify(store.visited));
  const siteMap = store.mapSite;

  const dir = store.currentDirection;
  const totalSteps = steps;

  let cRow = store.currRow;
  let cCol = store.currCol;
  let fuelCost = 0;
  let paintDmg = 0;
  let protectedTree = 0;

  if (dir === "E" || dir === "W") {
    const boundaryError = checkBoundError(dir, cCol, store.totalCols, steps);
    if (boundaryError) {
      return {
        type: "END_SIMULATION",
        payload: "Invalid Command: Exceeds Site Bounds",
      };
    }

    while (steps) {
      dir === "E" ? cCol++ : cCol--;
      const landType = siteMap[cRow][cCol];
      const landVis = siteVis[cRow][cCol];
      switch (landType) {
        case "o":
          fuelCost += 1;
          break;
        case "r":
          landVis === 1 ? (fuelCost += 1) : (fuelCost += 2);
          break;
        case "t":
          if (landVis === 1) {
            fuelCost += 1;
          } else {
            fuelCost += 2;
            if (steps > 1) paintDmg += 1;
          }
          break;
        case "T":
          protectedTree += 1;
          fuelCost += 2;
          if (steps > 1) paintDmg += 1;
          break;
        default:
          break;
      }

      siteVis[cRow][cCol] = 1;
      steps--;
    }
  } else {
    const boundaryError = checkBoundError(dir, cRow, store.totalRows, steps);
    if (boundaryError) {
      return {
        type: "END_SIMULATION",
        payload: "Invalid Command: Exceeds Site Bounds",
      };
    }

    while (steps) {
      dir === "N" ? cRow-- : cRow++;
      const landType = siteMap[cRow][cCol];
      const landVis = siteVis[cRow][cCol];
      switch (landType) {
        case "o":
          fuelCost += 1;
          break;
        case "r":
          landVis === 1 ? (fuelCost += 1) : (fuelCost += 2);
          break;
        case "t":
          if (landVis === 1) {
            fuelCost += 1;
          } else {
            fuelCost += 2;
            if (steps > 1) paintDmg += 1;
          }
          break;
        case "T":
          protectedTree += 1;
          fuelCost += 2;
          if (steps > 1) paintDmg += 1;
          break;
        default:
          break;
      }

      siteVis[cRow][cCol] = 1;
      steps--;
    }
  }

  return {
    type: "ADVANCE",
    payload: {
      row: cRow,
      col: cCol,
      command: `a ${totalSteps}`,
      visited: siteVis,
      fuel: fuelCost,
      paint: paintDmg,
      protected: protectedTree,
    },
  };
};

export const changeDir = (store: IState, comm: string): IAction => {
  const dirObj = {
    command: comm,
    direction: "",
  };

  switch (store.currentDirection) {
    case "N":
      dirObj.direction = comm === "l" ? "W" : "E";
      break;
    case "S":
      dirObj.direction = comm === "l" ? "E" : "W";
      break;
    case "E":
      dirObj.direction = comm === "l" ? "N" : "S";
      break;
    case "W":
      dirObj.direction = comm === "l" ? "S" : "N";
      break;
    default:
      break;
  }

  return {
    type: "CHANGE_DIR",
    payload: dirObj,
  };
};

export const endSimulation = (message: string): IAction => {
  return {
    type: "END_SIMULATION",
    payload: message,
  };
};
