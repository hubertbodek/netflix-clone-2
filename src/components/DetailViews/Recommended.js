import React from "react";
import { v4 as uuidv4 } from "uuid";

import "./styles/Recommended.css";
import Card from "./Card"; //props: title, date, image, vote_average, overview

function Recommended({ header, data }) {
	const renderCards = () => {
		if (data && data.length === 0) {
			return <h4 style={{ color: "grey" }}>No results.</h4>;
		}
		return data
			? data.map((similar) => {
					return (
						<Card
							key={uuidv4()}
							title={similar.title}
							date={similar.release_date}
							image={similar.backdrop_path}
							vote_average={similar.vote_average}
							overview={similar.overview}
						/>
					);
			  })
			: "Loading...";
	};
	return (
		<div className="Recommended">
			<h2 className="Recommended__header">{header}</h2>
			<div className="Recommended__grid-container">{renderCards()}</div>
		</div>
	);
}

export default Recommended;
