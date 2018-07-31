import React, { Component } from 'react';

import './TagsForm.css';

class TagsForm extends Component {
	render() {
		return (
			<div className="tags__form">
				<h4 className="title is-5 app__title">Теги фильтрации</h4>
				<br/>

				<h6 className="subtitle is-6 app__title">Добавить</h6>
				<div className="tags__form-inner">
					<div className="field has-addons">
						<p className="control">
							<input className="input" type="text" />
						</p>
						<div className="control">
							<span className="button is-info">
								<i className="fas fa-plus-circle"></i>
							</span>
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

export default TagsForm;