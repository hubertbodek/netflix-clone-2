import React, { useState } from "react";
// import { connect } from "react-redux";

import { withStyles, Checkbox } from "@material-ui/core";
import { red } from "@material-ui/core/colors";
import { Formik, Form, Field, ErrorMessage } from "formik";

import history from "../../history.js";
import "./LoginForm.css";
import "./SigninForm.css";
// import { setCurrentProfile } from "../../actions";
import { auth } from "../../firebase.js";
import db from "../../firebase.js";
import InputField from "./InputField";
import LoginButton from "../Buttons/LoginButton";

const RedCheckbox = withStyles({
	root: {
		color: red[400],
		"&$checked": {
			color: red[600],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

function SigninForm() {
	const [signedCorrectly, setSignedCorrectly] = useState(false);

	return (
		<Formik
			initialValues={{ email: "", password: "", terms: false }}
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
				if (!values.terms) {
					setErrors({
						terms: "You are required to accept policy terms!",
					});
				} else {
					auth
						.createUserWithEmailAndPassword(values.email, values.password)
						.then((userCredential) => {
							// setCurrentProfile(userCredential.user);
							console.log(userCredential);
							setSignedCorrectly(true);
							db.collection("users")
								.doc(userCredential.user.uid)
								.set({
									user: {
										uid: userCredential.user.uid,
										email: userCredential.user.email,
									},
									my_list: [],
									avatar_url: "",
								})
								.catch((err) => console.log(err));
							setSubmitting(true);
						})
						.catch((err) => {
							console.log(err);
							if (err.code === "auth/email-already-in-use") {
								setErrors({ email: err.message });
							}
						});
				}
				setSubmitting(false);
			}}
		>
			{({ isSubmitting }) => (
				<Form className="LoginForm">
					{signedCorrectly ? (
						<div className="SigninForm__signed">
							<h2 className="SigninForm__header">Thank you!</h2>
							<p className="SigninForm__information">
								Your account has been successfuly created.
							</p>
							<p className="SigninForm__information">
								You can log in to the app by clicking {""}
								<span onClick={() => history.push("/login")} class="login-link">
									this link
								</span>
								.
							</p>
						</div>
					) : (
						<>
							<h2 className="LoginForm__header">Sign in</h2>
							<InputField
								className="LoginForm__text"
								type="email"
								name="email"
								label={"Email"}
							/>
							<InputField
								className="LoginForm__text"
								type="password"
								name="password"
								label={"Password"}
							/>
							<div className="LoginForm__terms">
								<Field
									// className="LoginForm__checkbox"
									id="terms"
									type="checkbox"
									name="terms"
									as={RedCheckbox}
								/>
								<label htmlFor="terms" className="LoginForm__terms-info">
									I accept the Terms of Use & Privacy Policy.
								</label>
							</div>
							<LoginButton disabled={isSubmitting}>Sign in</LoginButton>
							<span className="error-message">
								<ErrorMessage name="terms" />
							</span>
							<span className="LoginForm__signin">
								Already have an account?{" "}
								<span
									onClick={() => {
										history.push("/login");
									}}
									className="LoginForm__signin-link"
								>
									Log in
								</span>
								.
							</span>
						</>
					)}
				</Form>
			)}
		</Formik>
	);
}

export default SigninForm;
