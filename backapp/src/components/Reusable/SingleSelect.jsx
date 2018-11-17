import React, { Component } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ReactDOM from "react-dom";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  textField: {
    marginBottom: 25
  },
  formControl: {
    minWidth: 200,
    marginBottom: 15
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  }
});

class SingleSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      labelWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {

    const { classes, title, value, name, variants, handleChange, error } = this.props;

    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel
          ref={ref => {
            this.InputLabelRef = ref;
          }}
          htmlFor="outlined-age-simple">

        { title }

        </InputLabel>
        <Select
          value={ value }
          onChange={ handleChange }
          width={200}
          error={error}
          input={
            <OutlinedInput
              name={ name }
              labelWidth={this.state.labelWidth}
              id="outlined-age-simple"/>
          }>

          { variants.map(item => {
            return (
              <MenuItem key={item.name} value={item.id}>
                {item.name}
              </MenuItem>
            );
          }) }

        </Select>
      </FormControl>
    );
  }
}

export default withStyles(styles)(SingleSelect);
