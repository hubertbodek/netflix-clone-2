import { connect } from "react-redux";
import React, { useEffect } from "react";

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
	location,
}) {
	useEffect(() => {
		fetchTrending();
		fetchNetflixOrginals();
		fetchTopRated();
		fetchAction();
		fetchComedy();
		fetchRomance();
		fetchDocumentaries();
		fetchHorror();
	}, [
		fetchTrending,
		fetchNetflixOrginals,
		fetchTopRated,
		fetchAction,
		fetchComedy,
		fetchRomance,
		fetchDocumentaries,
		fetchHorror,
	]);
	return (
		<div>
			<Hero match={match} />
			<Row match={match} header={"Trending"} movies={trending.results} />
			<Row
				match={match}
				header={"Netflix Orginals"}
				movies={netflixOrginals.results}
				media_type={netflixOrginals.media_type}
				vertical
			/>
			<Row
				match={match}
				header={"Top Rated"}
				movies={topRated.results}
				media_type={topRated.media_type}
			/>
			<Row
				match={match}
				header={"Action"}
				movies={action.results}
				media_type={action.media_type}
			/>
			<Row
				match={match}
				header={"Comedy"}
				movies={comedy.results}
				media_type={comedy.media_type}
			/>
			<Row
				match={match}
				header={"Romance"}
				movies={romance.results}
				media_type={romance.media_type}
			/>
			<Row
				match={match}
				header={"Documentaries"}
				movies={documentaries.results}
				media_type={documentaries.media_type}
			/>
			<Row
				match={match}
				header={"Horror"}
				movies={horror.results}
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
