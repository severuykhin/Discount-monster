/**
 * Represents hashtable class
 */
class HashTable {

	/**
	 * Array of items
	 * @param {array} data 
	 */
	constructor(data, uniqProp = '') {
		
		if (typeof data !== 'object') {
			throw new Error(`HashTable : Invalid typeof given data. You data is -  ${(typeof data).toUpperCase()}`);
		}

		this.items  = {};
		this.uniqProp = uniqProp;
		this.length = 0

		if (data.length < 0) return;

		this._convertData(data);
		
	}

	/**
	 * Converts given data to hash table by given uniqueProp
	 * @param {array} data 
	 */
	_convertData(data) {
		data.forEach( item => {
			let propValue = item[this.uniqProp];
			this.items[propValue] = item;
			this.length++;
		});
	}

	get() {

	}

	set() {

	}

	getAll() {
		return this.items;
	}

}

export default HashTable;