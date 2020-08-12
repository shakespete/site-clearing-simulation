/**
 * Interface List
 */

export type MapLayout = IMapRow[];
export type VisLayout = IVisRow[];
export type CommList = string[];
export type Dispatch = React.Dispatch<IAction>;

export type IMapRow = string[];
export type IVisRow = number[];

export interface IContext {
  state: IState;
  dispatch: Dispatch;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IMessageProps {
  message: string;
  dispatch: Dispatch;
}

export interface IState {
  currentDirection: string;
  mapSite: MapLayout;
  visited: VisLayout;
  commList: CommList;
  commCount: number;
  fuelUsage: number;
  paintDmg: number;
  protectedTree: number;
  totalRows: number;
  totalCols: number;
  unclearedSquares: number;
  currRow: number;
  currCol: number;
  simInProgress: boolean;
  message: string;
}

export interface IMapProps {
  width: number;
  height: number;
}

export interface ICommandRowProps {
  index: number;
  command: string;
}
