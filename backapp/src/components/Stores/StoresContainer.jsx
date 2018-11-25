import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stores from './Stores';
import StoresForm from  './StoresForm';
import StoresHead from './StoresHead';
import StoresTagDialog from './StoresTagDialog';
import StoresApi from '../../utils/api/StoresAPI';
import { addStore } from '../../ducks/Stores';

import './Stores.css';

const CREATING_PATH = '/stores/create';

class StoresContainer extends Component {

    constructor() {
        super();

        this.api = new StoresApi();

        this.state = {
            tagsDialogOpen: false,
            tagFormStoreId: null
        }
    }

    componentDidMount() {
        
    }

    sendForm = formData => {
        this.api.create(formData)
            .then( response => {
                this.props.addStore(response.data);
                this.props.history.push('/stores');        
            })
            .catch(e => {
                console.log(e);
            })
    }

    deleteStore = id => {
        this.api.remove(id);
    }

    openEdit = () => {
        this.props.history.push('/stores/create');
    }

    openTagsRedactor = (storeId) => {
        this.setState({ 
            tagsDialogOpen: true,
            tagFormStoreId: storeId 
        });
    }

    closeTagsRedactor = (values = false) => {
        this.setState({ tagsDialogOpen: false });

        if (values) this.api.updateTagsBindings(values);
    }

    renderContent = () => {
        let {storesCollection, location : { pathname }} = this.props;

        if (pathname === CREATING_PATH) {
            return <StoresForm formSubmitHandler={this.sendForm}  />
        }
        else return <Stores 
                        collection={storesCollection} 
                        openTagsRedactor={this.openTagsRedactor}
                        deleteStoreHandler={this.deleteStore}/>;

    }

    render() {
        return (
        <div className="stores">
            <StoresHead 
                addBtnHandler={this.openEdit}/>
            { this.renderContent() }
            <StoresTagDialog
                api={this.api}
                storeid={this.state.tagFormStoreId}
                onClose={this.closeTagsRedactor} 
                open={this.state.tagsDialogOpen} />
        </div>
        )
    }
}

const mapStateToProps = state => ({
    storesCollection : state.stores.collection
})

const mapDispatchToProps = dispatch => ({
    addStore : (store) => dispatch(addStore(store))
})

export default connect(mapStateToProps, mapDispatchToProps)(StoresContainer);
