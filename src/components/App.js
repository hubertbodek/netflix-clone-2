import { useEffect } from "react";
import { Router, Route } from "react-router-dom";
// import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { connect } from "react-redux";

import { setCurrentProfile, fetchUserMyList } from "../actions";
import history from "../history";

// COMPONENTS
import Navbar from "./Navbar";
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

// firebase

import { auth } from "../firebase.js";
import db from "../firebase.js";

// APIS
// import tmdb from "../api/tmdb";

import "./styles/App.css";
import { forEach } from "lodash";

library.add(fab);

function App({ user, setCurrentProfile, fetchUserMyList }) {
	useEffect(() => {
		// console.log(user.uid);
		if (user.uid) {
			fetchUserMyList(user.uid);
		}

		const docRef = db
			.collection("users")
			.doc("SwdpYEbrYEfvLNFhd3H34kWa20H3")
			.collection("accounts");

		docRef.get().then((doc) => {
			doc.forEach((doc) => {
				console.log(doc.id);
			});
		});
	}, [user.uid, fetchUserMyList]);

	db.collection("users")
		.doc(user.uid)
		.onSnapshot(() => {
			if (user.uid) {
				fetchUserMyList(user.uid);
			}
		});

	useEffect(() => {
		console.log("siema");
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setCurrentProfile(authUser);
			} else {
				setCurrentProfile({});
				history.push("/login");
			}
		});

		return unsubscribe;
	}, [setCurrentProfile]);

	return (
		<div className="App">
			<Router history={history}>
				<Route path="/login" component={LoginPage} />
				<Route path="/signin" component={SigninPage} />
				<Route exact path="/" component={ChooseAccountPage} />
				<Route component={Navbar} />
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
				<Route component={Footer} />
				{/* WATCH VIDEO */}
				<Route path="/watch" component={Video} />
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		user: state.currentUser.user,
	};
};

export default connect(mapStateToProps, { setCurrentProfile, fetchUserMyList })(
	App
);
