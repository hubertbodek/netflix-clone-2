import React from "react";
import { Button, withStyles } from "@material-ui/core";

const CustomButton = withStyles({
	root: {
		backgroundColor: "#E50914",
		color: "white",
		fontSize: "1.2rem",
		"&:hover": {
			backgroundColor: "red",
		},
	},
})(Button);

function LoginButton({ disabled, children }) {
	return (
		<CustomButton variant="contained" type="submit" disabled={disabled}>
			{children}
		</CustomButton>
	);
}

export default LoginButton;
