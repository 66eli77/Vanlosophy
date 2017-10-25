'use strict';

import React from 'react';
import { Link } from 'react-router';


const Header = (props) => {

	return (
		<header className="main">
		<div className="container">

			<div className="logo">
				<Link to="/">Vanlosophy</Link>
			</div>

			<nav>
				<Link to="/gallery" activeClassName="active">Gallery</Link>
				<span className="sep"></span>
				<Link to="/features" activeClassName="active">Features</Link>
			</nav>

		</div>
		</header>
	);

}

export default Header;
