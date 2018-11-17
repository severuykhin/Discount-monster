import Request from "../classes/Request";
import store from "../../redux/index";
import JsonHelper from "../classes/JsonHelper";

class BaseApi {
  constructor() {
    this.request = new Request();
    this.jsonHelper = new JsonHelper();
    this.url = "";
    this.expandValues = [];
    this.removeAction = () => {};
    this.addAction = () => {};
  }

  expand(values) {
    this.expandValues = values;
    return this;
  }

  create(formData) {
    return this.request.send("POST", this.url, formData).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(this.addAction(parsed.data));
      } else {
        alert(`${this.constructor.name}: Error while creating new model`);
        console.error(response);
      }
    });
  }

  update(id, formData) {

    let url = `${this.url}/${id}`;

    return this.request.send("PATCH", url, formData).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(this.addAction(parsed.data));
      } else {
        alert(`${this.constructor.name}: Error while creating new model`);
        console.error(response);
      }
    });
  }


  fetchAll() {

    let url = this.url;

    if (this.expandValues.length) {
      url = `${url}?expand=${ this.expandValues.join(',') }`
    }

    return this.request.send("GET", url).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        return parsed;
      } else {
        alert(`${this.constructor.name}: Error while loading data`);
        console.error(response);
      }
    });
  }

  remove(id) {
    this.request.send("DELETE", `${this.url}/${id}`).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(this.removeAction(id));
      } else {
        alert(`${this.constructor.name}: Error while deleting model - ${id}`);
        console.error(response);
      }
    });
  }
}

export default BaseApi;
