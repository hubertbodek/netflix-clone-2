import React from "react";
import { v4 as uuidv4 } from "uuid";

import DetailsButton from "../components/Buttons/DetailsButton";
import DeleteFavouriteButton from "../components/Buttons/DeleteFavouriteButton";

import "./styles/Grid.css";

const path = "https://image.tmdb.org/t/p/w300";

function Grid({
	media,
	match,
	prefix = "",
	media_type,
	size = 20,
	showDeleteButton,
	header = "",
}) {
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
			return media.slice(0, size).map((item) => {
				const posterPath = item.backdrop_path;
				return (
					item.backdrop_path && (
						<div key={uuidv4()} className={`media ${mediaClass}`}>
							{showDeleteButton && (
								<DeleteFavouriteButton
									type={"DeleteFavouriteButton btn--round btn--round-small"}
									id={item.id}
									match={match}
								/>
							)}
							<img
								className={`${imgClass} Grid__img`}
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
									media_type={media_type ? media_type : item.media_type}
								/>
							</div>
						</div>
					)
				);
			});
		}
	};
	return (
		<>
			<h2 className="Grid__header" style={{ color: "white" }}>
				{header}
			</h2>
			<div className={`Grid ${gridClass}`}>
				{media ? renderMedia() : "Loading..."}
			</div>
		</>
	);
}

export default Grid;
