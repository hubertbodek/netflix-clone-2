import React from "react";

import LoginForm from "../components/Forms/LoginForm";
import "./styles/LoginPage.css";

function LoginPage() {
	return (
		<div className="LoginPage welcome-page">
			<LoginForm />
			<div className="LoginPage__background welcome-page__background"></div>
		</div>
	);
}

export default LoginPage;
