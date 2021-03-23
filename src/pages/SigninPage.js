import React from "react";

import SigninForm from "../components/Forms/SigninForm";
import "./styles/welcome-page.css";
import "./styles/LoginPage.css";

function SigninPage() {
	return (
		<div className="SigninPage welcome-page">
			<SigninForm />
			<div className="SigninPage__background welcome-page__background"></div>
		</div>
	);
}

export default SigninPage;
