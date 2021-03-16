import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import qs from "query-string";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

import {
	fetchTvDetails,
	fetchMovieDetails,
	setDetailsToNull,
} from "../actions";
import "./styles/Modal.css";

import TvDetail from "./DetailViews/TvDetail";
import MovieDetail from "./DetailViews/MovieDetail";
import BackButton from "./Buttons/BackButton";

const body = document.querySelector("body");

function Modal({
	fetchTvDetails,
	fetchMovieDetails,
	match,
	onDismissURL,
	location,
	setDetailsToNull,
	history,
}) {
	// MEDIA TYPES: TV OR MOVIE
	const [currentMediaType, setCurrentMediaType] = useState(null);

	useEffect(() => {
		const { type } = qs.parse(location.search);
		setCurrentMediaType(type);

		if (type === "tv") {
			fetchTvDetails(match.params.id);
		} else if (type === "movie") {
			fetchMovieDetails(match.params.id);
		}

		// HIDE BODY SCROLLBAR
		body.style.overflow = "hidden";

		return () => {
			body.style.overflow = "visible";
			setDetailsToNull();
		};
	}, [
		fetchTvDetails,
		fetchMovieDetails,
		match.params.id,
		location.search,
		setDetailsToNull,
	]);

	return ReactDOM.createPortal(
		<div
			onClick={() => {
				history.push(onDismissURL);
			}}
			className="Modal"
		>
			<SimpleBar className="Modal__inner" onClick={(e) => e.stopPropagation()}>
				<BackButton
					type={"Modal__inner--back-btn btn--round"}
					// url={onDismissURL}
					history={history}
				/>
				{currentMediaType === "tv" ? <TvDetail /> : <MovieDetail />}
			</SimpleBar>
		</div>,
		document.querySelector("#modal")
	);
}

export default connect(null, {
	fetchTvDetails,
	fetchMovieDetails,
	setDetailsToNull,
})(Modal);
