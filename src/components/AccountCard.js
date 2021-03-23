import React from "react";

import avatar from "../imgs/avatars/avatar1.png";
import history from "../history.js";

function AccountCard({ username }) {
	const handleOnClick = () => {
		history.push("/browse");
	};

	return (
		<div className="AccountCard" onClick={handleOnClick}>
			<img className="AccountCard__avatar" src={avatar} alt="avatar" />
			<div className="AccountCard__username">{username}</div>
		</div>
	);
}

export default AccountCard;
