import Request from '../classes/Request';
import JsonHelper from '../classes/JsonHelper';
import store from '../../redux/index';
import { setStores } from '../../ducks/Stores'; 

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
        this.request.send('GET', '/backend/store')
            .then( response => {

                let parsed = this.jsonHelper.process(response);
                
                if (parsed.result === 'ok') {
                    store.dispatch(setStores(parsed.data))
                } else {
                    alert('Ошибка при загрузке данных');
                    console.error(response);
                }
            })
            .catch(error => { throw error })
    }

}

export default StoresApi;