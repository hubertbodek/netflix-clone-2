import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import db from "../firebase.js";

import { changeAvatarAndUsername } from "../actions";
import "./styles/MyAccountPage.css";
import { Input } from "@material-ui/core";
// import avatar from "../imgs/avatars/avatar1.png";

const avatarPaths = [
	"/avatars/avatar1.png",
	"/avatars/avatar2.png",
	"/avatars/avatar3.png",
	"/avatars/avatar4.png",
	"/avatars/avatar5.png",
	"/avatars/avatar6.png",
	"/avatars/avatar7.png",
	"/avatars/avatar8.png",
];

const useStyles = makeStyles((theme) => ({
	saveBtn: {
		backgroundColor: "white",
		marginTop: theme.spacing(2),
		"&:hover": {
			backgroundColor: "rgba(255,255,255, 0.8)",
		},
	},
	cancelBtn: {
		backgroundColor: "red",
		marginTop: theme.spacing(2),
		marginLeft: theme.spacing(2),

		"&:hover": {
			backgroundColor: "rgba(255,0,0, 0.8)",
		},
	},
	input: {
		color: "white",
		fontSize: "1.8rem",
		width: "16rem",
	},
}));

function MyAccountPage({ account, user, changeAvatarAndUsername }) {
	const [selectedImg, setSelectedImg] = useState(null);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		account ? setInputValue(account.username) : setInputValue("");
	}, [account]);

	const classes = useStyles();

	// console.log(inputValue);

	const handleImgFocus = (e) => {
		setSelectedImg(e.target.getAttribute("src"));
		e.target.classList.add("chosen");
	};

	const handleImgBlur = (e) => {
		e.target.classList.remove("chosen");
	};

	const handleSaveChanges = () => {
		// console.log(user.user.uid, account.id);
		if (inputValue && selectedImg) {
			db.collection("users")
				.doc(user.user.uid)
				.collection("accounts")
				.doc(account.id)
				.update({
					avatar_url: selectedImg,
					username: inputValue,
				});

			changeAvatarAndUsername(selectedImg, inputValue);
		}
	};

	const handleCancelChanges = () => {};

	const renderAvailableAvatars = () => {
		return avatarPaths.map((path, index) => {
			return (
				<div key={path} className="MyAccountPage__avatar-container">
					<img
						className="MyAccountPage__avatar"
						tabIndex={1}
						onFocus={handleImgFocus}
						onBlur={handleImgBlur}
						src={path}
						alt="avatar"
					/>
				</div>
			);
		});
	};

	return (
		<div className="MyAccountPage">
			<div className="MyAccountPage__card">
				<div className="MyAccountPage__credentials">
					<div className="MyAccountPage__current-avatar-container">
						{account && (
							<img
								className="MyAccountPage__avatar"
								src={account?.avatar_url}
								alt="avatar"
							/>
						)}
					</div>

					<Input
						placeholder="Change username"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
						inputProps={{ "aria-label": "description" }}
						className={classes.input}
					/>
				</div>
				<div className="MyAccountPage__change-avatar">
					<h4 className="MyPageAccount__change-header">
						Change your current avatar
					</h4>
					{renderAvailableAvatars()}
				</div>
				<div className="btns-container">
					<Button onClick={handleSaveChanges} className={classes.saveBtn}>
						Save changes
					</Button>
					<Button onClick={handleCancelChanges} className={classes.cancelBtn}>
						Cancel
					</Button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.currentUser,
		account: state.currentUser.currentAccount,
	};
};

export default connect(mapStateToProps, { changeAvatarAndUsername })(
	MyAccountPage
);
