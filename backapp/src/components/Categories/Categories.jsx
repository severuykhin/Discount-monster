import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

const Categories = (props) => {
  const { classes, collection } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell >Название</TableCell>
            <TableCell >Статус</TableCell>
            <TableCell >Действия</TableCell>
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
                <TableCell></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

Categories.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
