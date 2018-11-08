import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Routes from "../Routes/Routes";
import store from "../../redux/index";
import { setStores } from "../../ducks/Stores";
import StoresApi from "../../utils/api/StoresAPI";
import Login from "../Pages/Login";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "../Menu/Menu";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    });
  };

  componentDidMount() {
    // Fetching init app data
    const storesApi = new StoresApi();

    Promise.all([storesApi.fetchStores()])
      .then(dataCollection => {
        store.dispatch(setStores(dataCollection[0].data));
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    if (false === this.props.user.loggedIn) {
      return <Login />;
    }

    const { classes, theme } = this.props;

    return (
      <BrowserRouter>
        <div className="app">
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={classNames(classes.appBar, {
                [classes.appBarShift]: this.state.open
              })}
            >
              <Toolbar disableGutters={!this.state.open}>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.toggleMenu}
                  className={classNames(classes.menuButton, {
                    [classes.hide]: this.state.open
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                  Betterdeals
                </Typography>
              </Toolbar>
            </AppBar>

            <Menu 
              open={this.state.open} 
              toggle={this.toggleMenu} />

            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Routes />
            </main>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({});

const connectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default withStyles(styles, { withTheme: true })(connectedApp);
