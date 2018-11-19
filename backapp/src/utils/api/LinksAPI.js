import BaseApi from "./BaseApi";
import store from "../../redux/index";
import { addLink, removeLink, updateLink } from '../../ducks/Links';


class LinksApi extends BaseApi {
  constructor() {
    super();
    this.url = "/api/v1/links";
    this.addAction = addLink;
    this.removeAction = removeLink;
    this.updateAction = updateLink;
  }

  create(data) {
    return this.request.as('application/json')
            .send("POST", this.url, data)
            .then(response => {
              let convertedResponse = this.jsonHelper.process(response);
              if (convertedResponse.result === 'ok') {
                return convertedResponse;
              }
              return convertedResponse;
            });
  }

  update(id, data) {
    return this.request.as('application/json')
            .send("PATCH", `${this.url}/${id}`, data)
            .then(response => {
              let convertedResponse = this.jsonHelper.process(response);
              if (convertedResponse.result === 'ok') {
                // store.dispatch(this.updateAction(convertedResponse.model));
              }
              return convertedResponse;
            });
  }
}

export default LinksApi;
