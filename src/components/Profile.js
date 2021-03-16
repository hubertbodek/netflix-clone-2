import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// Action creator
import { fetchCurrentProfile } from "../actions";

// Styles
import "./styles/Profile.css";

function Profile({ currentUser, fetchCurrentProfile }) {
	const [avatar, setAvatar] = useState(null);

	// fetch data about currently logged user
	useEffect(() => {
		fetchCurrentProfile(1);
	}, [fetchCurrentProfile]);

	// get user's avatar to display
	useEffect(() => {
		const url =
			currentUser["avatar"] &&
			require(`../imgs/avatars/${currentUser["avatar"]}`);

		if (url) {
			setAvatar(url.default);
		}
	}, [currentUser]);

	return (
		<div className="Profile">
			<img className="Profile__avatar" src={avatar} alt="Profile avatar" />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

export default connect(mapStateToProps, { fetchCurrentProfile })(Profile);
