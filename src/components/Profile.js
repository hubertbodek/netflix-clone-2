import React from "react";
import { connect } from "react-redux";

import LogoutButton from "./Buttons/LogoutButton";

// Action creator
import { setCurrentProfile } from "../actions";

// Styles
import "./styles/Profile.css";

function Profile({ currentUser, setCurrentProfile }) {
	// const [avatar, setAvatar] = useState(null);

	// fetch data about currently logged user
	// useEffect(() => {
	// 	fetchCurrentProfile(1);
	// }, [fetchCurrentProfile]);

	// // get user's avatar to display
	// useEffect(() => {
	// 	const url =
	// 		currentUser["avatar"] &&
	// 		require(`../imgs/avatars/${currentUser["avatar"]}`);

	// 	if (url) {
	// 		setAvatar(url.default);
	// 	}
	// }, [currentUser]);

	return (
		<div>
			{/* <img className="Profile__avatar" src={avatar} alt="Profile avatar" /> */}
			<LogoutButton />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
	};
};

export default connect(mapStateToProps, { setCurrentProfile })(Profile);
