import React from "react";
import { connect } from "react-redux";

import PlayTrailerButton from "../Buttons/PlayTrailerButton";
import AddToMyListButton from "../Buttons/AddToMyListButton";
import HomepageButton from "../Buttons/HomepageButton";
import RightMeta from "./RightMeta";
// import truncate from "../../utilities/truncate";

import "./styles/DetailDescription.css";

import colorOnRating from "../../utilities/colorOnRating";

const path = "https://image.tmdb.org/t/p/w1280";
// const overviewChars = 100;

function DetailDescription({ detail, type, cast, id }) {
	const renderMetadata = () => {
		const getDate = (date) => {
			const d = new Date(date);
			return d.getFullYear();
		};

		if (type === "tv" && detail) {
			return (
				<>
					{detail.vote_average !== 0 && (
						<h4
							className={`rating ${colorOnRating(detail.vote_average, 8, 5.5)}`}
						>
							Average rating: {detail.vote_average}
						</h4>
					)}
					<h4>{getDate(detail.first_air_date)}</h4>
					<h4>{detail.number_of_seasons} season(s)</h4>
				</>
			);
		} else if (type === "movie" && detail) {
			return (
				<>
					{detail.vote_average !== 0 && (
						<h4
							className={`rating ${colorOnRating(detail.vote_average, 8, 5.5)}`}
						>
							Average rating: {detail.vote_average}
						</h4>
					)}
					<h4>{getDate(detail.release_date)}</h4>
					<h4>{detail.runtime} minutes</h4>
				</>
			);
		} else {
			return "Loading...";
		}
	};

	return detail.id ? (
		<div className="DetailDescription">
			<div
				style={{
					backgroundImage: `url(${path}${detail.backdrop_path})`,
				}}
				className="preview"
			>
				<div className="preview__inner">
					{/* TITLE */}
					<h3>{detail.name || detail.title}</h3>
					<div className="preview__btns">
						<PlayTrailerButton type="btn--white" id={id} media={type} />
						<AddToMyListButton type="btn--round" media_type={type} />
						<HomepageButton
							type="btn--round"
							link={detail.homepage}
							detail={detail}
						/>
					</div>
				</div>
			</div>
			<div className="DetailDescription__container">
				{/* LEFT */}
				<div className="DetailDescription__container--left">
					{detail.id ? (
						<div className="DetailDescription__metadata">
							{renderMetadata()}
						</div>
					) : (
						"Loading.."
					)}
					<h3 className="DetailDescription__tagline">
						{detail.tagline || detail.original_title}
					</h3>
					<p className="DetailDescription__overview">{detail.overview}</p>
				</div>
				{/* RIGHT */}
				<div className="DetailDescription__container--right">
					<RightMeta title="Cast" content={cast} value={"name"} size={5} more />
					<RightMeta
						title="Genres"
						content={detail.genres}
						value={"name"}
						size={5}
					/>
					<RightMeta
						title="Created by"
						content={detail.production_companies}
						value={"name"}
						size={5}
					/>
				</div>
			</div>
		</div>
	) : (
		"Loading..."
	);
}

const mapStateToProps = (state) => {
	return {
		detail: state.detailsToDisplay,
		id: state.detailsToDisplay.id,
	};
};

export default connect(mapStateToProps)(DetailDescription);
