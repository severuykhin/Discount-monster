import React from 'react';
import { NavLink } from 'react-router-dom';

import './Pagination.css';

const Pagination = (props) => {

	const shift = 50;
	const pages = Math.ceil(props.total / shift);

	const buildLinks = (pages, baseLink) => {

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
					<NavLink
						exact
						to={link}>
						{ i }
					</NavLink>
				</li>
			));
		}

		return links;
	}

	/**
	 * Generates link-button to next page 
	 * @param {number} currentPage 
	 * @param {number} pages 
	 * @param {string} baseLink
	 */
	const getNextLink = (currentPage, pages, baseLink) => {

		if (currentPage === pages) return <i className="fas fa-chevron-right" disabled></i>;

		let link = currentPage === 0 ? `${baseLink}/2` : `${baseLink}/${currentPage + 1}`;

		return (
			<NavLink to={link} > 
				<i className="fas fa-chevron-right"></i>
			</NavLink>);
	}

	/**
	 * Generates link-button to prev page 
	 * @param {number} currentPage 
	 * @param {number} pages 
	 * @param {string} baseLink
	 */
	const getPrevLink = (currentPage, pages, baseLink) => {

		if (currentPage === 0) return <i className="fas fa-chevron-left" disabled></i>;

		let link = currentPage === 2 ? `${baseLink}` : `${baseLink}/${currentPage - 1}`;

		return (
			<NavLink to={link}> 
				<i className="fas fa-chevron-left"></i>
			</NavLink>
		);
	}

	return (
		<div className="pagination">
			<div className="shop_page_nav d-flex flex-row">
				<div className="page_prev d-flex flex-column align-items-center justify-content-center">
					{ getPrevLink(props.current, pages, props.baseLink) }
				</div>
				<ul className="page_nav d-flex flex-row">
					{ buildLinks(pages, props.baseLink) }
				</ul>
				<div className="page_next d-flex flex-column align-items-center justify-content-center">
					{ getNextLink(props.current, pages, props.baseLink) }
				</div>
			</div>
		</div>
	);
};

export default Pagination;