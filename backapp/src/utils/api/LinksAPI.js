import BaseApi from "./BaseApi";

class LinksApi extends BaseApi {
  constructor() {
    super();
    this.url = "/api/v1/links";
    this.addAction = () => {};
    this.removeAction = () => {};
  }

  create(data) {
    return this.request.as('application/json')
            .send("POST", this.url, data)
            .then(response => {
              return this.jsonHelper.process(response);
            });
  }
}

export default LinksApi;
