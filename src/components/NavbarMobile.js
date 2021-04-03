import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

// import Profile from "./Profile";
import SearchBar from "./SearchBar";
import logo from "../imgs/netflix_logo.png";

import "./styles/NavbarMobile.css";
import { Drawer, List, ListItem } from "@material-ui/core";
import HamburgerMenu from "react-hamburger-menu";
import LogoutButton from "./Buttons/LogoutButton";

function NavbarMobile({ location }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const [mount, setMount] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}

		setIsOpen(open);
		setMenuOpen(open);
	};

	// const handleMenuClick = () => {
	// 	setMenuOpen(!menuOpen);
	// };

	const list = () => (
		<div
			className="list"
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
		>
			<List>
				<ListItem button>
					<NavLink
						activeClassName="selected selected__mobile"
						to="/browse"
						className="Navbar__link link__mobile"
					>
						Main Page
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink
						activeClassName="selected selected__mobile"
						to="/series"
						className="Navbar__link link__mobile"
					>
						Series
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink
						activeClassName="selected selected__mobile"
						to="/movies"
						className="Navbar__link link__mobile"
					>
						Movies
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink
						activeClassName="selected selected__mobile"
						to="/mylist"
						className="Navbar__link link__mobile"
					>
						My List
					</NavLink>
				</ListItem>
				{/* <ListItem button>
					<NavLink
						activeClassName="selected selected__mobile"
						to="/myprofile"
						className="Navbar__link link__mobile"
					>
						Profile
					</NavLink>
				</ListItem> */}
				<ListItem button>
					<NavLink
						activeClassName="selected selected__mobile"
						to="/myaccount"
						className="Navbar__link link__mobile"
					>
						My account
					</NavLink>
				</ListItem>
				<ListItem button>
					<NavLink to="/" className="Navbar__link link__mobile">
						Change account
					</NavLink>
				</ListItem>
				<ListItem button>
					<LogoutButton />
				</ListItem>
			</List>
		</div>
	);

	useEffect(() => {
		if (
			location.pathname.includes("/watch") ||
			location.pathname.includes("/login") ||
			location.pathname.includes("/signin") ||
			location.pathname === "/"
		) {
			setMount(false);
		} else {
			setMount(true);
		}
	}, [location]);

	const ref = useRef();
	return (
		mount && (
			<div className="Navbar">
				<NavLink
					exact
					to="/browse"
					className="Navbar__link Navbar__logo-container"
				>
					<img
						ref={ref}
						className="Navbar__logo"
						src={logo}
						alt="netflix_logo"
					/>
				</NavLink>
				<SearchBar />
				<div className="Navbar__button-container">
					{/* <button onClick={toggleDrawer(true)}>xdd</button> */}
					<div
						className="Navbar__hamburger-container"
						onClick={toggleDrawer(true)}
					>
						<HamburgerMenu
							width={18}
							height={12}
							isOpen={menuOpen}
							menuClicked={() => {
								return null;
							}}
							color="white"
						/>
					</div>
				</div>
				<Drawer anchor={"top"} open={isOpen} onClose={toggleDrawer(false)}>
					{list()}
				</Drawer>
				{/* <Profile /> */}
			</div>
		)
	);
}

export default NavbarMobile;
