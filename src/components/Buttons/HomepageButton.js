import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function HomepageButton({ link, detail, type }) {
	const [isOnNetflix, setIsOnNetflix] = useState(false);

	useEffect(() => {
		// CHECK IF SELECTED MEDIA IS ON NETFLIX
		if (detail.networks) {
			detail.networks.some((network) => network.id === 213) &&
				setIsOnNetflix(true);
		}
	}, [detail]);
	return (
		<button className={type}>
			<a href={link} target="_blank" rel="noreferrer">
				{isOnNetflix ? (
					<FontAwesomeIcon icon={faHome} />
				) : (
					<FontAwesomeIcon icon={faHome} />
				)}
			</a>
		</button>
	);
}

export default HomepageButton;
