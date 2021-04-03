import React from "react";
import { connect } from "react-redux";

import { setCurrentAccount } from "../actions";
import history from "../history.js";
import db from "../firebase.js";

function AccountCard({ user, account, setCurrentAccount, hasEvent = true }) {
	const handleOnClick = async () => {
		setCurrentAccount(account);
		const userRef = db.collection(`users`).doc(user.uid);
		userRef.update({
			currentAccountId: account.id,
		});
		history.push("/browse");
	};

	return (
		<div className="AccountCard" onClick={hasEvent && handleOnClick}>
			<img
				className="AccountCard__avatar"
				src={account.avatar_url}
				alt="avatar"
			/>
			<div className="AccountCard__username">{account.username}</div>
		</div>
	);
}

export default connect(null, { setCurrentAccount })(AccountCard);
