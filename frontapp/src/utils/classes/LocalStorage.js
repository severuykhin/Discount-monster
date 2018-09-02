/**
 * Represents class for working with LocalStorage
 */
export default class LocalStorage {

	/**
	 * Checks if localstorage is available
	 * @returns { boolean }
	 */
	isAvailable() {
		return window.localStorage !== undefined;
	}

	/**
	 * Geat value by name
	 * @param { string } name 
	 */
	get(name) {
		if (!this.isAvailable) return false;
		return localStorage.getItem(name) || false;
	}

	/**
	 * Sets new value by given name
	 * @param { string }  name 
	 * @param { string } value 
	 */
	set(name, value) {
		if (!this.isAvailable) return false;
		localStorage.setItem(name, value);
		return true;

	}

	/**
	 * Deletes value by given name
	 * @param {string} name 
	 */
	delete(name) {
		if (!this.isAvailable) return false;
		localStorage.removeItem(name);
		return true;
	}

}