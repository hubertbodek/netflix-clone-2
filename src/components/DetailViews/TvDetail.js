import React, { useEffect } from "react";
import { connect } from "react-redux";

import "../styles/Detail.css";
import { fetchTvCredits, setCreditsToNull } from "../../actions";
import DetailDescription from "./DetailDescription";
import EpisodesView from "./EpisodesView";
// import Line from "./Line";

function TvDetail({ detail, fetchTvCredits, cast, setCreditsToNull }) {
	useEffect(() => {
		if (detail.id) {
			fetchTvCredits(detail.id);
		}

		return () => {
			setCreditsToNull();
		};
	}, [detail, fetchTvCredits, setCreditsToNull]);

	return (
		<div className="TvDetail detail">
			<DetailDescription type="tv" cast={cast} />
			{/* <Line /> */}
			<EpisodesView />
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		detail: state.detailsToDisplay,
		cast: state.credits["cast"],
	};
};

export default connect(mapStateToProps, { fetchTvCredits, setCreditsToNull })(
	TvDetail
);
