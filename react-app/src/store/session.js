import { CREATED_SONG, DELETED_SONG, CREATED_ALBUM, DELETED_ALBUM } from "./common";
import { fetchData } from "./csrf"

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GOT_USER_PLAYLISTS = "session/GOT_USER_PLAYLISTS";
const LIKE_SONG = "session/LIKE_SONG";
const UNLIKE_SONG = "session/UNLIKE_SONG";
const ADD_USER_PLAYLIST = "session/ADD_USER_PLAYLIST";
const REMOVE_USER_PLAYLIST = "session/REMOVE_USER_PLAYLIST";

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

export const addUserPlaylist = (playlistId) => ({
	type: ADD_USER_PLAYLIST,
	playlistId,
})

export const removeUserPlaylist = playlistId => ({
	type: REMOVE_USER_PLAYLIST,
	playlistId
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

const initialState = { user: null };
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
			const songsLiked = [...state.user.songsLiked].filter(songId => songId != action.songId)
			return {user: {...state.user, songsLiked: songsLiked}}
		case ADD_USER_PLAYLIST: {
			return {user: {...state.user, playlists: [...state.user.playlists, parseInt(action.playlistId)]}}
		}
		case REMOVE_USER_PLAYLIST: {
			const playlists = state.user.playlists.filter(playlist => playlist.id != action.playlistId)
			return {user: {...state.user, playlists}}
		}
		case CREATED_SONG: {
			return {user: {...state.user,
			['songs']: [...state.user.songs, action.song.id]}}
		}
		case DELETED_SONG: {
			return {
			  user: {...state.user,
				songsLiked: state.user.songsLiked.filter(songId => songId != action.id)},
				['songs']: state.user.songs.filter(songId => songId != action.id)}
		}
		case CREATED_ALBUM:
			return {user: {...state.user,
			['albums']: [...state.user.albums, action.album.id]}
		}
		case DELETED_ALBUM:
			return {
			  user: {...state.user,
				['albums']: state.user.albums.filter(albumId => albumId != action.id)}
		}
		default:
			return state;
	}
}

export default sessionReducer;
