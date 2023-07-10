import {NavLink , Link} from "react-router-dom";

import "./header.scss";

function Header() {
	return (
		<header className="header">
			<Link to="/" className="logo">
				Beauty
				<br />
				Admin
			</Link>
			<nav>
				<ul className="header__list">
					<li className="header__li">
						<NavLink to="/schedule" className={({isActive, isPending}) =>
							isActive ? "header__link header__link_active " : "header__link"
						}>
							Schedule
						</NavLink>
					</li>
					<li className="header__li">
						<NavLink to="/history" className={({isActive, isPending}) =>
							isActive ? "header__link header__link_active " : "header__link"
						}>
							History
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
