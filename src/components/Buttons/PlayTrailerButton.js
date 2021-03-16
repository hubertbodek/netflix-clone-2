import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

function PlayTrailerButton({ type, id, media }) {
	return (
		<Link to={`/watch?v=${id}&source=${media}`} className={type}>
			<FontAwesomeIcon icon={faPlay} />
			Play trailer
		</Link>
	);
}

export default PlayTrailerButton;
