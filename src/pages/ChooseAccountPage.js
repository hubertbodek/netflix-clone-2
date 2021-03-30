import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import AccountCard from "../components/AccountCard";
import "./styles/ChooseAccountPage.css";
import AddAccountToUser from "../components/Buttons/AddAccountToUser";
import db from "../firebase.js";

function ChooseAccountPage({ user, userId }) {
	const [showButton, setShowButton] = useState(true);
	const [accounts, setAccounts] = useState([]);

	useEffect(() => {
		const unsubscribe = db
			.collection("users")
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

		return unsubscribe;
	}, [userId]);

	const renderCards = () => {
		return accounts.map((account) => {
			// console.log(account)
			return <AccountCard key={uuidv4()} account={account} user={user} />;
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
		user: state.currentUser.user,
		userId: state.currentUser.user.uid,
	};
};

export default connect(mapStateToProps)(ChooseAccountPage);
