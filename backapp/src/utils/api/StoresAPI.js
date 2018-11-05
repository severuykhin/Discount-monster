import Request from '../classes/Request';
import store from '../../redux/index';
import { deleteStore } from '../../ducks/Stores';
import JsonHelper from '../classes/JsonHelper';

class StoresApi {

    constructor() {
        this.request = new Request();
        this.jsonHelper = new JsonHelper();
        this.url = '/backend/store';
    }

    createStore(formData) {
        return this.request.send('POST', this.url, formData)
                .then( data => {
                    return this.jsonHelper.process(data);
                });
    }

    fetchStores() {
        return this.request.send('GET', '/backend/store')
            .then( response => {
                let parsed = this.jsonHelper.process(response);
                
                if (parsed.result === 'ok') {
                    return parsed;
                } else {
                    alert('Ошибка при загрузке данных');
                    console.error(response);
                }
            });
    }

    deleteStore(id) {
        this.request.send('DELETE', `/backend/store/${id}`)
            .then( response => {
                let parsed = this.jsonHelper.process(response);
                
                if (parsed.result === 'ok') {
                    store.dispatch(deleteStore(id));
                }
            })   
    }

}

export default StoresApi;