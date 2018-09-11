import React from 'react';
import { NavLink } from 'react-router-dom';

const Pagination = (props) => {

	const {total, step, baseLink} = props;

	const renderItems =  (total, step) => {
		const steps = Math.ceil(total / step);
		const items = [];
		for (let i = 1; i <= steps; i++) {
			items.push((
				<li key={`pagination-item-${i}`}>
					<NavLink
						exact 
						to={`/backend${baseLink}/${i}`}
						className="pagination-link"
						activeClassName="pagination-link is-current" >
						{i}
					</NavLink>
				</li>
			));
		}

		return items;
	}


	return (
		<div>
			<nav className="pagination" aria-label="pagination">
				<ul className="pagination-list">
					{ renderItems(total, step) }
				</ul>
			</nav>	
		</div>
	);
};

export default Pagination;