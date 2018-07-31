import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setAddValue } from '../../ducks/Tags';

import './TagsForm.css';

class TagsForm extends Component {

	constructor(props) {
		super(props);
		this.addinput = React.createRef();
	}

	addTag = () => {

		let value = this.addinput.current.value;
		this.props.setAddValue(value);
	}

	render() {
		return (
			<div className="tags__form">
				<h4 className="title is-5 app__title">Теги фильтрации</h4>
				<br/>

				<h6 className="subtitle is-6 app__title">Добавить</h6>
				<div className="tags__form-inner">
					<div className="field has-addons">
						<p className="control">
							<input ref={this.addinput} className="input" type="text" />
						</p>
						<div className="control">
							<button onClick={this.addTag} className="button is-info">
								<i className="fas fa-plus-circle"></i>
							</button>
						</div>
					</div>
				</div>
				<br/>
				<br/>

				<h6 className="subtitle is-6 app__title">Найти</h6>
				<div className="tags__form-inner">
					<div className="field">
						<p className="control has-icons-left">
							<input className="input" type="text" />
							<span className="icon is-small is-left">
							<i className="fas fa-search"></i>
							</span>
						</p>
					</div>
				</div>

			</div>
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	setAddValue : (value) => dispatch(setAddValue(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsForm);