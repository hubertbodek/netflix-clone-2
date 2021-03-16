import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import DetailsButton from "./Buttons/DetailsButton";
import "./styles/Hero.css";
import truncate from "../utilities/truncate";

// base url to hero image
const path = "https://image.tmdb.org/t/p/w1280";

// helper function

// component
function Hero({ trending, match }) {
	const [randomMovie, setRandomMovie] = useState({});
	useEffect(() => {
		if (trending.results) {
			const getRandomMovie =
				trending.results[Math.floor(Math.random() * trending.results.length)];

			setRandomMovie(getRandomMovie);
		}
	}, [trending.results]);

	return randomMovie.id ? (
		<div className="Hero">
			<main
				className="Hero__main"
				style={{ backgroundImage: `url(${path}${randomMovie.backdrop_path})` }}
			>
				{/* DETAIL SECTION */}
				<section className="Hero__detail">
					{/* HEADER */}
					<h1 className="Hero__header">
						{randomMovie.title ? randomMovie.title : randomMovie.name}
					</h1>
					{/* META DATA */}
					<p className="Hero__meta">
						<span className="capitalize">{randomMovie.media_type}</span>,
						Popularity: {randomMovie.popularity}
					</p>
					{/* OVERVIEW */}
					<p className="Hero__overview">
						{randomMovie.overview && truncate(randomMovie.overview, 150)}
					</p>
					<DetailsButton
						currentUrl={match.path}
						id={randomMovie.id}
						media_type={randomMovie.media_type}
					/>
				</section>
			</main>
		</div>
	) : (
		"Loading..."
	);
}

const mapStateToProps = (state) => {
	return { trending: state.trending };
};

export default connect(mapStateToProps)(Hero);
