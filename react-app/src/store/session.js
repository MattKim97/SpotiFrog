import { fetchData } from "./csrf"

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const GOT_USER_PLAYLISTS = "session/GOT_USER_PLAYLISTS";


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

export const signUp = (formData) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		// headers: {
		// 	"Content-Type": "multipart/form-data",
		// },
		body: formData,
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
		default:
			return state;
	}
}

export default sessionReducer;
