import Request from '../classes/Request'
import store from '../../redux/index'
import { setCategories } from '../../redux/ducks/Categories'
import { setStores } from '../../redux/ducks/Stores'

class AppApi {

  getAppData() {

    let request = new Request();

    request.send('get','/api/v1/main/start')
      .then( request => {
        let data = JSON.parse(request).data;
        
        store.dispatch(setCategories(data.categories));
        store.dispatch(setStores(data.stores));

      })
  }
}

export default AppApi;
