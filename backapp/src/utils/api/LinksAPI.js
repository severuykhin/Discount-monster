import BaseApi from "./BaseApi";
import store from "../../redux/index";
import { addLink, removeLink } from '../../ducks/Links';


class LinksApi extends BaseApi {
  constructor() {
    super();
    this.url = "/api/v1/links";
    this.addAction = addLink;
    this.removeAction = removeLink;
  }

  create(data) {
    return this.request.as('application/json')
            .send("POST", this.url, data)
            .then(response => {
              let convertedResponse = this.jsonHelper.process(response);
              store.dispatch(this.addAction(convertedResponse.model));
              return convertedResponse;
            });
  }
}

export default LinksApi;
