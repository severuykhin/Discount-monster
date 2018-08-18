import React, { Component } from 'react';

class CatalogSort extends Component {
	render() {
		return (
			<div className="catalog__sort">
				<div className="shop_bar clearfix">
					<div className="shop_product_count"><span>186</span> products found</div>
					<div className="shop_sorting">
						<span>Сортировать:</span>
						<ul>
							<li>
								<span className="sorting_text">Наименьшая цена</span>
								<ul>
									<li className="shop_sorting_button">Наименьшая цена</li>
									<li className="shop_sorting_button">Наибольшая цена</li>
								</ul>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default CatalogSort;