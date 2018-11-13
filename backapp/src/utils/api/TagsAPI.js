import { removeTag, addTag } from "../../ducks/Tags";
import BaseApi from './BaseApi';

class TagsApi extends BaseApi {
  
  constructor() {
    
    super();

    this.url = "/backend/tag";
    this.removeAction = removeTag;
    this.addAction = addTag;
  }

  
}

export default TagsApi;
