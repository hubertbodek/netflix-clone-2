import React from "react";
// import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function BackButton({ type, url, history }) {
	return (
		<button className={type} onClick={() => history.goBack()}>
			{/* <Link to={url} className="link"> */}
			<FontAwesomeIcon icon={faArrowLeft} />
			{/* </Link> */}
		</button>
	);
}

export default BackButton;
