import { deleteStore } from "../../ducks/Stores";
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
}

export default StoresApi;
