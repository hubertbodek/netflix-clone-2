import React from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { deleteFromMyList } from "../../actions";
import jsonServer from "../../api/jsonServer";

function DeleteFavouriteButton({
	type,
	userId,
	id,
	list,
	deleteFromMyList,
	onComponentClick,
}) {
	const deleteItem = async (id) => {
		const updatedList = list.filter((item) => item.id !== id);

		await jsonServer.patch(`/users/${userId}`, {
			my_list: updatedList,
		});

		deleteFromMyList(updatedList);
	};

	return (
		<button
			onClick={() => {
				if (onComponentClick) {
					onComponentClick();
				}

				deleteItem(id);
			}}
			className={type}
		>
			<FontAwesomeIcon icon={faTimes} />
		</button>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.currentUser.id,
		list: state.currentUser.my_list,
	};
};

export default connect(mapStateToProps, { deleteFromMyList })(
	DeleteFavouriteButton
);
