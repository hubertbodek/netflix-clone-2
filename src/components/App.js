import { Router, Route } from "react-router-dom";
// import { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";

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

// APIS
// import tmdb from "../api/tmdb";

import "./styles/App.css";

library.add(fab);

function App() {
	return (
		<div className="App">
			<Router history={history}>
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

export default App;
