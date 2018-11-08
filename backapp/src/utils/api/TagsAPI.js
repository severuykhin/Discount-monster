import Request from "../classes/Request";
import store from "../../redux/index";
import { removeTag, addTag } from "../../ducks/Tags";
import JsonHelper from "../classes/JsonHelper";

class TagsApi {
  constructor() {
    this.request = new Request();
    this.jsonHelper = new JsonHelper();
    this.url = "/backend/tag";
  }

  create(formData) {
    return this.request.send("POST", this.url, formData).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(addTag(parsed.data));
      } else {
        alert("Ошибка при создании тега");
        console.error(response);
      }
    });
  }

  fetchAll() {
    return this.request.send("GET", this.url).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        return parsed;
      } else {
        alert("Ошибка при загрузке тегов");
        console.error(response);
      }
    });
  }

  remove(id) {
    this.request.send("DELETE", `${this.url}/${id}`).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(removeTag(id));
      } else {
        alert("Ошибка при удалении тега");
        console.error(response);
      }
    });
  }
}

export default TagsApi;
