import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
		setAddValue, 
		setAddError, 
		setItem,
		setBusyState } from '../../ducks/Tags';

import TagsFormProvider from './TagsFormProvider';



import './TagsForm.css';

class TagsForm extends Component {

	constructor(props) {
		super(props);
		this.addinput = React.createRef();

		this.provider = new TagsFormProvider();
	}

	/**
	 * Add new keyword tag
	 * @param {object} e - Event
	 */
	addTag = (e) => {

		e.preventDefault();

		let value = this.addinput.current.value.trim();
		this.props.setAddValue(value);

		if (value === '') {
			this.props.setAddInputError(true);
			return false;
		}

		this.props.setAddInputError(false);
		this.props.setBusy(true);

		this.provider.createItem({name : value})
			.then( data => {
				this.props.setItem(data);
				this.props.setBusy(false);
				// this.props.setAddValue('');
				this.addinput.current.value = '';

			})
			.catch(e => console.log(e))
		
	}

	render() {

		const { addInputError, busy, addValue } = this.props;

		let addInputClassName  = addInputError ? 'input is-danger' : 'input';
		let addButtonClassName = busy ? 'button is-info is-loading' : 'button is-info';

		console.log(addValue);

		return (
			<div className="tags__form">
				<h4 className="title is-5 app__title">Теги фильтрации</h4>
				<br/>

				<h6 className="subtitle is-6 app__title">Добавить</h6>
				<div className="tags__form-inner">
					<form onSubmit={this.addTag}>
						<div className="field has-addons">
							<p className="control">
								<input 
									ref={this.addinput} 
									className={addInputClassName} 
									type="text" />
							</p>
							<div className="control">
								<button className={addButtonClassName}>
									<i className="fas fa-plus-circle"></i>
								</button>
							</div>
						</div>
					</form>
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
	addInputError : state.tags.addError,
	busy          : state.tags.get('busy'),
	addValue      : state.tags.get('addValue')
});

const mapDispatchToProps = dispatch => ({
	setAddValue      : (value)   => dispatch(setAddValue(value)),
	setAddInputError : (isError) => dispatch(setAddError(isError)),
	setItem          : (item)    => dispatch(setItem(item)),
	setBusy          : (value)   => dispatch(setBusyState(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(TagsForm);