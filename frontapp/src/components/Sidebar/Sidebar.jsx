import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
	
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
							<div className="sidebar_subtitle">Цена</div>
							<div className="filter_price">
								<div id="slider-range" className="slider_range ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div className="ui-slider-range ui-corner-all ui-widget-header"></div><span className="ui-slider-handle ui-corner-all ui-state-default"></span><span className="ui-slider-handle ui-corner-all ui-state-default"></span></div>
								<p>Range: </p>
								<p><input type="text" id="amount" className="amount" /></p>
							</div>
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