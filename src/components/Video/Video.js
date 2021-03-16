import React, { useEffect } from "react";
import { connect } from "react-redux";
import qs from "query-string";

import "./Video.css";
import BackButton from "../Buttons/BackButton";

import {
	fetchTvVideos,
	fetchMovieVideos,
	setVideosToNull,
} from "../../actions";

function Video({
	videos,
	location,
	fetchMovieVideos,
	fetchTvVideos,
	setVideosToNull,
	history,
}) {
	// console.log(history);
	useEffect(() => {
		const parsed = qs.parse(location.search);
		if (parsed.source === "tv") {
			fetchTvVideos(parsed.v);
		} else if (parsed.source === "movie") {
			fetchMovieVideos(parsed.v);
		}

		return () => {
			setVideosToNull();
		};
	}, [location, fetchMovieVideos, fetchTvVideos, setVideosToNull]);
	// console.log(location);
	return (
		<div className="Video">
			{videos ? (
				<>
					<BackButton
						type={"Video__back btn--round"}
						url={"/browse"}
						history={history}
					/>
					<div className="Video__wrapper">
						<iframe
							src={`https://www.youtube.com/embed/${videos["0"].key}`}
							title="lol"
							frameborder="0"
							allowfullscreen="allowfullscreen"
							className="Video__iframe"
						/>
					</div>
				</>
			) : (
				"Loading..."
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		videos: state.videos.results,
	};
};

export default connect(mapStateToProps, {
	fetchTvVideos,
	fetchMovieVideos,
	setVideosToNull,
})(Video);
