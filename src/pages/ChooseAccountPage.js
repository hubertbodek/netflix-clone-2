import React, { useState } from "react";
import { connect } from "react-redux";

import AccountCard from "../components/AccountCard";
import "./styles/ChooseAccountPage.css";
import AddAccountToUser from "../components/Buttons/AddAccountToUser";
import db from "../firebase.js";

function ChooseAccountPage({ userId }) {
	const [showButton, setShowButton] = useState(true);
	const [accounts, setAccounts] = useState([]);

	db.collection("users")
		.doc(userId)
		.collection("accounts")
		.onSnapshot(({ docs }) => {
			const accounts = docs.map((doc) => {
				return {
					...doc.data(),
				};
			});
			setAccounts(accounts);

			if (docs.length >= 4) {
				setShowButton(false);
			}
		});

	const renderCards = () => {
		return accounts.map((account) => {
			return <AccountCard account={account} username="Bob" />;
		});
	};

	return (
		<div className="ChooseAccountPage">
			{renderCards()}
			{showButton && <AddAccountToUser />}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.currentUser.user.uid,
	};
};

export default connect(mapStateToProps)(ChooseAccountPage);
