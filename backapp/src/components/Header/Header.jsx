import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<div className="header">
			<nav className="navbar is-light">
				<div className="navbar-brand">
					<NavLink to="/backend" className="navbar-item">
						Logo
					</NavLink>
					<NavLink to="/backend/tags" className="navbar-item">
						Тэги
					</NavLink>
					<NavLink to="/backend/store" className="navbar-item">
						Магазины
					</NavLink>
				</div>
			</nav>
		</div>
	);
};

export default Header;