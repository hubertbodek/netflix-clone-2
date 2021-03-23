import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

import DetailsButton from "./Buttons/DetailsButton";
import "./styles/Row.css";

const path = "https://image.tmdb.org/t/p/w300";

function Row({
	size = 20,
	items,
	header,
	vertical,
	match,
	media_type,
	numbers,
}) {
	const rowRef = useRef(null);

	const scroll = (x) => {
		if (rowRef.current) {
			rowRef.current.scrollLeft += x;
		}
	};

	const renderMovies = () => {
		if (items) {
			return items.slice(0, size).map((row_item, index) => {
				const posterPath = vertical
					? row_item.poster_path
					: row_item.backdrop_path;
				return (
					posterPath && (
						<div
							key={uuidv4()}
							className={`row_item ${vertical ? "vertical" : "horizontal"}${
								numbers ? " gotNumbers" : ""
							}`}
						>
							{" "}
							{numbers && (
								<div className="number">
									<span>{index + 1}</span>
								</div>
							)}
							<div className="row_item__img-container">
								{<img src={`${path}${posterPath}`} alt="Poster" />}
							</div>
							<div className="row_item__detail">
								<h4 className="row_item__title">
									{row_item.title ? row_item.title : row_item.name}
								</h4>
								<DetailsButton
									currentUrl={match.url}
									id={row_item.id}
									media_type={
										row_item.media_type ? row_item.media_type : media_type
									}
								/>
							</div>
						</div>
					)
				);
			});
		}
	};

	return (
		<div className="Row">
			<h2 className="Row__header">{header}</h2>
			<div ref={rowRef} className="Row__container slider">
				{renderMovies()}
				<FontAwesomeIcon
					color={"white"}
					icon={faChevronLeft}
					className="Row__left-arrow"
					onClick={() => {
						scroll(-600);
					}}
				/>
				<FontAwesomeIcon
					color={"white"}
					icon={faChevronRight}
					className="Row__right-arrow"
					onClick={() => {
						scroll(600);
					}}
				/>
			</div>
		</div>
	);
}

export default Row;
