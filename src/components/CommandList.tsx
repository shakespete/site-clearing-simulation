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
import { ICommandRowProps } from "../interfaces";

const useStyles = makeStyles({
  container: {
    height: "235px",
    width: "250px",
  },
  thead: {
    backgroundColor: "#424242",
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  tbody: {
    backgroundColor: "#fff",
    color: "#424242",
    overflowY: "auto",
  },
});

const CommandRow = ({ index, command }: ICommandRowProps): JSX.Element => {
  const comm = command.split(" ");
  const turn = comm[0] === "l" ? "Turn Left" : "Turn Right";

  return (
    <TableCell>
      <strong>{index + 1}:</strong>&nbsp;
      {comm[0] === "a" ? `Advance ${comm[1]}` : turn}
    </TableCell>
  );
};

export default function CommandList(): JSX.Element {
  const { state } = useMap();
  const classes = useStyles();

  return (
    <Paper>
      <TableContainer className={classes.container}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.thead}>Issued Commands</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tbody}>
            {state.commList.map((comm: string, idx: number) => (
              <TableRow key={idx}>
                <CommandRow index={idx} command={comm} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
