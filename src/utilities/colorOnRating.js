const colorOnRating = (rating, good, normal) => {
	if (rating >= good) {
		return "green";
	} else if (rating >= normal && rating < good) {
		return "yellow";
	} else {
		return "red";
	}
};

export default colorOnRating;
