import React, { useEffect } from "react";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";

import { fetchSeasonDetail, setSeasonDetailToNull } from "../../actions";

import "./styles/EpisodesView.css";
import "../Buttons/styles/Select.css";

const path = "https://image.tmdb.org/t/p/w300";

function EpisodesView({
	id,
	seasons,
	seasonDetail,
	fetchSeasonDetail,
	setSeasonDetailToNull,
}) {
	useEffect(() => {
		if (seasons) {
			fetchSeasonDetail(id, seasons[0]["season_number"]);
		}

		return () => {
			setSeasonDetailToNull();
		};
	}, [id, seasons, fetchSeasonDetail, setSeasonDetailToNull]);
	// RENDER OPTIONS IN SEARCH COMPONENT
	const getOptions = () => {
		if (seasons) {
			return seasons.map((season) => {
				return {
					value: season.season_number,
					label: season.name,
				};
			});
		} else {
			return { value: 0, label: "Loading..." };
		}
	};

	// RENDER EPISODES
	const renderEpisodes = () => {
		if (seasonDetail.episodes) {
			return seasonDetail.episodes.map((episode) => {
				return (
					<div key={uuidv4()} className="episode">
						<div className="episode__left">
							<h3 className="episode__number">{episode.episode_number}</h3>
							<div className="episode__img">
								{episode.still_path && (
									<img src={`${path}${episode.still_path}`} alt="Still path" />
								)}
							</div>
						</div>
						<div className="episode__right">
							<h4 className="episode__title">{episode.name}</h4>
							<p className="episode__overview">{episode.overview}</p>
						</div>
					</div>
				);
			});
		} else {
			return <h1>Loading...</h1>;
		}
	};

	return (
		<div className="EpisodesView">
			<Select
				onChange={(e) => {
					// setSeasonDetailToNull();
					fetchSeasonDetail(id, e.value);
				}}
				styles={customStyles}
				className="EpisodesView-select-container"
				classNamePrefix="EpisodesView-select"
				options={getOptions()}
			/>
			<div className="EpisodesView__episodes-container">{renderEpisodes()}</div>
		</div>
	);
}

// STYLING SEARCH COMPONENT
const customStyles = {
	singleValue: (styles) => ({ ...styles, color: "white" }),
	option: (provided, state) => ({
		...provided,
		backgroundColor: state.isSelected ? "rgb(50,50,50)" : "rgb(27,27,27)",
		color: "white",
	}),
	menuList: (provided) => ({
		...provided,
		border: "1px solid white",
	}),
};

const mapStateToProps = (state) => {
	return {
		id: state.detailsToDisplay["id"],
		seasons: state.detailsToDisplay["seasons"],
		seasonDetail: state.seasonDetail,
	};
};

export default connect(mapStateToProps, {
	fetchSeasonDetail,
	setSeasonDetailToNull,
})(EpisodesView);
