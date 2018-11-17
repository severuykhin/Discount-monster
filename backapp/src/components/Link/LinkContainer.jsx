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

    this.api = new LinksApi();
    this.state = {
      errors: {}
    };
  }

  openEdit = () => {
    this.props.history.push("/links/create");
  };

  createLink = (linkData) => {
    this.api.create(linkData)
      .then(data => {
        if (data.result === 'error') { this.setState( { errors:data.errors } ) }
        else if(data.result === 'ok') {
          this.props.history.push('/links');
        }
      })
      .catch(e => alert(e));    
  };

  deleteLink = (id) => {
    this.api.remove(id);
  };

  renderContent = () => {
    let {
      location: { pathname }
    } = this.props;

    if (pathname === LINK_CREATE_PATH) {
      return <LinkForm
                errors={this.state.errors} 
                formSubmitHandler={this.createLink} />;
    } else return <Link 
                    collection={this.props.collection}
                    deleteHandler={this.deleteLink} />;
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

const mapStateToProps = state => ({
  collection: state.links.collection
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkContainer);
