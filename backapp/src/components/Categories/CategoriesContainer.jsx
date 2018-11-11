import React, { Component } from "react";
import { connect } from "react-redux";
import Categories from "./Categories";
import CategoriesHead from './CategoriesHead';
import CategoryApi from '../../utils/api/CategoryAPI';

class CategoriesContainer extends Component {

  constructor(props) {
    super(props);

    this.api = new CategoryApi();
  }

  createCategory = (categoryData) => {
    this.api.create(categoryData);
  }

  render() {
    return (
      <div>
        <div className="stores__head">
          <h1>
            <span>Категории</span>
          </h1>
        </div>
        <CategoriesHead createCategory={this.createCategory} />
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
