import Request from "../classes/Request";
import store from "../../redux/index";
import { removeCategory, addCategory } from "../../ducks/Categories";
import JsonHelper from "../classes/JsonHelper";

class CategoryApi {
  constructor() {
    this.request = new Request();
    this.jsonHelper = new JsonHelper();
    this.url = "/api/v1/category";
  }

  create(formData) {
    return this.request.send("POST", this.url, formData).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(addCategory(parsed.data));
      } else {
        alert("Ошибка при создании категории");
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
        alert("Ошибка при загрузке категорий");
        console.error(response);
      }
    });
  }

  remove(id) {
    this.request.send("DELETE", `${this.url}/${id}`).then(response => {
      let parsed = this.jsonHelper.process(response);
      if (parsed.result === "ok") {
        store.dispatch(removeCategory(id));
      } else {
        alert("Ошибка при удалении категории");
        console.error(response);
      }
    });
  }
}

export default CategoryApi;
