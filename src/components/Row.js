import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import DetailsButton from "./Buttons/DetailsButton";
import "./styles/Row.css";

const path = "https://image.tmdb.org/t/p/w300";

function Row({ movies, header, vertical, match, media_type }) {
	const rowRef = useRef(null);

	const scroll = (x) => {
		if (rowRef.current) {
			rowRef.current.scrollLeft += x;
		}
	};

	const renderMovies = () => {
		if (movies) {
			return movies.map((movie, index) => {
				const posterPath = vertical ? movie.poster_path : movie.backdrop_path;
				return (
					<div
						key={Number(movie.id) + index + Math.floor(Math.random() * 100)}
						className={`movie ${vertical ? "vertical" : "horizontal"}`}
					>
						<img src={`${path}${posterPath}`} alt="Poster" />
						<div className="movie__detail">
							<h4 className="movie__title">
								{movie.title ? movie.title : movie.name}
							</h4>
							<DetailsButton
								currentUrl={match.url}
								id={movie.id}
								media_type={movie.media_type ? movie.media_type : media_type}
							/>
						</div>
					</div>
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
