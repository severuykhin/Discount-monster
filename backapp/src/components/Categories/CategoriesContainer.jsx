import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "./Categories";
import CategoriesHead from './CategoriesHead';

class CategoriesContainer extends Component {
  render() {
    return (
      <div>
        <div className="stores__head">
          <h1>
            <span>Категории</span>
          </h1>
        </div>
        <CategoriesHead />
        <Categories />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDisaptchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(CategoriesContainer);
