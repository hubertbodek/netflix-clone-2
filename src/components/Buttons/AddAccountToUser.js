import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import db from "../../firebase.js";
import defaultAvatar from "../../imgs/avatars/avatar1.png";

function AddAccountToUser({ userId }) {
	const addUser = async () => {
		const accountsRef = db
			.collection("users")
			.doc(userId)
			.collection("accounts");

		// const { docs } = await accountsRef.get();

		accountsRef.add({
			my_list: [],
			avatar_url: defaultAvatar,
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
