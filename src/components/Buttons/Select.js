import React from "react";

import "./styles/Select.css";

function Select({ options }) {
	return (
		<div className="Select">
			<select>
				<option value="0">siema</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</div>
	);
}

export default Select;
