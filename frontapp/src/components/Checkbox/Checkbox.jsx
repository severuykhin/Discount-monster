import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {

	const { config, name } = props;

	const extHandler = props.onChange ? props.onChange : () => {};
	const handlerChange = (e) => {
		let checked = e.currentTarget.checked;
		extHandler({
			gender : e.currentTarget.value,
			checked
		});
	}

	return (
		<div className="checkbox">
			<div className="checkbox__wrap">
				<input 
					onChange={(e) => { handlerChange(e) }}
					type="checkbox"
					checked={props.isChecked} 
					id={`checkbox-${name}-${config.value}`} 
					value={config.value} />
				<label htmlFor={`checkbox-${name}-${config.value}`} >{ config.name }</label>
			</div>
		</div>
	);
};

export default Checkbox;