import React, { useEffect } from "react";
import { connect } from "react-redux";

import "../styles/Detail.css";
import {
	fetchMovieCredits,
	setCreditsToNull,
	fetchSimilarMovies,
	setSimilarToNull,
} from "../../actions";

import DetailDescription from "./DetailDescription";
import Recommended from "./Recommended";
import Line from "./Line";

function MovieDetail({
	detail,
	fetchMovieCredits,
	setCreditsToNull,
	cast,
	similar,
	fetchSimilarMovies,
	setSimilarToNull,
}) {
	useEffect(() => {
		if (detail.id) {
			fetchSimilarMovies(detail.id);
			fetchMovieCredits(detail.id);
		}

		return () => {
			setCreditsToNull();
			setSimilarToNull();
		};
	}, [
		fetchMovieCredits,
		detail,
		setCreditsToNull,
		fetchSimilarMovies,
		setSimilarToNull,
	]);

	return (
		<div className="MovieDetail detail">
			<DetailDescription type="movie" cast={cast} />
			<Line />
			<Recommended header="Recommended" data={similar} />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		detail: state.detailsToDisplay,
		cast: state.credits["cast"],
		similar: state.similar.results,
	};
};

export default connect(mapStateToProps, {
	fetchSimilarMovies,
	setSimilarToNull,
	fetchMovieCredits,
	setCreditsToNull,
})(MovieDetail);
