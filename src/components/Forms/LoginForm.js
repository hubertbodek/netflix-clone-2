import React from "react";
import { connect } from "react-redux";

import { Formik, Form } from "formik";

import history from "../../history.js";
import "./LoginForm.css";
import { setCurrentProfile } from "../../actions";
import { auth } from "../../firebase.js";
import InputField from "./InputField";
import LoginButton from "../Buttons/LoginButton";

function LoginForm({ setCurrentProfile }) {
	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validate={(values) => {
				const errors = {};
				if (!values.email) {
					errors.email = "Field required";
				}
				if (!values.password) {
					errors.password = "Field required";
				}

				return errors;
			}}
			onSubmit={(values, { setErrors, setSubmitting }) => {
				auth
					.signInWithEmailAndPassword(values.email, values.password)
					.then((userCredential) => {
						setCurrentProfile(userCredential.user);
						setSubmitting(true);
						history.push("/");
					})
					.catch((err) => {
						if (err.code === "auth/user-not-found") {
							setErrors({ email: err.message });
						} else if (err.code === "auth/wrong-password") {
							setErrors({ password: err.message });
						}
					});
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="LoginForm">
					<h2 className="LoginForm__header">Log in</h2>
					<InputField
						className="LoginForm__text"
						autocomplete="email"
						type="email"
						name="email"
						label={"Email"}
					/>
					<InputField
						className="LoginForm__text"
						autocomplete="current-password"
						type="password"
						name="password"
						label={"Password"}
					/>
					<LoginButton disabled={isSubmitting}>Log in</LoginButton>
					<span className="LoginForm__signin">
						Not registered?{" "}
						<span
							onClick={() => {
								history.push("/signin");
							}}
							className="LoginForm__signin-link"
						>
							Create an account
						</span>
						.
					</span>
				</Form>
			)}
		</Formik>
	);
}

export default connect(null, { setCurrentProfile })(LoginForm);
