import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import "./styles/MyProfilePage.css";
import AccountCard from "../components/AccountCard";
import AddAccountToUser from "../components/Buttons/AddAccountToUser";
import db from "../firebase.js";

function MyProfilePage({ user, userId, email }) {
	const [showButton, setShowButton] = useState(true);
	// const [header, setHeader] = useState("Choose your account");
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
			console.log(account);
			return <AccountCard key={uuidv4()} account={account} user={user} />;
		});
	};

	return (
		<div className="MyProfilePage">
			<div className="page-card">
				<div className="page-credentials">
					<h2 className="page-user-email">
						Hi, <span className="page-email">{email}</span>!
					</h2>
				</div>
				<div className="page-flex-container">
					{renderCards()}
					{showButton ? <AddAccountToUser /> : null}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.currentUser.user,
		userId: state.currentUser.user.uid,
		email: state.currentUser.user.email,
	};
};

export default connect(mapStateToProps)(MyProfilePage);
