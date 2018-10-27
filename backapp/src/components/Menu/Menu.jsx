import React from 'react';
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import FilterList from '@material-ui/icons/FilterList';
import ShopTwo from '@material-ui/icons/ShopTwo';
import ViewModule from '@material-ui/icons/ViewModule';
import { NavLink } from 'react-router-dom';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

function ListItemComposition(props) {
  const { classes } = props;

  return (
    <Paper>
      <MenuList>
        <NavLink to="/stores">
            <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <ShoppingCart />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Магазины" />
            </MenuItem>
        </NavLink>
        <NavLink to="/tags">
            <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <FilterList />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Теги фильтрации" />
            </MenuItem>
        </NavLink>
        <NavLink to="/categories">
            <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <ShopTwo />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Категории" />
            </MenuItem>
        </NavLink>
        <NavLink to="/products">
            <MenuItem className={classes.menuItem}>
                    <ListItemIcon className={classes.icon}>
                        <ViewModule />
                    </ListItemIcon>
                    <ListItemText classes={{ primary: classes.primary }} inset primary="Товары" />
            </MenuItem>
        </NavLink>
      </MenuList>
    </Paper>
  );
}

ListItemComposition.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ListItemComposition);
