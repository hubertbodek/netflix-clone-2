import React from "react";

function RightMeta({ title, content, value, size = 5, more }) {
	const renderContent = () => {
		if (content) {
			const parsed = content.slice(0, size).map((item) => item[value]);
			return parsed.join(", ");
		} else {
			return null;
		}
	};

	return (
		<div className="RightMeta">
			<span className="RightMeta__title">{title}: </span>
			<span className="RightMeta__content">
				{renderContent()}
				{more && <span className="more"> and more</span>}.
			</span>
		</div>
	);
}

export default RightMeta;
