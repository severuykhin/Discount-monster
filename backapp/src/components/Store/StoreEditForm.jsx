import React, {Component} from 'react';

class StoreEditForm extends Component  {
	
	constructor(props) {
		super(props);

		this.name = React.createRef();
		this.url  = React.createRef(); 
		this.slug = React.createRef(); 
	}

	storeValues = (e, withSave = false) => {

		e.preventDefault();

		const config = {
			id   : this.props.store.id,
			name : this.name.current.value,
			slug : this.slug.current.value,
			url  : this.url.current.value
		}

		this.props.updateCurrentStore(config, withSave);
	}

	render() {
		const activeClassName = this.props.active ? 'store__edit-area store__edit-area_active' : 'store__edit-area'; 

		return (
			<div className={activeClassName}>
				<br />
				<form onSubmit={(e) => {this.storeValues(e, true)}}>
					<div className="field store__edit-item store__edit-item-1">
						<p className="control has-icons-left has-icons-right">
							<input 
								value={this.props.store.name}
								onChange={this.storeValues}
								ref={this.name}
								className="input" 
								type="text" 
								placeholder="Название" />
							<span className="icon is-small is-left">
							<i className="fas fa-envelope"></i>
							</span>
						</p>
					</div>

					<div className="field store__edit-item store__edit-item-1">
						<p className="control has-icons-left has-icons-right">
							<input 
								value={this.props.store.slug}
								onChange={this.storeValues}
								ref={this.slug}
								className="input" 
								type="text" 
								placeholder="slug" />
							<span className="icon is-small is-left">
							<i className="fas fa-envelope"></i>
							</span>
						</p>
					</div>

					<div className="field store__edit-item store__edit-item-2">
						<p className="control has-icons-left">
							<input 
								value={this.props.store.url}
								onChange={this.storeValues}
								ref={this.url}
								className="input" 
								type="text" 
								placeholder="url" />
							<span className="icon is-small is-left">
							<i className="fas fa-lock"></i>
							</span>
						</p>
					</div>

					<div className="field store__edit-item store__edit-item-3">
						<p className="control">
							<button className="button is-success">
								Сохранить
							</button>
						</p>
					</div>	
				</form>	
				<br />
			</div>
		);
	}
};

export default StoreEditForm;