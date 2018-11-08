import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import FilterList from "@material-ui/icons/FilterList";
import ShopTwo from "@material-ui/icons/ShopTwo";
import ViewModule from "@material-ui/icons/ViewModule";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import classNames from "classnames";
import IconButton from "@material-ui/core/IconButton";

import './Menu.css';

const drawerWidth = 240;

const styles = theme => ({
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  }
});

class Menu extends React.Component {
  render() {
    const { classes, theme, open, toggle } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !open && classes.drawerPaperClose
          )
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={toggle}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <NavLink to="/stores">
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Магазины"
              />
            </MenuItem>
          </NavLink>
          <NavLink to="/tags">
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <FilterList />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Теги фильтрации"
              />
            </MenuItem>
          </NavLink>
          <NavLink to="/categories">
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <ShopTwo />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Категории"
              />
            </MenuItem>
          </NavLink>
          <NavLink to="/products">
            <MenuItem className={classes.menuItem}>
              <ListItemIcon className={classes.icon}>
                <ViewModule />
              </ListItemIcon>
              <ListItemText
                classes={{ primary: classes.primary }}
                inset
                primary="Товары"
              />
            </MenuItem>
          </NavLink>
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}
// <Paper>
//   <MenuList>

//   </MenuList>
// </Paper>

export default withStyles(styles, { withTheme: true })(Menu);
