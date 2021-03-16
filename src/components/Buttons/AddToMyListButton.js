import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";

import jsonServer from "../../api/jsonServer";
import DeleteFavouriteButton from "./DeleteFavouriteButton";

function AddToMyListButton({ type, user, media_id, detail, media_type }) {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (user.id) {
			const userList = user.my_list;
			userList.forEach((media) => {
				if (media.id === media_id) {
					setIsChecked(true);
				}
			});
		}
	}, [user, media_id]);

	const addToMyList = () => {
		const userList = user.my_list;

		userList.push({
			id: media_id,
			backdrop_path: detail.backdrop_path,
			name: detail.name || detail.title,
			media_type: media_type,
		});

		jsonServer.patch(`/users/${user.id}`, {
			my_list: userList,
		});
		setIsChecked(true);
	};

	const onDelete = () => {
		setIsChecked(false);
	};

	return (
		<>
			{isChecked ? (
				<DeleteFavouriteButton
					onComponentClick={onDelete}
					type={"btn--round"}
					id={media_id}
				/>
			) : (
				<button
					onClick={() => !isChecked && addToMyList()}
					className={`AddToMyListButton ${type}`}
				>
					<FontAwesomeIcon icon={isChecked ? faCheck : faPlus} />
				</button>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		media_id: state.detailsToDisplay.id,
		detail: state.detailsToDisplay,
		user: state.currentUser,
	};
};

export default connect(mapStateToProps)(AddToMyListButton);
