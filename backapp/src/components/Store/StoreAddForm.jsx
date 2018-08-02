import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addStore } from '../../ducks/Stores';
import DataProvider from '../../utils/classes/DataProvider';

class StoreAddForm extends Component {

	constructor(props) {
		super(props);

		this.name = React.createRef();
		this.url = React.createRef();
		this.form = React.createRef();

		this.apiUrl = '/backend/store/create';

		this.state = {
			errors : {
				name : false,
				url  : false
			}
		};
	}

	/**
	 * Handles form submit
	 * @param {object} e - Event
	 */
	handleSubmit = (e) => {
		e.preventDefault();

		let name = this.name.current.value,
			url  = this.url.current.value;

		// TO DO - Proper validation	
		if (name.length === 0 || url.length === 0) return;

		const formData = new FormData(this.form.current);
		const provider = new DataProvider();

		provider.post(formData, this.apiUrl)
			.then(data => {
				this.props.addStore(data);
			})
			.catch(e => console.log(e));

	}

	render() {

		return (
			<div>
				<form
					ref={this.form} 
					onSubmit={this.handleSubmit}>

					<div className="field">
						<p className="control has-icons-left">
							<input 
								placeholder="Название"
								ref={this.name}
								name="Store[name]" 
								className='input' 
								type="text" />
							<span className="icon is-small is-left">
								<i className="fas fa-globe"></i>
							</span>
						</p>
					</div>
					
					<div className="field">
						<p className="control has-icons-left">
							<input 
								placeholder="Ссылка на каталог"
								ref={this.url} 
								name="Store[url]" 
								className='input' 
								type="text" />
							<span className="icon is-small is-left">
								<i className="fas fa-link"></i>
							</span>
						</p>
					</div>

					<div className="field">
						<p className="control">
							<button className="button is-info">
							Добавить
							</button>
						</p>
					</div>

				</form>		
			</div>
		);
	}
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
	addStore : (store) => dispatch(addStore(store))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreAddForm);