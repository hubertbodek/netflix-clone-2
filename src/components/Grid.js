import React from "react";

import DetailsButton from "../components/Buttons/DetailsButton";
import DeleteFavouriteButton from "../components/Buttons/DeleteFavouriteButton";

import "./styles/Grid.css";

const path = "https://image.tmdb.org/t/p/w300";

function Grid({ media, match, prefix = "" }) {
	let gridClass = "";
	let mediaClass = "";
	let imgClass = "";
	let detailClass = "";
	let titleClass = "";

	if (prefix) {
		gridClass = `${prefix}--grid`;
		mediaClass = `${prefix}--media`;
		imgClass = `${prefix}--img`;
		detailClass = `${prefix}--detail`;
		titleClass = `${prefix}--title`;
	}

	const renderMedia = () => {
		if (media) {
			return media.map((item) => {
				const posterPath = item.backdrop_path;
				return (
					<div key={Number(item.id)} className={`media ${mediaClass}`}>
						<DeleteFavouriteButton
							type={"DeleteFavouriteButton btn--round btn--round-small"}
							id={item.id}
						/>
						<img
							className={`${imgClass}`}
							src={`${path}${posterPath}`}
							alt="Poster"
						/>
						<div className={`media__detail ${detailClass}`}>
							<h4 className={`${titleClass}`}>
								{item.title ? item.title : item.name}
							</h4>
							<DetailsButton
								currentUrl={match.url}
								id={item.id}
								media_type={item.media_type}
							/>
						</div>
					</div>
				);
			});
		}
	};
	return (
		<div className={`Grid ${gridClass}`}>
			{media ? renderMedia() : "Loading..."}
		</div>
	);
}

export default Grid;
