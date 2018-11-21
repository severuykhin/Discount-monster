import { deleteStore } from "../../ducks/Stores";
import { updateTagsToStoreBindings } from '../../ducks/Tags';
import store from "../../redux/index";
import BaseApi from './BaseApi';

class StoresApi extends BaseApi {
  constructor() {
    super();

    this.url = "/backend/store";
    this.removeAction = deleteStore;
  }

  // Create method override
  create(formData) {
    return this.request.send("POST", this.url, formData).then(data => {
      return this.jsonHelper.process(data);
    });
  }

  updateTagsBindings(config) {
    return this.request.as('application/json')
            .send("PATCH", `/api/v1/stores/${config.storeId}/tags`, config.values)
            .then(response => {
              let convertedResponse = this.jsonHelper.process(response);
              if (convertedResponse.result === 'ok') {
                store.dispatch(updateTagsToStoreBindings(config));
              }
              return convertedResponse;
            });
  }
}

export default StoresApi;
