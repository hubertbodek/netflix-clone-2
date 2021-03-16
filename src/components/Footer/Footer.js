import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Footer.css";

function Footer({ location }) {
	const [isWatch, setIsWatch] = useState(false);

	useEffect(() => {
		if (location.pathname.includes("/watch")) {
			setIsWatch(true);
		} else {
			setIsWatch(false);
		}
	}, [location]);

	return (
		!isWatch && (
			<div className="Footer" style={{ color: "white" }}>
				<div className="Footer__icons">
					<a
						href="https://www.github.com"
						rel="noreferrer"
						target="_blank"
						className="Footer__link"
					>
						<FontAwesomeIcon icon={["fab", "github"]} size={"2x"} />
					</a>
					<a
						href="https://www.github.com"
						rel="noreferrer"
						target="_blank"
						className="Footer__link"
					>
						<FontAwesomeIcon icon={["fab", "instagram"]} size={"2x"} />
					</a>
					<a
						href="https://www.github.com"
						rel="noreferrer"
						target="_blank"
						className="Footer__link"
					>
						<FontAwesomeIcon icon={["fab", "facebook"]} size={"2x"} />
					</a>
					<a
						href="https://www.github.com"
						rel="noreferrer"
						target="_blank"
						className="Footer__link"
					>
						<FontAwesomeIcon icon={["fab", "linkedin"]} size={"2x"} />
					</a>
				</div>
				<h5 className="Footer__copyright">
					2021, Netflix Clone by Hubert Bodek.
				</h5>
			</div>
		)
	);
}

export default Footer;
