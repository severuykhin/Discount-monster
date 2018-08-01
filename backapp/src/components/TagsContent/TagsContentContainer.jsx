// Core stuff
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Redux stuff
import { setItems, deleteItem } from '../../ducks/Tags';

// Custom componsnets
import TagsContent from './TagsContent';

// Custom classes
import DataProvider from '../../utils/classes/DataProvider';


class TagsContentContainer extends Component {

	constructor(props) {
		super(props);
		this.provider = new DataProvider();
		this.url = '/backend/tags/index';
		this.deleteUrl = '/backend/tags/delete';
	}

	/**
	 * Deletes choosen item
	 * @param { number } id
	 */
	deleteItem = (id) => {

		const data = new FormData();
		data.append('id', id);

		this.provider.post(data, this.deleteUrl)
			.then( response => {
				if (response && response.result === 'ok') {
					this.props.deleteItem(id);
				} else {
					throw new Error('Tags Content: ERROR while deleting item');
				}
			})
			.catch( e => console.log(e));

	}

	componentDidMount() {

		this.provider.get(this.url)
			.then(data => {
				this.props.setItems(data);
			})
			.catch(e => {
				console.log(e);
			});

	}

	render() {

		const { items } = this.props;

		return (
			<React.Fragment>
				<TagsContent 
					items={items}
					deleteItem={this.deleteItem} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items : state.tags.items.toArray()
});

const mapDispatchToProps = dispatch => ({
	setItems   : (items) => dispatch(setItems(items)),
	deleteItem : (id)    => dispatch(deleteItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsContentContainer);