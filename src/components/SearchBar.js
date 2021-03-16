import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./styles/SearchBar.css";

function SearchBar() {
	return (
		<div className="SearchBar">
			<FontAwesomeIcon
				className="SearchBar__icon icon_active"
				icon={faSearch}
			/>
			<input
				className="SearchBar__input input-active"
				placeholder="Titles, actors, genres..."
				type="text"
			/>
		</div>
	);
}

export default SearchBar;
