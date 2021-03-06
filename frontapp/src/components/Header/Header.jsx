import React from 'react';
import { NavLink } from 'react-router-dom';

import Wishpicker from '../Wishpicker/Wishpicker';

import './Header.css';

const Header = (props) => {

	const { items } = props;

	const buildLinks = items => {


		return Object.keys(items).map( elem => {
			const item = items[elem];

			return (
				<li key={`header-link-${item.id}`}>
					<NavLink to={`/catalog/store/${item.slug}`}>
						{ item.name }
					</NavLink>
				</li>
			);
		});
	}

	return (
		<header className="header">
	
			{/* <div className="header_main">
				<div className="container">
					<div className="row">
	
						<div className="col-lg-3 col-sm-3 col-3">
							<div className="logo_container">
								<div className="logo">
									<NavLink to="/catalog">BETTERDEALS</NavLink>
								</div>
							</div>
						</div>
						<div className="col-lg-7">
							<h1 className="app__heading" >Скидки на одежду в интернет-магазинах</h1>
						</div>

	
						<div className="col-lg-2 col-9 text-lg-left text-right">
							<Wishpicker />
						</div>
					</div>
				</div>
			</div> */}
			
	
			<nav className="main_nav">
				<div className="container">
					<div className="row">
						<div className="col">
							
							<div className="main_nav_content d-flex flex-row">
	
	
								<div className="cat_menu_container">
									<div className="cat_menu_title d-flex flex-row align-items-center justify-content-start">
										<div className="cat_burger"><span></span><span></span><span></span></div>
										<div className="cat_menu_text">магазины</div>
									</div>
	
									<ul className="cat_menu">
										<li key='header-link-main'>
											<NavLink to='/catalog'>
												Все
											</NavLink>
										</li>
										{ buildLinks(items) }
									</ul>
								</div>
	
	
								<div className="main_nav_menu ml-auto">
									<Wishpicker />
								</div>
	
	
								<div className="menu_trigger_container ml-auto">
									<div className="menu_trigger d-flex flex-row align-items-center justify-content-end">
										<div className="menu_burger">
											<div className="menu_trigger_text">menu</div>
											<div className="cat_burger menu_burger_inner"><span></span><span></span><span></span></div>
										</div>
									</div>
								</div>
	
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;