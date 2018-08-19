import React, { Component } from 'react';
import CatalogItems from '../CatalogItems/CatalogItems';
import CatalogSort from '../CatalogSort/CatalogSort';
import Pagination from '../Pagination/Pagination';

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

							<CatalogSort 
								total={this.props.total}/>

							<Pagination 
								baseLink={this.props.paginationLink}
								total={this.props.total} />
							
							<CatalogItems 
								items={this.props.items} />

							<Pagination 
								baseLink={this.props.paginationLink}
								total={this.props.total} />
						
						</div>
					</div>			
				</div>
			</div>
		);
	}
}

export default Catalog;