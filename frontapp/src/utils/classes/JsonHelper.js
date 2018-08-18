/**
 * Represents JsonHelper class
 */ 
class JsonHelper {

	/**
	 * Try to convert given data from json to readable format
	 * @param {string} data - Json
	 */
	process(data) {
		try {
			data = JSON.parse(data);
		} catch (e) {
			throw new Error('JSON HELPER: Error while processing data. Wrong format');
		}

		return data;
	}

}

export default JsonHelper;