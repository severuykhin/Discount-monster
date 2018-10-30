import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

function StoresHead(props) {

    const { classes, addBtnHandler } = props;

    return (
        <div className="stores__head">
            <h1>
                <span>Магазины</span>
                <Button 
                    variant="fab" 
                    onClick={() => { addBtnHandler() }}
                    mini 
                    color="secondary" 
                    aria-label="Add" 
                    className={classes.button} >
                    <AddIcon />
                </Button>
            </h1>
        </div>
    )
}

export default withStyles(styles)(StoresHead);
