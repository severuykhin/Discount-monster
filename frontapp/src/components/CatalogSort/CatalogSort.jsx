import React, { Component } from 'react';
import './CatalogSort.css';


class CatalogSort extends Component {

	constructor(props) {
		super(props);

		this.state = {
			sorts : {
				'priceMin' : 'Наименьшая цена',
				'priceMax' : 'Наибольшая цена',
				'discount' : 'Наибольшая скидка',
				'popular'  : 'Популярные'
			},
			activeSort : 'priceMin'
		};
	}

	/**
	 * Handles sort choose
	 */
	handleSort = type => {
		this.setState({
			activeSort : type
		});
		this.props.setFilters({ sort : type });
	}

	componentDidMount() {
		if (this.props.activeSort) {
			this.setState({ activeSort : this.props.activeSort });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!this.props.activeSort && this.props.activeSort !== prevProps.activeSort) {
			this.setState({
				activeSort : 'priceMin'
			});
		}
	}


	/**
	 * Builds sorting variants
	 * @param {object} variants 
	 * @param {string} activeName 
	 */
	buildVariants (variants, activeName) {
		return Object.keys(variants).map( item => {

			const activeClassName = item === activeName ? 'shop_sorting_button active' : 'shop_sorting_button';

			return (
				<li key={`catalog-sort-${item}`}
					onClick = {() => { this.handleSort(item) }}
					className={activeClassName}>
					{ variants[item] }
				</li>
			);
		});
	}

	render() {

		const activeSortName = this.state.sorts[this.state.activeSort];

		return (
			<div className="catalog__sort">
				<div className="shop_bar clearfix">
					<div className="shop_product_count">Всего : <span>{this.props.total}</span></div>
					<div className="shop_sorting">
						<span>Сортировать:</span>
						<ul>
							<li>
								<span className="sorting_text">{ activeSortName }</span>
								<ul>
									{ this.buildVariants(this.state.sorts, this.props.activeSort) }
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