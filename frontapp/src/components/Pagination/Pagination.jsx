import React from 'react';
import { NavLink } from 'react-router-dom';

import './Pagination.css';

const Pagination = (props) => {

	const shift = 50;
	
	const buildLinks = (total, baseLink) => {

		const pages =Math.ceil(total / shift); 
		const links = [];
		
		for (let i = 1; i <= pages; i++) {

			let link = '';

			if (i === 1) {
				link = baseLink;
			} else {
				link = `${baseLink}/${i}`;
			}

			links.push((
				<li key={`pagination-page-${i}`}>
					<NavLink to={link}>{ i }</NavLink>
				</li>
			));
		}

		return links;
	}

	return (
		<div className="pagination">
			<div className="shop_page_nav d-flex flex-row">
				<div className="page_prev d-flex flex-column align-items-center justify-content-center"><i className="fas fa-chevron-left"></i></div>
				<ul className="page_nav d-flex flex-row">
					{/* <li><a href="#">1</a></li>
					<li><a href="#">2</a></li>
					<li><a href="#">3</a></li>
					<li><a href="#">...</a></li>
					<li><a href="#">21</a></li> */}
					{ buildLinks(props.total, props.baseLink) }
				</ul>
				<div className="page_next d-flex flex-column align-items-center justify-content-center"><i className="fas fa-chevron-right"></i></div>
			</div>
		</div>
	);
};

export default Pagination;