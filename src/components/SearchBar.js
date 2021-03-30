import React from "react";
import { connect } from "react-redux";

import SearchIcon from "@material-ui/icons/Search";
import { List, ListItem, makeStyles } from "@material-ui/core";
import _ from "lodash";

import "./styles/SearchBar.css";
import { searchMedia, setSearchToNull } from "../actions";
import history from "../history.js";

const path = "https://image.tmdb.org/t/p/w200";

const useStyles = makeStyles((theme) => ({
	list: {
		position: "absolute",
		top: "3rem",
		backgroundColor: "rgba(97, 97, 97)",
		width: "100%",
		zIndex: -1,
		padding: 0,
		// paddingTop: "1.5rem",
		// height: "5rem",
		maxHeight: "50rem",
		borderRadius: 5,
		overflowY: "auto",
		overflowX: "hidden",
	},
}));

function SearchBar({ results, searchMedia, setSearchToNull }) {
	const classes = useStyles();

	// HANDLE INPUT
	const handleInputChange = _.debounce((e) => {
		if (e.target.value !== "") {
			// set search results to null
			setSearchToNull();
			searchMedia(e.target.value);
		} else {
			// set search results to null
			setSearchToNull();
		}
	}, 500);

	// HANDLE FOCUS
	const handleOnFocus = (e) => {
		if (e.target.value !== "") {
			searchMedia(e.target.value);
		}
	};

	// HANDLE BLUR
	const handleOnBlur = (e) => {
		if (!e.currentTarget.contains(e.relatedTarget)) {
			if (!_.isEmpty(results)) {
				// set search results to null
				setSearchToNull();
			}
		}
	};

	const renderListItems = () => {
		return results
			?.filter((result) => result.media_type !== "person")
			.map((result) => (
				<ListItem
					button
					onClick={() => {
						history.push(`/search/${result.id}?type=${result.media_type}`);
					}}
					key={result.id}
				>
					<div className="listItem__container">
						<div className="listItem__img">
							{result.poster_path && (
								<img src={`${path}${result.poster_path}`} alt="poster" />
							)}
						</div>
						<div className="listItem__info">
							<h5 className="listItem__header">
								{_.truncate(result.title || result.name, {
									length: 20,
								})}
							</h5>
							<h5 className="listItem__year">{result.release_date}</h5>
						</div>
					</div>
				</ListItem>
			));
	};

	return (
		<div className="SearchBar__container" onBlur={handleOnBlur}>
			<div
				className="SearchBar"
				onInput={(e) => {
					e.target.classList.add("active");
				}}
			>
				<SearchIcon />
				<input
					type="text"
					className="SearchBar__input"
					onFocus={handleOnFocus}
					onInput={(e) => {
						handleInputChange(e);
					}}
				/>
			</div>
			<List
				className={classes.list}
				component="nav"
				aria-label="main mailbox folders"
			>
				{renderListItems()}
			</List>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		results: state.searchResults.results,
	};
};

export default connect(mapStateToProps, { searchMedia, setSearchToNull })(
	SearchBar
);
