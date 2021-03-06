import React, { Component } from 'react';
import CatalogItems from '../CatalogItems/CatalogItems';
import CatalogSort from '../CatalogSort/CatalogSort';
import Pagination from '../Pagination/Pagination';
import Sidebar from '../Sidebar/Sidebar';

class Catalog extends Component {

	render() {

		return (
			<div className="container">
				<div className="catalog">
					<div className="row">
					
						<div className="col-lg-2">
							<Sidebar
								minPrice={this.props.minPrice}
								maxPrice={this.props.maxPrice}
								startPrice={this.props.startPrice}
								endPrice={this.props.endPrice}
								setFilters={this.props.setFilters}
								activeGender={this.props.activeGender}
								currentStore={this.props.currentStore} />
						</div>

						<div className="col-lg-10">

							<h1 className="heading">{ this.props.titleh1 }</h1>

							<CatalogSort 
								activeSort={this.props.activeSort}
								setFilters={this.props.setFilters}
								total={this.props.total}/>

							<Pagination 
								current={this.props.currentPage}
								queryParams={this.props.queryParams}
								baseLink={this.props.paginationLink}
								total={this.props.total} />
							
							<CatalogItems
								favorites={this.props.favorites} 
								busy={this.props.busy}
								items={this.props.items} />

							<Pagination 
								current={this.props.currentPage}
								queryParams={this.props.queryParams}
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