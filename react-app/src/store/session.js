import { fetchData } from "./csrf"

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GOT_USER_PLAYLISTS = "session/GOT_USER_PLAYLISTS";
const LIKE_SONG = "session/LIKE_SONG";
const UNLIKE_SONG = "session/UNLIKE_SONG";

const setUser = user => ({
	type: SET_USER,
	user
});

const removeUser = () => ({
	type: REMOVE_USER
});

const gotUserPlaylists = playlists => ({
	type: GOT_USER_PLAYLISTS,
	playlists
})

export const likeSong = songId => ({
    type: LIKE_SONG,
    songId
})

export const unlikeSong = songId => ({
    type: UNLIKE_SONG,
    songId
})


export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
	}
};

export const signUp = formData => async dispatch => {
	const headers = {};
	const body = formData;
	if (formData.profilePicture)
		headers["Content-Type"] = "multipart/form-data"
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers,
		body
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const thunkGetUserPlaylist = userId => async dispatch => {
    const url = `/api/users/${userId}/playlists`
    let answer = await fetchData(url)
    if (!answer.errors) {
        answer = answer.playlists
        dispatch(gotUserPlaylists(answer))
    }
	return answer
}

export const thunkLikeSong = songId => async dispatch => {
    const url = `/api/songs/${songId}/likes`
    const answer = await fetchData(url, {method: "POST"})
    if (!answer.errors) dispatch(likeSong(songId))
    return answer
}

export const thunkUnlikeSong = songId => async dispatch => {
    const url = `/api/songs/${songId}/likes`
    const answer = await fetchData(url, {method: "DELETE"})
    if (!answer.errors) dispatch(unlikeSong(songId))
    return answer
}

const initialState = { user: null,
					   playlists: {},
					   albums: {},
					 };
function sessionReducer(state = initialState, action) {
	switch (action.type) {
		case REMOVE_USER:
			return { ...state, user: null };
		case SET_USER:
			return { ...state, user: action.user };
		case GOT_USER_PLAYLISTS: {
			const playlists = {};
			action.playlists.forEach(p => playlists[p.id] = p);
			return { ...state, playlists };
		}
		case LIKE_SONG:{
			const songsLiked = [...state.user.songsLiked]
			songsLiked.push(parseInt(action.songId))
			return {user: {...state.user, songsLiked}}
		}
		case UNLIKE_SONG:
			const songsLiked = [...state.user.songsLiked]
			return {user: {...state.user, songsLiked: songsLiked.filter(songId => songId !== action.songId)}}
		default:
			return state;
	}
}

export default sessionReducer;
