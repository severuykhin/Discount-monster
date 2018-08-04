import React, { Component } from 'react';
import DataProvider from '../../utils/classes/DataProvider';

class StoreEditForm extends Component {

	constructor(props) {
		super(props);

		this.name = React.createRef();
		this.url  = React.createRef();
		this.id   = React.createRef();
		this.form = React.createRef();
	}

	/**
	 * Update store with new values
	 * @param {object} e - Event
	 */
	updateStore = (e) => {
		e.preventDefault();
		const data = new FormData(this.form.current);
		const provider = new DataProvider();
		const id = this.id.current.value;

		provider.post(data, `/backend/store/update/${id}`)
			.then(data => {
				console.log(data);
			})
	}

	render() {

		const { config } = this.props;

		return (
			<React.Fragment>
				<form
					onSubmit={this.updateStore}
					ref={this.form} 
					className="store__edit-form">

					<input
						ref={this.id} 
						type="hidden" 
						defaultValue={config.id}/>

					<div className="store__edit-item store__edit-item-1 field is-horizontal">
						<div className="field-body">
							<div className="field">
							<p className="control is-expanded has-icons-left">
								<input
									onChange={() => {}}
									ref={this.name}
									value={config.name} 
									className="input" 
									type="text" 
									placeholder="Название" />
								<span className="icon is-small is-left">
								<i className="fas fa-user"></i>
								</span>
							</p>
							</div>
							<div className="field store__edit-item store__edit-item-2">
								<p className="control is-expanded has-icons-left has-icons-right">
									<input 
										onChange={() => {}}
										ref={this.url}
										className="input" 
										type="text" 
										placeholder="Ссылка" 
										value={config.url} />
									<span className="icon is-small is-left">
										<i className="fas fa-envelope"></i>
									</span>
								</p>
							</div>
						</div>
					</div>
					<div className="field store__edit-item store__edit-item-3 is-horizontal">
						<div className="field-body">
							<div className="field">
							<div className="control">
								<button className="button is-primary">
									Сохранить
								</button>
							</div>
							</div>
						</div>
					</div>
				</form>				
			</React.Fragment>
		);
	}
}

export default StoreEditForm;