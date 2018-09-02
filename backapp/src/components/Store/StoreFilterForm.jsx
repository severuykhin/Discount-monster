import React from 'react';

const StoreFilterForm = (props) => {
	return (
		<div className="store__filter-form">
			<div className="field is-horizontal">
			<div className="field-body">
				<div className="field">
					<div className="select is-rounded">
						<select onChange={(e) => { props.applyFilter(e) }} >
							<option value="">Сортировать</option>
							<option value="priceMax">По убыванию цены</option>
							<option value="priceMin">По возрастанию цены</option>
							<option value="discount">По наибольшей скидке</option>
						</select>
					</div>
				</div>
				<div className="field">
				<p className="control is-expanded has-icons-left has-icons-right">
					<input className="input is-success" type="email" placeholder="Искать по названию"/>
					<span className="icon is-small is-left">
						<i className="fas fa-search"></i>
					</span>
				</p>
				</div>
			</div>
			</div>
		</div>
	);
};

export default StoreFilterForm;