import React from "react";
import { connect } from "react-redux";
import { Button, withStyles } from "@material-ui/core";

import { setCurrentProfile } from "../../actions";
import { auth } from "../../firebase.js";

const RedButton = withStyles({
	root: {
		backgroundColor: "red",
		borderRadius: 0,
		width: '80%',
		'&:hover': {
			backgroundColor: 'rgb(200,0,0)'
		}
	},
})(Button);

function LogoutButton({ setCurrentProfile }) {
	return (
		<RedButton
			className="LogoutButton"
			onClick={() => {
				auth.signOut();
			}}
		>
			Logout
		</RedButton>
	);
}

export default connect(null, { setCurrentProfile })(LogoutButton);
