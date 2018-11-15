import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "./Link";
import LinkHead from "./LinkHead";
import LinkForm from './LinkForm';
import LinksApi from '../../utils/api/LinksAPI';


const LINK_CREATE_PATH = "/links/create";

class LinkContainer extends Component {

  constructor(props) {
    super(props);

    this.api = new LinksApi()
  }

  openEdit = () => {
    this.props.history.push("/links/create");
  };

  createLink = (linkData) => {
    this.api.create(linkData);    
  };

  deleteLink = () => {};

  renderContent = () => {
    let {
      location: { pathname }
    } = this.props;

    if (pathname === LINK_CREATE_PATH) {
      return <LinkForm formSubmitHandler={this.createLink} />;
    } else return <Link deleteStoreHandler={this.deleteLink} />;
  };

  render() {
    return (
      <div>
        <LinkHead 
          addBtnHandler={this.openEdit} />
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkContainer);
