import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "./Link";
import LinkHead from "./LinkHead";
import LinkForm from './LinkForm';
import LinksApi from '../../utils/api/LinksAPI';


const LINK_CREATE_PATH = "/links/create";
const LINK_BASE_PATH = "/links";

class LinkContainer extends Component {

  constructor(props) {
    super(props);

    this.api = new LinksApi();
    this.state = {
      errors: {},
      editItem: false
    };
  }

  openCreateForm = () => {
    this.props.history.push("/links/create");
  };

  openEditForm = (id) => {
    this.props.history.push(`/links/edit/${id}`);
  }

  createLink = (linkData) => {
    this.api.create(linkData)
      .then(data => {
        if (data.result === 'error') { this.setState( { errors:data.errors } ) }
        else if(data.result === 'ok') {
          this.setState({errors: {}});
          this.props.history.push('/links');
        }
      })
      .catch(e => alert(e));    
  };

  editLink = (data) => {
    let id = this.props.match.params.id;
    this.api.update(id, data)
      .then(data => {
        if (data.result === 'error') { this.setState( { errors:data.errors } ) }
        else if(data.result === 'ok') {
          this.setState({errors: {}});
          this.props.history.push('/links');
        }
      })
  }

  deleteLink = (id) => {
    this.api.remove(id);
  };

  renderContent = () => {
    let {
      location: { pathname },
      match: { params: { id } }
    } = this.props;

    if (pathname === LINK_CREATE_PATH) {
      return <LinkForm
                action="create"
                errors={this.state.errors} 
                formSubmitHandler={this.createLink} />;
    } else if (pathname === LINK_BASE_PATH) {
      return <Link 
                    editHandler={this.openEditForm}
                    collection={this.props.collection}
                    deleteHandler={this.deleteLink} />;
    } else {
      let itemToEdit = this.props.collection.filter(item => item.id === id);
      return <LinkForm 
                action="edit"
                itemToEdit={itemToEdit[0]}
                errors={this.state.errors} 
                formSubmitHandler={this.editLink} />
    }
  };

  render() {
    return (
      <div>
        <LinkHead 
          addBtnHandler={this.openCreateForm} />
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
