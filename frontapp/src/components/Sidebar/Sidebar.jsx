import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Range from '../Range/Range';
import { config } from '../../utils/config';
import Checkbox from '../Checkbox/Checkbox';
import {addGender, delGender, setGenders} from '../../ducks/Items';
import Request from '../../utils/classes/Request';
import './Sidebar.css';

class Sidebar extends Component {

	/**
	 * Handles Price filter change and give it to Catalog container
	 * @param { object } values - Min and max values
	 */
	handlePriceChange = (values) => {
		this.props.setFilters(values);
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

	resolveGender = (config) => {
		if (config.checked) {
			this.props.addGender(Number(config.gender));
		} else {
			this.props.delGender(Number(config.gender));
		}
		this.props.setFilters({
			gender : this.props.filters.gender.join(',')
		});
	}

	buildCheckBoxes = (variants, checked) => {
		return Object.keys(variants).map( item => {

			let isChecked = checked.indexOf(variants[item].value) >= 0;

			return (
				<li 
					key={`gender-var-${variants[item].value}`}
					className="brand">
					<Checkbox
						isChecked={isChecked}
						onChange={(config) => { this.resolveGender(config) }}  
						config={variants[item]} name="gender" />
				</li>
			) 
		});
	}

	componentDidMount() {
		if (this.props.activeGender) {
			const genders = this.props.activeGender.split(',').map( i => parseInt(i));
			this.props.setGenders(genders);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.currentStore !== prevProps.currentStore) {
			this.props.setGenders([]);
		}
	}
	
	
	render() {

		const { stores } = this.props;

		let totalCount = 0;

		Object.keys(stores).forEach( item => { totalCount += Number(stores[item].count) });

		return (
			<div className="sidebar">
				<div className="shop_sidebar">
						<div className="sidebar_section">
							<div className="sidebar_title">Магазины</div>
							<ul className="sidebar_categories">
								<li key='sidebar-link-main'>
									<NavLink 
										to='/catalog' 
										activeClassName="active">
										Все
										<span>{ totalCount }</span>
									</NavLink>
								</li>
								{ this.buildStoresLinks(this.props.stores) }
							</ul>
						</div>
						<div className="sidebar_section filter_by_section">
							<div className="sidebar_title">Фильтры</div>
							<div className="sidebar_subtitle sidebar_subtitle-filter">Цена</div>
							<Range
								min={this.props.minPrice || 0}
								max={this.props.maxPrice || 0}
								start={this.props.startPrice}
								end={this.props.endPrice}
								onDragEnd={(values) => { this.handlePriceChange(values); }}
								currentStore={this.props.currentStore}/>
						</div>
						
						<div className="sidebar_section">
							<div className="sidebar_subtitle brands_subtitle">Пол</div>
							<ul className="brands_list">
								{ this.buildCheckBoxes(config.genders, this.props.filters.gender) }
							</ul>
						</div>
					</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	stores  : state.store.get('stores').getAll(),
	filters : state.items.get('filters')
});

const mapDispatchToProps = dispatch => ({
	addGender  : (gender)  => dispatch(addGender(gender)),
	delGender  : (gender)  => dispatch(delGender(gender)),
	setGenders : (genders) => dispatch(setGenders(genders)) 
});

export default connect(mapStateToProps, mapDispatchToProps, null, { pure : false })(Sidebar);