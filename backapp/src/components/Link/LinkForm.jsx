import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ReactDOM from "react-dom";
import { main } from "../../utils/config/main";
import OutlinedInput from "@material-ui/core/OutlinedInput";


const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  },
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

class LinkForm extends Component {

  constructor(props) {
    super(props);

    this.form = React.createRef();

    this.state = {
      values: {
        name: '',
        href: '',
        status: '',
        category: '',
        store: ''
      },
      errors: {},
      labelWidth: 0,
      categoryLabelWidth: 0,
      storeLabelWidth: 0
    }
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
      categoryLabelWidth: ReactDOM.findDOMNode(this.categoryLabelWidth).offsetWidth,
      storeLabelWidth: ReactDOM.findDOMNode(this.storeLabelWidth).offsetWidth,
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.formSubmitHandler(this.state.values);
  };

  handleInputChange = (e) => {

      let values = {
        ...this.state.values,
        [e.target.name]: e.target.value
      };

      console.log(values);

      this.setState({ values });
  }

  handleStatusChange = (e) => {
    let status = e.target.value;
    let values = {
      ...this.state.values,
      status
    }
    this.setState({ values })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="stores__form">
        <Paper className="stores__form-inner" elevation={1}>
          <Typography variant="h5" component="h3">
            Добавление новой ссылки
          </Typography>

          <form onSubmit={this.handleSubmit} noValidate autoComplete="off">

            <div className="form-item">
              <TextField
                id="outlined-uncontrolled"
                label="Название"
                value={this.state.values.name}
                onChange={this.handleInputChange}
                name="name"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="form-item">
              <TextField
                id="outlined-uncontrolled"
                label="Href"
                value={this.state.values.href}
                onChange={this.handleInputChange}
                name="href"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </div>

            <div className="form-item">
              <FormControl 
                variant="outlined" 
                className={classes.formControl}>
                <InputLabel
                  ref={ref => {
                    this.InputLabelRef = ref;
                  }}
                  htmlFor="outlined-age-simple">
                  Статус
                </InputLabel>
                <Select
                  value={this.state.values.status}
                  onChange={this.handleStatusChange}
                  width={200}
                  input={
                    <OutlinedInput
                      name="status"
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

            <div className="form-item">
              <FormControl 
                variant="outlined" 
                className={classes.formControl}>
                <InputLabel
                  ref={ref => {
                    this.storeLabelWidth = ref;
                  }}
                  htmlFor="outlined-age-simple">
                  Для магазина
                </InputLabel>
                <Select
                  value={this.state.values.store}
                  onChange={this.handleInputChange}
                  width={200}
                  input={
                    <OutlinedInput
                      name="store"
                      labelWidth={this.state.storeLabelWidth}
                      id="outlined-age-simple"
                    />
                  }
                >
                  {this.props.stores.map(item => {
                    return (
                      <MenuItem key={item.name} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="form-item">
              <FormControl 
                variant="outlined" 
                className={classes.formControl}>
                <InputLabel
                  ref={ref => {
                    this.categoryLabelWidth = ref;
                  }}
                  htmlFor="outlined-age-simple">
                  Категория
                </InputLabel>
                <Select
                  value={this.state.values.category}
                  onChange={this.handleInputChange}
                  width={200}
                  input={
                    <OutlinedInput
                      name="category"
                      labelWidth={this.state.categoryLabelWidth}
                      id="outlined-age-simple"
                    />
                  }
                >
                  {this.props.categories.map(item => {
                    return (
                      <MenuItem key={item.name} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="stores__form-item">
              <Button type="submit" variant="contained" color="primary">
                Сохранить
              </Button>
            </div>
          </form>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  stores: state.stores.collection,
  categories: state.categories.collection
});

const mapDispatchToProps = dispatch => ({});

const connectedForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkForm);

export default withStyles(styles)(connectedForm);
