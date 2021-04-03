import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton({ type, url, history }) {
	return (
		<button className={type} onClick={() => history.goBack()}>
			<FontAwesomeIcon icon={faArrowLeft} />
		</button>
	);
}

export default BackButton;
