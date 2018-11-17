import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const Links = props => {
  const { classes, collection, deleteHandler, editHandler } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Название</TableCell>
            <TableCell>Статус</TableCell>
            <TableCell>href</TableCell>
            <TableCell>Категория</TableCell>
            <TableCell>Магазин</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {collection.map(item => {
            return (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.id}
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.href}</TableCell>
                <TableCell>{item.categories && item.categories.name}</TableCell>
                <TableCell>{item.store.name}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => { editHandler(item.id) }} 
                    aria-label="Edit" 
                    className={classes.button}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => { deleteHandler(item.id) }} 
                    aria-label="Delete" 
                    className={classes.button}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

Links.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Links);

