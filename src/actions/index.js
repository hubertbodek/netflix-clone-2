import db from "../firebase.js";
import {
	// MOVIES AND SHOWS TYPES
	FETCH_TRENDING,
	FETCH_NETFLIX_ORGINALS,
	FETCH_TOP_RATED,
	FETCH_ACTION,
	FETCH_COMEDY,
	FETCH_ROMANCE,
	FETCH_DOCUMENTARIES,
	FETCH_HORROR,
	// CURRENT PROFILE TYPES
	SET_CURRENT_PROFILE,
	// DELETE_FROM_MY_LIST,
	// ADD_TO_MY_LIST,
	// REMOVE_FROM_MY_LIST,
	// MOVIE/SHOW DETAILS
	FETCH_MOVIE_DETAILS,
	FETCH_TV_DETAILS,
	SET_DETAILS_TO_NULL,
	// CREDITS
	FETCH_TV_CREDITS,
	FETCH_MOVIE_CREDITS,
	SET_CREDITS_TO_NULL,
	FETCH_SEASON_DETAIL,
	SET_SEASON_DETAIL_TO_NULL,
	FETCH_SIMILAR_MOVIE,
	SET_SIMILAR_TO_NULL,
	// FETCH_SIMILAR_TV,
	FETCH_MOVIE_VIDEOS,
	FETCH_TV_VIDEOS,
	SET_VIDEOS_TO_NULL,
	// FETCH TV GENRES
	FETCH_TV_LATEST,
	FETCH_TV_POPULAR,
	FETCH_TV_ACTION,
	FETCH_TV_COMEDY,
	FETCH_MY_LIST,
	SET_CURRENT_ACCOUNT,
	SEARCH_MEDIA,
	SET_SEARCH_TO_NULL,
	CHANGE_AVATAR_AND_USERNAME,
} from "./types";

import tmdb from "../api/tmdb";
// import jsonServer from "../api/jsonServer";

// MOVIES AND SHOWS DATA

export const fetchTrending = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/trending/all/week");
		dispatch({ type: FETCH_TRENDING, payload: response.data });
	};
};

export const fetchNetflixOrginals = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/tv?with_networks=213");
		dispatch({
			type: FETCH_NETFLIX_ORGINALS,
			payload: { ...response.data, media_type: "tv" },
		});
	};
};

export const fetchTopRated = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/movie/top_rated");
		dispatch({
			type: FETCH_TOP_RATED,
			payload: { ...response.data, media_type: "movie" },
		});
	};
};

export const fetchAction = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/movie?with_genres=28");
		dispatch({
			type: FETCH_ACTION,
			payload: { ...response.data, media_type: "movie" },
		});
	};
};

export const fetchComedy = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/movie?with_genres=35");
		dispatch({
			type: FETCH_COMEDY,
			payload: { ...response.data, media_type: "movie" },
		});
	};
};

export const fetchRomance = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/movie?with_genres=10749");
		dispatch({
			type: FETCH_ROMANCE,
			payload: { ...response.data, media_type: "movie" },
		});
	};
};

export const fetchDocumentaries = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/movie?with_genres=99");
		dispatch({
			type: FETCH_DOCUMENTARIES,
			payload: { ...response.data, media_type: "movie" },
		});
	};
};

export const fetchHorror = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/movie?with_genres=27");
		dispatch({
			type: FETCH_HORROR,
			payload: { ...response.data, media_type: "movie" },
		});
	};
};

// PROFILE DATA

// export const fetchCurrentProfile = (id) => {
// 	return async (dispatch) => {
// 		const response = await jsonServer.get(`/users/${id}`);
// 		dispatch({ type: FETCH_CURRENT_PROFILE, payload: response.data });
// 	};
// };

export const setCurrentProfile = (userCredentials) => {
	return {
		type: SET_CURRENT_PROFILE,
		payload: userCredentials,
	};
};

export const setCurrentAccount = (account) => {
	return {
		type: SET_CURRENT_ACCOUNT,
		payload: account,
	};
};

export const changeAvatarAndUsername = (avatar, username) => {
	return {
		type: CHANGE_AVATAR_AND_USERNAME,
		avatar,
		username,
	};
};

export const fetchMyList = (uid, accountId) => {
	return async (dispatch) => {
		const docRef = db
			.collection("users")
			.doc(uid)
			.collection("accounts")
			.doc(accountId);
		const doc = await docRef.get();
		const data = doc.data();
		dispatch({ type: FETCH_MY_LIST, payload: data ? data.my_list : [] });
	};
};

// export const deleteFromMyList = (uid, id) => {
// return async dispatch => {

// 		type: DELETE_FROM_MY_LIST, payloadupdatedList
// };

// export const addToMyList = (user_id, media_id) => {
// 	return async dispatch =>{
// 		await jsonServer.post(`/users`)
// 	}
// }

// FETCHING DETAILS

export const fetchTvDetails = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/tv/${id}`);
		dispatch({ type: FETCH_TV_DETAILS, payload: response.data });
	};
};

export const fetchMovieDetails = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/movie/${id}`);
		dispatch({ type: FETCH_MOVIE_DETAILS, payload: response.data });
	};
};

export const setDetailsToNull = () => {
	return {
		type: SET_DETAILS_TO_NULL,
		payload: {},
	};
};

// FETCH CREDITS

export const fetchTvCredits = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/tv/${id}/credits`);
		dispatch({ type: FETCH_TV_CREDITS, payload: response.data });
	};
};

export const fetchMovieCredits = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/movie/${id}/credits`);
		dispatch({ type: FETCH_MOVIE_CREDITS, payload: response.data });
	};
};

export const setCreditsToNull = () => {
	return {
		type: SET_CREDITS_TO_NULL,
		payload: {},
	};
};

// FETCH SEASON DETAIL

export const fetchSeasonDetail = (tv_id, season_number) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/tv/${tv_id}/season/${season_number}`);
		dispatch({ type: FETCH_SEASON_DETAIL, payload: response.data });
	};
};

export const setSeasonDetailToNull = () => {
	return {
		type: SET_SEASON_DETAIL_TO_NULL,
		payload: {},
	};
};

// FETCH SIMILAR

export const fetchSimilarMovies = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/movie/${id}/similar`);
		dispatch({ type: FETCH_SIMILAR_MOVIE, payload: response.data });
	};
};

export const setSimilarToNull = () => {
	return {
		type: SET_SIMILAR_TO_NULL,
		payload: {},
	};
};

// FETCH VIDEOS

export const fetchTvVideos = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/tv/${id}/videos`);
		dispatch({ type: FETCH_TV_VIDEOS, payload: response.data });
	};
};

export const fetchMovieVideos = (id) => {
	return async (dispatch) => {
		const response = await tmdb.get(`/movie/${id}/videos`);
		dispatch({ type: FETCH_MOVIE_VIDEOS, payload: response.data });
	};
};

export const setVideosToNull = () => {
	return {
		type: SET_VIDEOS_TO_NULL,
		payload: {},
	};
};

export const fetchTvLatest = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/tv/latest");
		dispatch({
			type: FETCH_TV_LATEST,
			payload: { ...response.data, media_type: "tv" },
		});
	};
};

export const fetchTvPopular = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/tv/popular");
		dispatch({
			type: FETCH_TV_POPULAR,
			payload: { ...response.data, media_type: "tv" },
		});
	};
};

export const fetchTvAction = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/tv?with_genres=80");
		dispatch({
			type: FETCH_TV_ACTION,
			payload: { ...response.data, media_type: "tv" },
		});
	};
};

export const fetchTvComedy = () => {
	return async (dispatch) => {
		const response = await tmdb.get("/discover/tv?with_genres=35");
		dispatch({
			type: FETCH_TV_COMEDY,
			payload: { ...response.data, media_type: "tv" },
		});
	};
};

export const searchMedia = (query) => {
	return async (dispatch) => {
		try {
			const response = await tmdb.get("/search/multi", {
				params: {
					query,
				},
			});
			// console.log(response);
			dispatch({ type: SEARCH_MEDIA, payload: response.data });
		} catch {
			dispatch({ type: SEARCH_MEDIA, payload: {} });
		}
	};
};

export const setSearchToNull = () => {
	return {
		type: SET_SEARCH_TO_NULL,
		payload: {},
	};
};
