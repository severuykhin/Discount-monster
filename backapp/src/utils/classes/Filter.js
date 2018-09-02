
/**
 * Represents filters class
 */ 
class Filter {

	sortMehtods = {
		'filter_max' : (items) => {
			return items.sort((a,b) => {
				return Number(b.price_sale) - Number(a.price_sale);
			});	
		},
		'filter_min' : (items) => {
			return items.sort((a,b) => {
				return Number(a.price_sale) - Number(b.price_sale);
			});	
		},
		'filter_discount' : (items) => {
			return items.sort((a,b) => {
				let current = Number(a.price) - Number(a.price_sale),
					next    = Number(b.price) - Number(b.price_sale);
				return next - current;
			});
		}
	};

	/**
	 * Get sorting method
	 * @param {string} type
	 * @return {function} 
	 */
	getMethod(type) {
		if (!this.sortMehtods[type]) {
			throw new Error(`Filter: ERROR - no such filter type - ${type}`);
		}

		return this.sortMehtods[type];
	}

	/**
	 * Sort array of given items according to given sortin type
	 * @param {array} items 
	 * @param {string} type 
	 */
	sortBy(items, type) {
		if (type.trim() === '') return items;

		const processMethod = this.getMethod(type);

		return processMethod(items);
	}

}

export default Filter;