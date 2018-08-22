/**
 * Represents class for working with Cookies
 */
export default class Cookie {
	/**
	 * Returns cookie value by name or undefined
	 * @param {name} name - Cookie name 
	 * @returns string
	 */ 
	get (name) {

		if(typeof name !== 'string') { 
			throw new Error('Cookie: NAME in GET method must be a string');
		}

		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};

	/**
	 * Sets cookie values
	 * @param { string } name - Name. Rewrites if exists
	 * @param { void } value - Will try to serialize it if object given
	 * @param { number } expires - In seconds
	 */ 
	set (name, value, expires) {

		if (typeof expires == "number" && expires) {
			var date = new Date();
			date.setTime(date.getTime() + expires * 1000);
			expires = date;
		}
		if (expires && expires.toUTCString) {
			expires = expires.toUTCString();
		}

		if(typeof value === 'object' && value.hasOwnProperty) {
			try {
				value = JSON.stringify(value);
			} catch(e) {
				throw new Error('Cookie: Invalid VALUE in SET method');
			}
		}

		value = encodeURIComponent(value);

		var updatedCookie = name + "=" + value + ';' + 'expires=' + expires;

		document.cookie = updatedCookie;
	};

	/**
	 * Deletes cookie by given name
	 * @param {string} name 
	 */ 
	delete (name) {
		this.set(name, '', -1);
	};
}