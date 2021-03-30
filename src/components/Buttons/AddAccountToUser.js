import React from "react";
import { connect } from "react-redux";

import db from "../../firebase.js";
import defaultAvatar from "../../imgs/avatars/avatar1.png";

function AddAccountToUser({ userId }) {
	const addUser = async () => {
		const newAccRef = db
			.collection("users")
			.doc(userId)
			.collection("accounts")
			.doc();

		// const { docs } = await accountsRef.get();

		newAccRef.set({
			id: newAccRef.id,
			my_list: [],
			avatar_url: defaultAvatar,
			username: "User",
		});
	};

	return (
		<button onClick={addUser} className="btn--round">
			+
		</button>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.currentUser.user.uid,
	};
};

export default connect(mapStateToProps)(AddAccountToUser);
