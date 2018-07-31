// Core stuff
import React, { Component } from 'react';
import { connect } from 'react-redux';

// Redux stuff
import { setItems } from '../../ducks/Tags';

// Custom componsnets
import TagsContent from './TagsContent';

// Custom classes
import DataProvider from '../../utils/classes/DataProvider';


class TagsContentContainer extends Component {

	constructor(props) {
		super(props);
		this.provider = new DataProvider();
		this.url = '/backend/tags/index';
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
				<TagsContent items={items} />
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	items : state.tags.items.toArray()
});

const mapDispatchToProps = dispatch => ({
	setItems : (items) => dispatch(setItems(items))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsContentContainer);