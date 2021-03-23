import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Grid from "../components/Grid";
import Row from "../components/Row";

import {
	fetchDocumentaries,
	fetchComedy,
	fetchTrending,
	fetchTopRated,
	fetchHorror,
} from "../actions";

function MoviesPage({
	comedy,
	documentaries,
	trending,
	topRated,
	horror,
	fetchDocumentaries,
	fetchComedy,
	fetchTrending,
	fetchTopRated,
	fetchHorror,
	match,
}) {
	useEffect(() => {
		_.isEmpty(documentaries) && fetchDocumentaries();
		_.isEmpty(comedy) && fetchComedy();
		_.isEmpty(trending) && fetchTrending();
		_.isEmpty(topRated) && fetchTopRated();
		_.isEmpty(horror) && fetchHorror();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [documentaries, fetchDocumentaries]);

	return (
		<div className="MoviesPage page">
			{/* items, header, vertical, match, media_type */}
			<Row
				match={match}
				media_type={topRated.media_type}
				items={topRated.results}
				header="Top rated"
				prefix="MoviesPage"
				// size={14}
				vertical
				numbers
				size={10}
			/>
			<Grid
				match={match}
				media_type={comedy.media_type}
				media={comedy.results}
				header="Comedy"
				prefix="MoviesPage"
				size={14}
			/>
			<Grid
				match={match}
				media_type={trending.media_type}
				media={trending.results}
				header="Trending"
				prefix="MoviesPage"
				size={14}
			/>
			<Grid
				match={match}
				media_type={horror.media_type}
				media={horror.results}
				header="Horror"
				prefix="MoviesPage"
				size={14}
			/>
			<Grid
				match={match}
				media_type={documentaries.media_type}
				media={documentaries.results}
				header="Documentaries"
				prefix="MoviesPage"
				size={14}
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		comedy: state.comedy,
		documentaries: state.documentaries,
		trending: state.trending,
		topRated: state.topRated,
		horror: state.horror,
	};
};

export default connect(mapStateToProps, {
	fetchDocumentaries,
	fetchComedy,
	fetchTrending,
	fetchTopRated,
	fetchHorror,
})(MoviesPage);
