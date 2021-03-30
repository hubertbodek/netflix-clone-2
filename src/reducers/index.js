import { combineReducers } from "redux";

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
	DELETE_FROM_MY_LIST,
	// ADD_TO_MY_LIST,
	// REMOVE_FROM_MY_LIST,
	FETCH_MOVIE_DETAILS,
	FETCH_TV_DETAILS,
	SET_DETAILS_TO_NULL,
	FETCH_TV_CREDITS,
	FETCH_MOVIE_CREDITS,
	SET_CREDITS_TO_NULL,
	FETCH_SEASON_DETAIL,
	SET_SEASON_DETAIL_TO_NULL,
	FETCH_SIMILAR_MOVIE,
	SET_SIMILAR_TO_NULL,
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
} from "../actions/types";

const fetchTrendingReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_TRENDING:
			return action.payload;
		default:
			return state;
	}
};

const fetchNetflixOrginalsReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_NETFLIX_ORGINALS:
			return action.payload;
		default:
			return state;
	}
};

const fetchTopRatedReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_TOP_RATED:
			return action.payload;
		default:
			return state;
	}
};

const fetchActionReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_ACTION:
			return action.payload;
		default:
			return state;
	}
};

const fetchComedyReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_COMEDY:
			return action.payload;
		default:
			return state;
	}
};

const fetchRomanceReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_ROMANCE:
			return action.payload;
		default:
			return state;
	}
};

const fetchDocumentariesReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_DOCUMENTARIES:
			return action.payload;
		default:
			return state;
	}
};

const fetchHorrorReducer = (state = [], action) => {
	switch (action.type) {
		case FETCH_HORROR:
			return action.payload;
		default:
			return state;
	}
};

// USER PROFILE DATA

const userProfile = (
	// initial state
	state = {
		user: {},
		currentAccount: {},
		avatar_url: [],
	},
	action
) => {
	switch (action.type) {
		case SET_CURRENT_PROFILE:
			return { ...state, user: action.payload };
		// case UPDATE_MY_LIST:
		case DELETE_FROM_MY_LIST:
			return { ...state, my_list: action.updatedList };
		case FETCH_MY_LIST:
			return {
				...state,
				currentAccount: {
					...state.currentAccount,
					my_list: action.payload,
				},
			};
		case SET_CURRENT_ACCOUNT:
			return { ...state, currentAccount: action.payload };
		case CHANGE_AVATAR_AND_USERNAME:
			return {
				...state,
				currentAccount: {
					...state.currentAccount,
					avatar_url: action.avatar,
					username: action.username,
				},
			};
		default:
			return state;
	}
};

const fetchDetails = (state = {}, action) => {
	switch (action.type) {
		case FETCH_TV_DETAILS:
			return action.payload;
		case FETCH_MOVIE_DETAILS:
			return action.payload;
		case SET_DETAILS_TO_NULL:
			return action.payload;
		default:
			return state;
	}
};

const fetchCredits = (state = {}, action) => {
	switch (action.type) {
		case FETCH_TV_CREDITS:
			return action.payload;
		case FETCH_MOVIE_CREDITS:
			return action.payload;
		case SET_CREDITS_TO_NULL:
			return action.payload;
		default:
			return state;
	}
};

const fetchSeasonDetail = (state = {}, action) => {
	switch (action.type) {
		case FETCH_SEASON_DETAIL:
			return action.payload;
		case SET_SEASON_DETAIL_TO_NULL:
			return action.payload;
		default:
			return state;
	}
};

const fetchSimilar = (state = {}, action) => {
	switch (action.type) {
		case FETCH_SIMILAR_MOVIE:
			return action.payload;
		case SET_SIMILAR_TO_NULL:
			return action.payload;
		default:
			return state;
	}
};

const fetchVideos = (state = {}, action) => {
	switch (action.type) {
		case FETCH_MOVIE_VIDEOS:
			return action.payload;
		case FETCH_TV_VIDEOS:
			return action.payload;
		case SET_VIDEOS_TO_NULL:
			return action.payload;
		default:
			return state;
	}
};

const fetchTvLatest = (state = {}, action) => {
	switch (action.type) {
		case FETCH_TV_LATEST:
			return action.payload;
		default:
			return state;
	}
};

const fetchTvPopular = (state = {}, action) => {
	switch (action.type) {
		case FETCH_TV_POPULAR:
			return action.payload;
		default:
			return state;
	}
};

const fetchTvAction = (state = {}, action) => {
	switch (action.type) {
		case FETCH_TV_ACTION:
			return action.payload;
		default:
			return state;
	}
};

const fetchTvComedy = (state = {}, action) => {
	switch (action.type) {
		case FETCH_TV_COMEDY:
			return action.payload;
		default:
			return state;
	}
};

const searchResults = (state = {}, action) => {
	switch (action.type) {
		case SEARCH_MEDIA:
			return action.payload;
		case SET_SEARCH_TO_NULL:
			return action.payload;
		default:
			return state;
	}
};

export default combineReducers({
	trending: fetchTrendingReducer,
	netflixOrginals: fetchNetflixOrginalsReducer,
	topRated: fetchTopRatedReducer,
	action: fetchActionReducer,
	comedy: fetchComedyReducer,
	romance: fetchRomanceReducer,
	documentaries: fetchDocumentariesReducer,
	horror: fetchHorrorReducer,
	// profiles
	currentUser: userProfile,
	detailsToDisplay: fetchDetails,
	credits: fetchCredits,
	seasonDetail: fetchSeasonDetail,
	similar: fetchSimilar,
	videos: fetchVideos,
	tvLatest: fetchTvLatest,
	tvPopular: fetchTvPopular,
	tvAction: fetchTvAction,
	tvComedy: fetchTvComedy,
	searchResults,
});
