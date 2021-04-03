import { connect } from "react-redux";
import React, { useEffect } from "react";
import _ from "lodash";

import {
	fetchTrending,
	fetchNetflixOrginals,
	fetchTopRated,
	fetchAction,
	fetchComedy,
	fetchRomance,
	fetchDocumentaries,
	fetchHorror,
} from "../actions";
import Hero from "../components/Hero";
import Row from "../components/Row";

function MainPage({
	trending,
	netflixOrginals,
	topRated,
	action,
	comedy,
	romance,
	documentaries,
	horror,
	fetchTrending,
	fetchNetflixOrginals,
	fetchTopRated,
	fetchAction,
	fetchComedy,
	fetchRomance,
	fetchDocumentaries,
	fetchHorror,
	match,
}) {
	useEffect(() => {
		_.isEmpty(trending) && fetchTrending();
		_.isEmpty(netflixOrginals) && fetchNetflixOrginals();
		_.isEmpty(topRated) && fetchTopRated();
		_.isEmpty(action) && fetchAction();
		_.isEmpty(comedy) && fetchComedy();
		_.isEmpty(romance) && fetchRomance();
		_.isEmpty(documentaries) && fetchDocumentaries();
		_.isEmpty(horror) && fetchHorror();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fetchTrending, trending]);

	return (
		<div className="MainPage page">
			<Hero match={match} />
			<Row match={match} header={"Trending"} items={trending.results} />
			<Row
				match={match}
				header={"Netflix Orginals"}
				items={netflixOrginals.results}
				media_type={netflixOrginals.media_type}
				vertical
			/>
			<Row
				match={match}
				header={"Top Rated"}
				items={topRated.results}
				media_type={topRated.media_type}
			/>
			<Row
				match={match}
				header={"Action"}
				items={action.results}
				media_type={action.media_type}
				vertical
			/>
			<Row
				match={match}
				header={"Comedy"}
				items={comedy.results}
				media_type={comedy.media_type}
			/>
			<Row
				match={match}
				header={"Romance"}
				items={romance.results}
				media_type={romance.media_type}
			/>
			<Row
				match={match}
				header={"Documentaries"}
				items={documentaries.results}
				media_type={documentaries.media_type}
			/>
			<Row
				match={match}
				header={"Horror"}
				items={horror.results}
				media_type={horror.media_type}
			/>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		trending: state.trending,
		netflixOrginals: state.netflixOrginals,
		topRated: state.topRated,
		action: state.action,
		comedy: state.comedy,
		romance: state.romance,
		documentaries: state.documentaries,
		horror: state.horror,
	};
};

export default connect(mapStateToProps, {
	fetchTrending,
	fetchNetflixOrginals,
	fetchTopRated,
	fetchAction,
	fetchComedy,
	fetchRomance,
	fetchDocumentaries,
	fetchHorror,
})(MainPage);
