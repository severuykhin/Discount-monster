import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

const LinkHead = (props) => {
    
  const { classes, addBtnHandler } = props;

  return (
    <div className="stores__head">
      <h1>
        <span>Ссылки для парсинга</span>
        <Button
          variant="fab"
          onClick={() => {
            addBtnHandler();
          }}
          mini
          color="secondary"
          aria-label="Add"
          className={classes.button}
        >
          <AddIcon />
        </Button>
      </h1>
    </div>
  );
};

export default withStyles(styles)(LinkHead);
