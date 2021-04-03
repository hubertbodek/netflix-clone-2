import { useEffect } from "react";
import { Router, Route } from "react-router-dom";
// import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";
import { useMedia } from "react-media";

import { setCurrentProfile, fetchMyList, setCurrentAccount } from "../actions";
import history from "../history";

// COMPONENTS
import Navbar from "./Navbar";
import NavbarMobile from "./NavbarMobile";
import Footer from "./Footer/Footer";
import Modal from "./Modal";
import Video from "./Video/Video";
// PAGES
import MainPage from "../pages/MainPage";
import MoviesPage from "../pages/MoviesPage";
import MyListPage from "../pages/MyListPage";
import SeriesPage from "../pages/SeriesPage";
import TrendingPage from "../pages/TrendingPage";
import LoginPage from "../pages/LoginPage";
import SigninPage from "../pages/SigninPage";
import ChooseAccountPage from "../pages/ChooseAccountPage";
import MyAccountPage from "../pages/MyAccountPage";
import MyProfilePage from "../pages/MyProfilePage";

// firebase

import { auth } from "../firebase.js";
import db from "../firebase.js";
import "./styles/App.css";

library.add(fab);

const GLOBAL_MEDIA_QUERIES = {
	small: "(max-width: 568px)",
	// medium: "(min-width: 600px) and (max-width: 1199px)",
	// large: "(min-width: 1200px)"
};

function App({
	user,
	currentAccount,
	setCurrentProfile,
	fetchMyList,
	setCurrentAccount,
}) {
	const matches = useMedia({ queries: GLOBAL_MEDIA_QUERIES });

	useEffect(() => {
		if (user.uid) {
			fetchMyList(user.uid);
		}
	}, [user.uid, fetchMyList]);

	useEffect(() => {
		if (user && currentAccount) {
			const userRef = db.collection("users").doc(user.uid);
			const accRef = userRef.collection("accounts").doc(currentAccount.id);

			const unsubAccountList = accRef.onSnapshot(() => {
				if (user.uid && currentAccount.id) {
					fetchMyList(user.uid, currentAccount.id);
				}
			});
			return () => {
				unsubAccountList();
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user.uid, currentAccount.id]);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			// if logged in
			if (authUser) {
				setCurrentProfile(authUser);

				// getting current account
				const getCurrentAccount = async () => {
					const userRef = db.collection("users").doc(authUser.uid);
					const getUser = await userRef.get();
					const userData = getUser.data();

					const accountId = userData?.currentAccountId;
					const accountRef = userRef.collection("accounts").doc(accountId);
					const getAccount = await accountRef.get();
					const accountData = getAccount.data();

					accountData && setCurrentAccount(accountData);
				};

				getCurrentAccount();
				// if logged out
			} else {
				setCurrentProfile({});
				history.push("/login");
			}
		});

		// clearing listener
		return () => {
			unsubscribe();
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [setCurrentProfile]);

	return (
		<div className="App">
			<Router history={history}>
				<Route path="/login" component={LoginPage} />
				<Route path="/signin" component={SigninPage} />
				<Route exact path="/" component={ChooseAccountPage} />
				{matches.small ? (
					<Route component={NavbarMobile} />
				) : (
					<Route component={Navbar} />
				)}
				{/* BROWSE */}
				<Route path="/browse" component={MainPage} />
				<Route
					path="/browse/:id"
					exact
					render={(props) => {
						return <Modal {...props} onDismissURL="/browse" />;
					}}
				/>
				{/* SERIES */}
				<Route path="/series" component={SeriesPage} />
				<Route
					path="/series/:id"
					exact
					render={(props) => {
						return <Modal {...props} onDismissURL="/series" />;
					}}
				/>
				{/* MOVIES */}
				<Route path="/movies" component={MoviesPage} />
				<Route
					path="/movies/:id"
					exact
					render={(props) => {
						return <Modal {...props} onDismissURL="/movies" />;
					}}
				/>
				{/* TRENDING */}
				<Route path="/trending" component={TrendingPage} />
				<Route
					path="/trending/:id"
					exact
					render={(props) => {
						return <Modal {...props} onDismissURL="/trending" />;
					}}
				/>
				{/* MY LIST */}
				<Route path="/mylist" component={MyListPage} />
				<Route
					path="/mylist/:id"
					exact
					render={(props) => {
						return <Modal {...props} onDismissURL="/mylist" />;
					}}
				/>
				{/* MY PROFILE PAGE */}
				<Route path="/myprofile" component={MyProfilePage} />
				{/* MY ACCOUNT PAGE */}
				<Route path="/myaccount" component={MyAccountPage} />
				{/* WATCH VIDEO */}
				<Route path="/watch" component={Video} />
				{/* MODAL SEARCH */}
				<Route
					path="/search/:id"
					render={(props) => {
						return <Modal {...props} onDismissURL="/mylist" />;
					}}
				/>
				<Route component={Footer} />
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.currentUser.user,
		currentAccount: state.currentUser.currentAccount,
	};
};

export default connect(mapStateToProps, {
	setCurrentProfile,
	fetchMyList,
	setCurrentAccount,
})(App);
