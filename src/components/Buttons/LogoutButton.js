import React from "react";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";

import { setCurrentProfile } from "../../actions";
import "./styles/LogoutButton.css";
import { auth } from "../../firebase.js";

const RedButton = withStyles({
	root: {
		backgroundColor: "red",
	},
})(Button);

function LogoutButton({ setCurrentProfile }) {
	return (
		<div>
			<RedButton
				className="LogoutButton"
				onClick={() => {
					auth.signOut();
				}}
			>
				Logout
			</RedButton>
		</div>
	);
}

export default connect(null, { setCurrentProfile })(LogoutButton);
