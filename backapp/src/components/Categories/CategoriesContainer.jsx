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

  deleteCategory = id => {
    this.api.remove(id);
  }

  render() {

    const { collection } = this.props;

    return (
      <div>
        <div className="stores__head">
          <h1>
            <span>Категории</span>
          </h1>
        </div>
        <CategoriesHead createCategory={this.createCategory} />
        <Categories
          deleteHandler={this.deleteCategory} 
          collection={collection} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  collection: state.categories.collection
});

const mapDisaptchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDisaptchToProps
)(CategoriesContainer);
