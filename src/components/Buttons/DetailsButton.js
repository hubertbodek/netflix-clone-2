import React from "react";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function DetailsButton({ currentUrl, id, media_type }) {
	return (
		<Link
			to={`${currentUrl}/${id}?type=${media_type}`}
			className="btn--more-info"
		>
			<FontAwesomeIcon className="Hero__icon" icon={faInfoCircle} />
			Read more
		</Link>
	);
}

export default DetailsButton;
