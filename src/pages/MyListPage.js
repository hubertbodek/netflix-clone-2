import React from "react";
import { connect } from "react-redux";

import Grid from "../components/Grid";
// import jsonServer from "../api/jsonServer";
import "./styles/MyListPage.css";

function MyListPage({ media, match, userId }) {
	return (
		<div className="MyListPage">
			<h2 className="MyListPage__header">My List</h2>
			{media ? (
				<Grid media={media} match={match} prefix="MyList" />
			) : (
				"loading..."
			)}
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.currentUser.id,
		media: state.currentUser.my_list,
	};
};

export default connect(mapStateToProps)(MyListPage);
