import { removeCategory, addCategory } from "../../ducks/Categories";
import BaseApi from "./BaseApi";

class CategoryApi extends BaseApi {
  constructor() {
    super();

    this.url = "/api/v1/category";
    this.addAction = addCategory;
    this.removeAction = removeCategory;
  }
}

export default CategoryApi;
