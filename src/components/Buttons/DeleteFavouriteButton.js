import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

// import { deleteFromMyList } from "../../actions";
import db from "../../firebase.js";

function DeleteFavouriteButton({
	type,
	userId,
	id,
	accountId,
	list,
	onComponentClick,
	match,
}) {
	const [icon, setIcon] = useState(null);
	useEffect(() => {
		if (match) {
			match.path === "/mylist" ? setIcon(faTimes) : setIcon(faCheck);
		} else {
			setIcon(faCheck);
		}
	}, [match]);

	const deleteItem = async (userId, accountId) => {
		const docRef = db
			.collection("users")
			.doc(userId)
			.collection("accounts")
			.doc(accountId);
		const doc = await docRef.get();
		const data = doc.data();
		const myList = data.my_list;

		const updatedList = myList.filter((item) => item.id !== id);

		docRef.update({
			my_list: [...updatedList],
		});
	};

	return (
		<button
			onClick={() => {
				if (onComponentClick) {
					onComponentClick();
				}

				deleteItem(userId, accountId);
			}}
			className={type}
		>
			{icon && <FontAwesomeIcon icon={icon} />}
		</button>
	);
}

const mapStateToProps = (state) => {
	return {
		userId: state.currentUser.user.uid,
		accountId: state.currentUser.currentAccount.id,
		list: state.currentUser.my_list,
	};
};

export default connect(mapStateToProps)(DeleteFavouriteButton);
