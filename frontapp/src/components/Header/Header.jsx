import React from 'react';
import { NavLink } from 'react-router-dom';

import Wishpicker from '../Wishpicker/Wishpicker';

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
	
			<div className="header_main">
				<div className="container">
					<div className="row">
	
						<div className="col-lg-4 col-sm-3 col-3 order-1">
							<div className="logo_container">
								<div className="logo">
									<NavLink to="/catalog">DISCOUNTMONSTER</NavLink>
								</div>
							</div>
						</div>

	
						<div className="col-lg-8 col-9 order-lg-3 order-2 text-lg-left text-right">
							<Wishpicker />
						</div>
					</div>
				</div>
			</div>
			
	
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
									{/* <ul className="standard_dropdown main_nav_dropdown">
										<li><a href="#">Главная<i className="fas fa-chevron-down"></i></a></li>
										<li className="hassubs">
											<a href="#">Супер-скидки!</a>
										</li>
										<li className="hassubs">
											<a href="#">Хайп</a>
										</li>
									</ul> */}
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