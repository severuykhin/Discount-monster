import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ReactDOM from "react-dom";
import { main } from "../../utils/config/main";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class CategoriesHead extends Component {

  constructor(props) {
    super(props);

    this.form = React.createRef();

    this.state = {
      hasError: false,
      labelWidth: 0,
      status: 'active'
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = new FormData(this.form.current);
    this.props.createCategory(data);
  }

  handleSelectChange = e => {
    this.setState({
      status: e.target.value
    });
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth
    });
  }

  render() {

    const { classes } = this.props;

    return (
      <div>
        <form
          ref={this.form}
          onSubmit={this.handleSubmit}
          className="tags__form"
        >
          <div className="tags__form-item">
            <TextField
              id="outlined-uncontrolled"
              label="Добавить"
              defaultValue=""
              name="Category[name]"
              className={classes.textField}
              margin="normal"
              variant="outlined"
              error={this.state.hasError}
            />
          </div>

          <div className="tags__form-item">
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                ref={ref => {
                  this.InputLabelRef = ref;
                }}
                htmlFor="outlined-age-simple">
                Статус
              </InputLabel>
              <Select
                value={this.state.status}
                onChange={this.handleSelectChange}
                width={200}
                input={
                  <OutlinedInput
                    name="Category[status]"
                    labelWidth={this.state.labelWidth}
                    id="outlined-age-simple"
                  />
                }
              >
                {main.statuses.map(item => {
                  return (
                    <MenuItem key={item.name} value={item.value}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div className="tags__form-item">
            <Button
              variant="fab"
              type="submit"
              mini
              color="secondary"
              aria-label="Add"
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(CategoriesHead);
