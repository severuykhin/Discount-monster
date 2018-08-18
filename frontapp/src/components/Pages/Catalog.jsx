import React, { Component } from 'react';
import CatalogItems from '../CatalogItems/CatalogItems';
import CatalogSort from '../CatalogSort/CatalogSort';


class Catalog extends Component {

	render() {
		return (
			<div className="container">
				<div className="catalog">
					<div className="row">
					
						<div className="col-lg-2">
							Тут фильтры
						</div>
						<div className="col-lg-10">
							<CatalogSort />
							<CatalogItems items={this.props.items} />
						</div>

					</div>			
				</div>
			</div>
		);
	}
}

export default Catalog;