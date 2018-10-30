import React, { Component } from 'react';
import { connect } from 'react-redux';

import Stores from './Stores';
import StoresForm from  './StoresForm';
import StoresHead from './StoresHead';
import StoresApi from '../../utils/api/StoresAPI';

import './Stores.css';

const CREATING_PATH = '/stores/create';

class StoresContainer extends Component {

    constructor() {
        super();

        this.api = new StoresApi();

        this.state = {}
    }

    componentDidMount() {
        this.api.fetchStores();
    }

    sendForm = (formData) => {
        this.api.createStore(formData)
            .then(data => {
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            })
    }

    openEdit = () => {
        this.props.history.push('/stores/create');
    }

    renderContent = () => {
        let {storesCollection, location : { pathname }} = this.props;

        if (pathname === CREATING_PATH) {
            return <StoresForm formSubmitHandler={this.sendForm}  />
        }
        else return <Stores collection={storesCollection} />;

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

})

export default connect(mapStateToProps, mapDispatchToProps)(StoresContainer);
