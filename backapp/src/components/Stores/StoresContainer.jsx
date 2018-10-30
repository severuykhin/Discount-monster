import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stores from './Stores';
import StoresForm from  './StoresForm';
import StoresHead from './StoresHead';
import StoresApi from '../../utils/api/StoresAPI';
import { addStore } from '../../ducks/Stores';

import './Stores.css';

const CREATING_PATH = '/stores/create';

class StoresContainer extends Component {

    constructor() {
        super();

        this.api = new StoresApi();

        this.state = {}
    }

    componentDidMount() {
        
    }

    sendForm = formData => {
        this.api.createStore(formData)
            .then( response => {
                this.props.addStore(response.data);
                this.props.history.push('/stores');        
            })
            .catch(e => {
                console.log(e);
            })
    }

    deleteStore = id => {
        this.api.deleteStore(id);
    }

    openEdit = () => {
        this.props.history.push('/stores/create');
    }

    renderContent = () => {
        let {storesCollection, location : { pathname }} = this.props;

        if (pathname === CREATING_PATH) {
            return <StoresForm formSubmitHandler={this.sendForm}  />
        }
        else return <Stores 
                        collection={storesCollection} 
                        deleteStoreHandler={this.deleteStore}/>;

    }


    render() {
        return (
        <div className="stores">
            <StoresHead 
                addBtnHandler={this.openEdit}/>
            { this.renderContent() }
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