import React, { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "./styles/Navbar.css";
import logo from "../imgs/netflix_logo.png";
import SearchBar from "./SearchBar";
import Profile from "./Profile";

function Navbar({ location }) {
	const [isWatch, setIsWatch] = useState(false);

	useEffect(() => {
		if (location.pathname.includes("/watch")) {
			setIsWatch(true);
		} else {
			setIsWatch(false);
		}
	}, [location]);

	console.log();
	const ref = useRef();
	return (
		!isWatch && (
			<div className="Navbar">
				<div className="Navbar__left">
					<NavLink exact to="/browse" className="Navbar__link">
						<img
							ref={ref}
							className="Navbar__logo"
							src={logo}
							alt="netflix_logo"
						/>
					</NavLink>
					<NavLink
						activeClassName="selected"
						to="/browse"
						className="Navbar__link"
					>
						Main Page
					</NavLink>
					<NavLink
						activeClassName="selected"
						to="/series"
						className="Navbar__link"
					>
						Series
					</NavLink>
					<NavLink
						activeClassName="selected"
						to="/movies"
						className="Navbar__link"
					>
						Movies
					</NavLink>
					<NavLink
						activeClassName="selected"
						to="/trending"
						className="Navbar__link"
					>
						Trending
					</NavLink>
					<NavLink
						activeClassName="selected"
						to="/mylist"
						className="Navbar__link"
					>
						My List
					</NavLink>
				</div>
				<div className="Navbar__right">
					<SearchBar />
					<Profile />
				</div>
			</div>
		)
	);
}

export default Navbar;
