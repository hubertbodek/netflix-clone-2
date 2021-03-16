import axios from "axios";

const API_KEY = "3ab8cc8c641da30dd982672859eeb831";

export default axios.create({
	baseURL: "https://api.themoviedb.org/3",
	params: {
		api_key: API_KEY,
	},
});
