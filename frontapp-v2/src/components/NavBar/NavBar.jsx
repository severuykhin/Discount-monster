import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Searchbar from "../Searchbar/Searchbar";
import FavoriteWidget from "../FavoriteWidget/FavoriteWidget";
import ButtonIcon from "../common/Button/ButtonIcon";
import IconSearch from "../common/Icon/IconSearch";
import { connect } from "react-redux";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navOpen: false
    };
  }

  renderNavigation() {
    return (
      <div className="rcl--navbar__list">
        <div className="rcl--navbar__list-wrap">
          <div className="rcl--navbar__list-row">
            <div className="rcl--navbar__list-title">Магазины</div>
            {this.renderItems(this.props.stores)}
          </div>
          <div className="rcl--navbar__list-row">
            <div className="rcl--navbar__list-title">Категории</div>
            {this.renderItems(this.props.categories)}
          </div>
        </div>
      </div>
    );
  }

  renderItems(data) {
    return (
      <ul className="rcl--navbar__list-items">
        {data.collection.map((item, index) => {
          return (
            <li key={`${item.id}${index}`} className="rcl--navbar__list-item">
              <NavLink
                className="rcl--navbar__list-link"
                to={`/${data.name}/${item.slug}`}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen
    });
  }

  render() {
    return (
      <nav className="rcl--navbar">
        <div className="rcl--navbar__row">
          <div className="rcl--navbar__item">
            <button
              onClick={this.toggleNav} 
              className="rcl--navbar__button rcl--button">
              <span>Каталог</span>
            </button>
          </div>
          <div className="rcl--navbar__item rcl--visible-md-down">
            <ButtonIcon cName="rcl--button_search">
              <IconSearch />
            </ButtonIcon>
          </div>
          <div className="rcl--navbar__item">
            <NavLink to="/best" className="rcl--navbar__link">
              Лучшее
            </NavLink>
          </div>
          <div className="rcl--navbar__item">
            <Searchbar />
          </div>
        </div>
        <div className="rcl--navbar__row">
          <div className="rcl--navbar__item">
            <FavoriteWidget />
          </div>
        </div>

        { this.state.navOpen && this.renderNavigation()}
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  stores: state.stores
});

const mapDispatchToProps = state => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
