import React, { useEffect } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import Grid from "../components/Grid";
import Row from "../components/Row";

import {
	fetchTvPopular,
	fetchTvLatest,
	fetchTvAction,
	fetchTvComedy,
	fetchNetflixOrginals,
} from "../actions";

function SeriesPage({
	match,
	tvLatest,
	tvAction,
	tvComedy,
	netflixOrginals,
	tvPopular,
	fetchTvLatest,
	fetchTvAction,
	fetchTvComedy,
	fetchNetflixOrginals,
	fetchTvPopular,
}) {
	useEffect(() => {
		_.isEmpty(tvLatest) && fetchTvLatest();
		_.isEmpty(tvAction) && fetchTvAction();
		_.isEmpty(tvComedy) && fetchTvComedy();
		_.isEmpty(netflixOrginals) && fetchNetflixOrginals();
		_.isEmpty(tvPopular) && fetchTvPopular();
		// console.log(_.isEmpty({ tak: "tak" }) ? "puste" : "nie");

		// IF ONE OF THEM ARE FETCHED, THE OTHERS ARE TOO

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tvPopular, fetchTvPopular]);

	return (
		<div className="SeriesPage page">
			{/* movies, header, vertical, match, media_type */}
			<Grid
				media={tvPopular.results}
				prefix="SeriesPage"
				match={match}
				media_type={tvPopular.media_type}
				size={14}
				header="Popular"
			/>
			<Row
				match={match}
				items={netflixOrginals.results}
				header={"Netflix Orginals"}
				media_type={"tv"}
				vertical
			/>
			<Row
				match={match}
				items={tvComedy.results}
				header={"Comedy TV Shows"}
				media_type={tvComedy.media_type}
			/>
			<Grid
				media={tvAction.results}
				prefix="SeriesPage"
				match={match}
				media_type={tvAction.media_type}
				size={14}
				header="Action TV"
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		netflixOrginals: state.netflixOrginals,
		tvLatest: state.tvLatest,
		tvAction: state.tvAction,
		tvComedy: state.tvComedy,
		tvPopular: state.tvPopular,
	};
};

export default connect(mapStateToProps, {
	fetchTvPopular,
	fetchTvLatest,
	fetchTvAction,
	fetchTvComedy,
	fetchNetflixOrginals,
})(SeriesPage);
