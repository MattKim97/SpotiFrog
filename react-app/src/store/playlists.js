import { fetchData } from "./csrf"

const GOT_ALL_PLAYLISTS = "playlists/GOT_ALL_PLAYLISTS";
const GOT_PLAYLIST = "playlists/GOT_PLAYLIST";
const CREATED_PLAYLIST = "playlists/CREATED_PLAYLIST";
const UPDATED_PLAYLIST = "playlists/UPDATED_PLAYLIST";
const DELETED_PLAYLIST = "playlists/DELETED_PLAYLIST";
const GET_USER_PLAYLIST = "playlists/GET_USER_PLAYLIST";
const ADD_TO_PLAYLIST = "playlists/ADD_TO_PLAYLIST";
const DELETE_FROM_PLAYLIST = "playlists/DELETE_FROM_PLAYLIST";

export const addToPlaylist = playlist => ({
    type: ADD_TO_PLAYLIST,
    playlist
})

export const removeFromPlaylist = playlist => ({
    type: DELETE_FROM_PLAYLIST,
    playlist
})

export const gotAllPlaylists = playlists => ({
    type: GOT_ALL_PLAYLISTS,
    playlists
});

export const gotPlaylist = playlist => ({
    type: GOT_PLAYLIST,
    playlist
});

export const createdPlaylist = playlist => ({
    type: CREATED_PLAYLIST,
    playlist
});

export const updatedPlaylist = playlist => ({
    type: UPDATED_PLAYLIST,
    playlist
});

export const deletedPlaylist = id => ({
    type: DELETED_PLAYLIST,
    id
});

export const getUserPlaylist = playlists => ({
    type: GET_USER_PLAYLIST,
    playlists
})


export const thunkGetUserPlaylist = userId => async dispatch => {
    const url = `/api/users/${userId}/playlists`
    let answer = await fetchData(url)
    if (!answer.errors) {
        dispatch(getUserPlaylist(answer.playlists))
    }
    return answer
}

export const thunkGetAllPlaylists = () => async dispatch => {
    const url = `/api/playlists/`
    let answer = await fetchData(url)
    if (!answer.errors) {
        answer = answer.playlists
        dispatch(gotAllPlaylists(answer))
    }
    return answer
  }

export const thunkGetPlaylist = id => async dispatch => {
    const url = `/api/playlists/${id}`
    const answer = await fetchData(url)
    if (!answer.errors) dispatch(gotPlaylist(answer))
    return answer
}

export const thunkCreatePlaylist = formData => async dispatch => {
    try {
        const url = `/api/playlists/new`

        const response = await fetch(url, {
          method: 'POST',
          body: formData
        });

        const responseData = await response.json();

        if (response.ok) {
          dispatch(createdPlaylist(responseData));
        }

        return responseData;
      } catch (error) {
        return { errors: { system: error.message } };
      }
}

export const thunkUpdatePlaylist = (formData, id) => async dispatch => {
    const url = `/api/playlists/${id}`

    const answer = await fetch(url, {
        method: 'PUT',
        body: formData
    })
    if (!answer.errors) dispatch(updatedPlaylist(answer))
    return answer
}

export const thunkDeletePlaylist = id => async dispatch => {
    const url = `/api/playlists/${id}/`
    const answer = await fetchData(url, {method: 'DELETE'})
    if (!answer.errors) dispatch(deletedPlaylist(id))
    return answer
}

export const thunkAddToPlaylist = (playlistId, songId) => async dispatch => {
    const url = `/api/playlists/${playlistId}/songs/${songId}`
    const answer = await fetchData(url, {method: "PUT"})
    if (!answer.errors) dispatch(addToPlaylist(answer))
    return answer
}

export const thunkRemoveFromPlaylist = (playlistId, songId) => async dispatch => {
    const url = `/api/playlists/${playlistId}/songs/${songId}`
    const answer = await fetchData(url, {method: "PATCH"})
    if (!answer.errors) dispatch(removeFromPlaylist(answer))
    return answer
}

export const consumeUserPlaylists = userPlaylists => state => {
    if (!userPlaylists) return []

    const playlists = userPlaylists.map(playlistId => state.playlists[playlistId])

    return playlists
}


const initialState = {};
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PLAYLISTS: {
      const normalized = {};
      action.playlists.forEach(p => normalized[p.id] = p);
      return normalized;}
    case GOT_PLAYLIST:
        return { ...state, [action.playlist.id]: action.playlist }
    case CREATED_PLAYLIST:
    case UPDATED_PLAYLIST:
      return { ...state, [action.playlist.id]: action.playlist };
    case DELETED_PLAYLIST:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case GET_USER_PLAYLIST: {
        const normalized = {};
        action.playlists.forEach(p => normalized[p.id] = p);
        return {...state, ...normalized}
    }
    case ADD_TO_PLAYLIST: {
        return {...state, [action.playlist.id]: action.playlist}
    }
    case DELETE_FROM_PLAYLIST: {
        return {...state, [action.playlist.id]: action.playlist}
    }
    default:
      return state;
  }
};

export default playlistReducer;
