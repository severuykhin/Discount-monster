import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Range from '../Range/Range';
import './Sidebar.css';

class Sidebar extends Component {

	/**
	 * Handles Price filter change and give it to Catalog container
	 * @param { object } values - Min and max values
	 */
	handlePriceChange = (values) => {
		this.props.setPriceFilters(values);
	}
	
	buildStoresLinks = stores => {
		return Object.keys(stores).map( i => {
			const item = stores[i];
			return (
				<li key={`sidebar-link-${item.id}`}>
					<NavLink 
						to={`/catalog/store/${item.slug}`} 
						activeClassName="active">
						{ item.name } 
						<span>{ item.count }</span>
					</NavLink>
				</li>
			);
		});
	}
	
	
	render() {

		return (
			<div className="sidebar">
				<div className="shop_sidebar">
						<div className="sidebar_section">
							<div className="sidebar_title">Магазины</div>
							<ul className="sidebar_categories">
								{ this.buildStoresLinks(this.props.stores) }
							</ul>
						</div>
						<div className="sidebar_section filter_by_section">
							<div className="sidebar_title">Фильтры</div>
							<div className="sidebar_subtitle sidebar_subtitle-filter">Цена</div>
							<Range
								min={this.props.minPrice || 0}
								max={this.props.maxPrice || 0}
								onDragEnd={(values) => { this.handlePriceChange(values); }}/>
						</div>
						
						<div className="sidebar_section">
							<div className="sidebar_subtitle brands_subtitle">Brands</div>
							<ul className="brands_list">
								<li className="brand"><a href="#">Apple</a></li>
								<li className="brand"><a href="#">Beoplay</a></li>
								<li className="brand"><a href="#">Google</a></li>
								<li className="brand"><a href="#">Meizu</a></li>
								<li className="brand"><a href="#">OnePlus</a></li>
								<li className="brand"><a href="#">Samsung</a></li>
								<li className="brand"><a href="#">Sony</a></li>
								<li className="brand"><a href="#">Xiaomi</a></li>
							</ul>
						</div>
					</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	stores : state.store.get('stores').getAll()
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure : false })(Sidebar);