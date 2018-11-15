import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "./Link";
import LinkHead from "./LinkHead";
import LinkForm from './LinkForm';

const LINK_CREATE_PATH = "/links/create";

class LinkContainer extends Component {
  openEdit = () => {
    this.props.history.push("/links/create");
  };

  sendForm = () => {};

  deleteLink = () => {};

  renderContent = () => {
    let {
      location: { pathname }
    } = this.props;

    if (pathname === LINK_CREATE_PATH) {
      return <LinkForm formSubmitHandler={this.sendForm} />;
    } else return <Link deleteStoreHandler={this.deleteLink} />;
  };

  render() {
    return (
      <div>
        <LinkHead addBtnHandler={this.openEdit} />
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
