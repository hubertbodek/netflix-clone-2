import React from "react";
import { connect } from "react-redux";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";

// import avatar from "../imgs/avatars/avatar1.png";
import LogoutButton from "./Buttons/LogoutButton";

// Action creator
import { setCurrentProfile } from "../actions";
import history from "../history";

// Styles
import "./styles/Profile.css";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(1),
		backgroundColor: "rgb(27,27,27)",
		color: "white",
		outline: "1px solid rgba(255,255,255,0.15)",
	},
	menuList: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",

		"& li": {
			width: "100%",

			"&:hover": {
				backgroundColor: "rgb(42,42,42)",
			},
		},
	},
}));

function Profile({ currentUser, setCurrentProfile }) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}

		setOpen(false);
	};

	const handleChangePage = (event, url) => {
		handleClose(event);
		history.push(url);
	};

	function handleListKeyDown(event) {
		if (event.key === "Tab") {
			event.preventDefault();
			setOpen(false);
		}
	}

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	return (
		<div className="Profile">
			<div
				className="Profile__avatar-container"
				ref={anchorRef}
				aria-controls={open ? "menu-list-grow" : undefined}
				aria-haspopup="true"
				onClick={handleToggle}
			>
				{currentUser?.currentAccount?.avatar_url && (
					<img
						className="Profile__avatar"
						src={currentUser.currentAccount.avatar_url}
						alt="Profile avatar"
					/>
				)}
			</div>
			<Popper
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin:
								placement === "bottom" ? "center top" : "center bottom",
						}}
					>
						<Paper className={classes.paper}>
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList
									className={classes.menuList}
									autoFocusItem={open}
									id="menu-list-grow"
									onKeyDown={handleListKeyDown}
								>
									<MenuItem onClick={handleClose}>Profile</MenuItem>
									<MenuItem
										onClick={(e) => {
											handleChangePage(e, "/myaccount");
										}}
									>
										My account
									</MenuItem>
									<MenuItem
										onClick={(e) => {
											handleChangePage(e, "/");
										}}
									>
										Change account
									</MenuItem>
									<LogoutButton />
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
			{/* <LogoutButton /> */}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

export default connect(mapStateToProps, { setCurrentProfile })(Profile);
