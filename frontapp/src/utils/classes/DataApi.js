import Cookie from './Cookie';
import LocalStorage from './LocalStorage';


/**
 * Represents class for working with browser data api
 */
class DataApiContsructor {

	constructor() {
		this.Cookie = new Cookie();
		this.LocalStorage = new LocalStorage();
	}

	/**
	 * Tries to stringify data to json 
	 * and sets it to all available apies as json string by given name
	 * @param { void } data
	 * @param { string } name 
	 */
	setAsJson(data, name) {

		try {
			data = JSON.stringify(data);
		} catch (e) {
			throw new Error(`DataApi: wrong data format! Process end with error : ${e.message}`);
		}

		this.Cookie.set(name, data, 86400 * 365);
		this.LocalStorage.set(name.data);
	}

	/**
	 * Search values with given name in all avalilables apies
	 * tries to convert it to JSON
	 * and return result
	 * @param { string } name 
	 */
	getAsJson(name) {
		let result = this.LocalStorage.get(name);

		if (!result) {
			result = this.Cookie.get(name);
		}

		if (!result) return false;

		try {
			result = JSON.stringify(result);
		} catch(e) {
			throw e;
		}

		return result;
	}
}

export const DataApi = new DataApiContsructor();

