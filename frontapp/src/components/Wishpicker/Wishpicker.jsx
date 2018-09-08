import React, { Component } from 'react';
import { DataApi } from '../../utils/classes/DataApi';
import { setFavs } from '../../ducks/Favorites';
import { connect } from 'react-redux';
import {} from '../../utils/classes/DataApi';
import { setState } from '../../ducks/Favorites';


class Widhpicker extends Component {

	constructor(props) {
		super(props);

		this.dataApiName = 'favorites';
	}

	componentDidMount() {

		let favs = DataApi.getAsJson(this.dataApiName);

		if (favs) {
			this.props.setFavs(favs.items);
		}
		
	}

	/**
	 * Open favs modal table
	 * @param {boolean} state
	 */
	openFavs = (state) => {
		this.props.setState(state);
	}

	render() {
		return (
			<div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
				<div
					onClick={() => { this.openFavs(true) }} 
					className="wishlist d-flex flex-row align-items-center justify-content-end">
					<div className="wishlist_icon">
					<svg x="0px" y="0px"
							viewBox="0 0 612 612" style={{
								enableBackground : 'new 0 0 612 612'
							}}>
						<g>
							<g>
								<g>
									<path d="M435.575,23.05c-47.689,0-94.796,19.225-129.574,52.202C271.237,42.277,224.116,23.05,176.408,23.05
										C77.488,23.05,0,100.545,0,199.474c0,55.366,22.801,108.911,71.755,168.507c42.707,51.993,102.165,105.723,181.461,175.893
										l39.959,39.78c3.548,3.53,8.188,5.297,12.829,5.297c4.641,0,9.28-1.767,12.829-5.298l39.949-39.78
										c79.29-70.152,138.74-123.871,181.472-175.891C589.202,308.388,612,254.843,612,199.474C612,100.545,534.506,23.05,435.575,23.05
										z M334.284,516.994c-0.267,0.236-0.527,0.48-0.782,0.732L306,545.11l-27.509-27.384c-0.251-0.252-0.512-0.495-0.779-0.73
										C123.572,380.6,36.363,298.603,36.363,199.474c0-78.54,61.514-140.06,140.046-140.06c43.19,0,87.531,20.695,115.712,54.01
										c3.453,4.082,8.532,6.436,13.879,6.438c0,0,0,0,0.003,0c5.347,0,10.423-2.355,13.879-6.436
										c28.195-33.316,72.528-54.011,115.694-54.011c78.538,0,140.06,61.52,140.06,140.06
										C575.637,298.635,488.428,380.62,334.284,516.994z"/>
									<path d="M187.246,87.288c-69.143,0-123.306,54.169-123.306,123.319c0,10.042,8.141,18.182,18.182,18.182
										s18.182-8.139,18.182-18.182c0-48.761,38.189-86.956,86.943-86.956c10.041,0,18.182-8.139,18.182-18.182
										C205.427,95.429,197.286,87.288,187.246,87.288z"/>
								</g>
							</g>
						</g>
						</svg>
						<div className="wishlist_count">{ this.props.count }</div>
					</div>
					<div className="wishlist_content">
						<div className="wishlist_text">Закладки</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	count : state.favorites.get('items').toArray().length
});

const mapDispatchToProps = dispatch => ({
	setFavs  : (favs) => dispatch(setFavs(favs)),
	setState : (isOpened) => dispatch(setState(isOpened))
});

export default connect(mapStateToProps, mapDispatchToProps)(Widhpicker);