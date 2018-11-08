import React, { Component } from "react";
import Tags from "./Tags";
import { connect } from "react-redux";
import TagsApi from "../../utils/api/TagsAPI";

class TagsContainer extends Component {

  constructor(props) {
    super(props);

    this.api = new TagsApi();

  }

  createTag = tagData => {
    this.api.create(tagData);
  }

  handleDelete = id => {
    this.api.remove(id);
  }

  render() {
    return (
      <div>
        <div className="stores__head">
          <h1>
            <span>Теги фильтрации</span>
          </h1>
        </div>
        <Tags
          handleDelete={this.handleDelete} 
          createTag={this.createTag} 
          collection={this.props.tags} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tags: state.tags.collection
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagsContainer);
