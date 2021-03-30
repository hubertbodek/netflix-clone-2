import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";

// import jsonServer from "../../api/jsonServer";
import DeleteFavouriteButton from "./DeleteFavouriteButton";
import db from "../../firebase.js";

function AddToMyListButton({
	type,
	user,
	media_id,
	detail,
	media_type,
	my_list,
	accountId,
}) {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		if (user.uid && !_.isEmpty(my_list)) {
			my_list.forEach((media) => {
				if (media.id === media_id) {
					setIsChecked(true);
				}
			});
		}
	}, [user, media_id, my_list]);

	const addToMyList = async (uid, accountId) => {
		const accountRef = db
			.collection("users")
			.doc(uid)
			.collection("accounts")
			.doc(accountId);
		const doc = await accountRef.get();
		const data = doc.data();
		const myList = data.my_list || [];

		myList.push({
			id: media_id,
			backdrop_path: detail.backdrop_path,
			name: detail.name || detail.title,
			media_type: media_type,
		});

		accountRef.update({
			my_list: myList,
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
					onClick={() => !isChecked && addToMyList(user.uid, accountId)}
					className={`AddToMyListButton ${type}`}
				>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			)}
		</>
	);
}

const mapStateToProps = (state) => {
	return {
		media_id: state.detailsToDisplay.id,
		accountId: state.currentUser.currentAccount.id,
		detail: state.detailsToDisplay,
		user: state.currentUser.user,
		my_list: state.currentUser.currentAccount.my_list,
	};
};

export default connect(mapStateToProps)(AddToMyListButton);
