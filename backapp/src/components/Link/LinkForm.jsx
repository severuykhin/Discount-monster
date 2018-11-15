import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { main } from "../../utils/config/main";
import SingleSelect from '../Reusable/SingleSelect';

const formattedStatues = main.statuses.map(i => ({ name: i.name, id: i.value }));

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
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

  handleSubmit = e => {
    e.preventDefault();
    this.props.formSubmitHandler(this.state.values);
  };

  handleInputChange = (e) => {

      let values = {
        ...this.state.values,
        [e.target.name]: e.target.value
      };

      this.setState({ values });
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
              <SingleSelect
                variants={this.props.stores}
                name="store"
                handleChange={this.handleInputChange}
                value={this.state.values.store} 
                title="Для магазина" />
            </div>

            <div className="form-item">
              <SingleSelect
                variants={this.props.categories}
                name="category"
                handleChange={this.handleInputChange}
                value={this.state.values.category} 
                title="Категория" />
            </div>

            <div className="form-item">
              <SingleSelect
                variants={formattedStatues}
                name="status"
                handleChange={this.handleInputChange}
                value={this.state.values.status} 
                title="Статус" />
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
