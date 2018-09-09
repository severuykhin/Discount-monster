import React from 'react';
import { NavLink } from 'react-router-dom';

import './Pagination.css';

const Pagination = (props) => {

	const shift = 45;
	const pages = props.total ? Math.ceil(props.total / shift) : 0;

	/**
	 * Build navlink component based on given params
	 * @param {number} index 
	 * @param {string} activeClass 
	 * @param {string} link 
	 */
	const buildLink = (index, link, queryParams) => {

		let isActive = link === window.location.pathname;
		let activeClass = isActive ? 'active' : '';

		return (
			<li key={`pagination-page-${index}`}>
				<NavLink
					exact
					className={activeClass}
					to={link + queryParams}>
					{ index }
				</NavLink>
			</li>
		);
	}

	/**
	 * Just builds empty item
	 * @param {string} id
	 */
	const buildStub = (id) => {
		return (<li key={`pagination-page-stub-${id}`}>
				<span>...</span>
				</li>);
	}

	/**
	 * Build links with gap if number of pages is bigger than 11
	 * @param { number } pages - Total number of available pages 
	 * @param { number } current - Current active page 
	 * @param { string } baseLink - canonical
	 * @param { string } queryParams - all params in query string  
	 */
	const buildWithGap = (pages, baseLink, queryParams, current) => {
		const links = [];

		// If current page is near edge of pages
		// Just buld last 8 pages
		if (current + 4 >= pages - 1) {
			
			for (let i = pages - 1; i >= pages - 8; i--) {
				let link = `${baseLink}/${i}`
				links.unshift(buildLink(i, link, queryParams));
			}
			links.unshift(buildStub('first'));
		}

		// If current page if bigger than 6 but smaller than "near edge"
		else if (current > 6 && (current + 3 < pages - 1)) {
			for (let i = current - 3; i <= current + 3; i++) {
				let link = `${baseLink}/${i}`
				links.push(buildLink(i, link, queryParams));
			}	

			links.unshift(buildStub('first'));
			links.push(buildStub('last'));
			
		// else just build pages from second - to 9
		} else {

			for (let i = 2; i <= 9; i++) {
				let link = `${baseLink}/${i}`
				links.push(buildLink(i, link, queryParams));
			}	
			links.push(buildStub('last'));

		}

		// Insert first an last page
		links.unshift(buildLink(1, baseLink, queryParams));
		links.push(buildLink(pages, `${baseLink}/${pages}`, queryParams));

		return links;
	}

	/**
	 * 
	 * @param { number } pages - Total number of available pages 
	 * @param { string } baseLink - canonical
	 * @param { string } queryParams - all params in query string  
	 */
	const buildLinks = (pages, baseLink, queryParams, current) => {

		let links = [];

		// If number of pages is bigger than 10 - return links with gap 
		// with somee other logic
		if (pages > 11) return buildWithGap(pages, baseLink, queryParams, current); 


		for (let i = 1; i <= pages; i++) {

			let link = '';

			if (i === 1) {
				link = `${baseLink}`;
			} else {
				link = `${baseLink}/${i}`;
			}

			links.push(buildLink(i, link, queryParams));
		}

		return links;
	}

	/**
	 * Generates link-button to next page 
	 * @param {number} currentPage 
	 * @param {number} pages 
	 * @param {string} baseLink
	 */
	const getNextLink = (currentPage, pages, baseLink, queryParams) => {


		if (
			currentPage === pages ||
			(currentPage === 0 && pages === 1)
		) return <i className="fas fa-chevron-right" disabled></i>;

		let link = currentPage === 0 ? `${baseLink}/2` : `${baseLink}/${currentPage + 1}`;

		return (
			<NavLink to={link + queryParams} > 
				<i className="fas fa-chevron-right"></i>
			</NavLink>);
	}

	/**
	 * Generates link-button to prev page 
	 * @param {number} currentPage 
	 * @param {number} pages 
	 * @param {string} baseLink
	 * @param {string} queryParams
	 */
	const getPrevLink = (currentPage, pages, baseLink, queryParams) => {

		if (currentPage === 0) return <i className="fas fa-chevron-left" disabled></i>;

		let link = currentPage === 2 ? `${baseLink}` : `${baseLink}/${currentPage - 1}`;

		return (
			<NavLink to={link + queryParams}> 
				<i className="fas fa-chevron-left"></i>
			</NavLink>
		);
	}

	return (
		<div className="pagination">
			<div className="shop_page_nav d-flex flex-row">
				<div className="page_prev d-flex flex-column align-items-center justify-content-center">
					{ getPrevLink(props.current, pages, props.baseLink, props.queryParams) }
				</div>
				<ul className="page_nav d-flex flex-row">
					{ buildLinks(pages, props.baseLink, props.queryParams, props.current) }
				</ul>
				<div className="page_next d-flex flex-column align-items-center justify-content-center">
					{ getNextLink(props.current, pages, props.baseLink, props.queryParams) }
				</div>
			</div>
		</div>
	);
};

export default Pagination;