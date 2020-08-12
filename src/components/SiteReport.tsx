import React from "react";
import { useMap } from "../context/MapProvider";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  container: {
    height: "235px",
    width: "550px",
    marginRight: "20px",
  },
  table: {
    backgroundColor: "#424242",
    borderColor: "grey",
  },
  thead: {
    textAlign: "left",
    color: "#fff",
    fontWeight: "bold",
  },
  tbody: {
    backgroundColor: "#fff",
    color: "#424242",
  },
  theadcost: {
    textAlign: "right",
    color: "#fff",
    fontWeight: "bold",
  },
  tcost: {
    textAlign: "right",
  },
  totalHead: {
    textAlign: "left",
    fontWeight: "bold",
  },
  total: {
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default function SiteReport(): JSX.Element {
  const { state } = useMap();
  const classes = useStyles();

  const commOHCost = state.commList.length;
  const fuelUseCost = state.fuelUsage;
  const unclearedCost = state.unclearedSquares * 3;
  const paintCost = state.paintDmg * 2;
  const protTreeCost = state.protectedTree * 10;
  const totalCost =
    commOHCost + fuelUseCost + unclearedCost + protTreeCost + paintCost;

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.thead}>Item</TableCell>
            <TableCell className={classes.theadcost}>Quantity</TableCell>
            <TableCell className={classes.theadcost}>Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tbody}>
          <TableRow>
            <TableCell>Communication Overhead</TableCell>
            <TableCell className={classes.tcost}>{commOHCost}</TableCell>
            <TableCell className={classes.tcost}>{commOHCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Fuel Usage</TableCell>
            <TableCell className={classes.tcost} data-testid="fuel-cost">
              {fuelUseCost}
            </TableCell>
            <TableCell className={classes.tcost}>{fuelUseCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Uncleared Squares</TableCell>
            <TableCell className={classes.tcost}>
              {state.unclearedSquares}
            </TableCell>
            <TableCell className={classes.tcost}>{unclearedCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Destruction of Protected Tree</TableCell>
            <TableCell className={classes.tcost} data-testid="destruction-cost">
              {state.protectedTree}
            </TableCell>
            <TableCell className={classes.tcost}>{protTreeCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paint Damage to Bulldozer</TableCell>
            <TableCell className={classes.tcost}>{state.paintDmg}</TableCell>
            <TableCell className={classes.tcost}>{paintCost}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.totalHead}>Total</TableCell>
            <TableCell></TableCell>
            <TableCell className={classes.total} data-testid="total-cost">
              {totalCost}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
