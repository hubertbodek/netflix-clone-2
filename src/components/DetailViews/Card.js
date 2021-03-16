import React from "react";

import truncate from "../../utilities/truncate";
import colorOnRating from "../../utilities/colorOnRating";

import "./styles/Card.css";
const path = "https://image.tmdb.org/t/p/w300";

function Card({ title, date, image, vote_average, overview }) {
	return (
		<div className="Card">
			<div className="Card__image">
				<img src={`${path}${image}`} alt="poster" />
			</div>
			<div className="Card__description">
				<div className="Card__header">
					<h4 className="Card__title">{title}</h4>
					<div className="Card__meta">
						<span className="Card__year">{date}</span>
						<span
							className={`Card__vote ${colorOnRating(vote_average, 8, 5.5)}`}
						>
							Vote: {vote_average}
						</span>
					</div>
				</div>
				<p className="Card__overview">{truncate(overview, 150)}</p>
			</div>
		</div>
	);
}

export default Card;
