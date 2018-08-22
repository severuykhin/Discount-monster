import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './Card';

class CardContainer extends Component {

	/**
	 * Ads card to favorite
	 * @param {id} number
	 */
	addToFavorite = id => {
		console.log(id);
	}

	render() {
		return <Card 
					addToFavorite={this.addToFavorite}
					config={this.props.config} />;
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

}); 

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);