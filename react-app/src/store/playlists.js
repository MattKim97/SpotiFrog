import { fetchData } from "./csrf"


const GOT_ALL_PLAYLISTS = "playlists/GOT_ALL_PLAYLISTS";
const GOT_PLAYLIST = "playlists/GOT_PLAYLIST";
const CREATED_PLAYLIST = "playlists/CREATED_PLAYLIST";
const UPDATED_PLAYLIST = "playlists/UPDATED_PLAYLIST";
const DELETED_PLAYLIST = "playlists/DELETED_PLAYLIST";

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

// export const thunkGetUserPlaylist = userId => async dispatch => {
//     const url = `/api/users/${userId}/playlists`
//     let answer = await fetchData(url)
//     if (!answer.errors) {
//         answer = answer.playlists
//         dispatch()
//     }
// }

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
    const url = `/api/playlists/${id}/`
    const answer = await fetchData(url)
    if (!answer.errors) dispatch(gotPlaylist(answer))
    return answer
}

export const thunkCreatePlaylist = formData => async dispatch => {
    const url = `/api/playlists/new/`
    let headers = {}; let body = formData;
    if (formData.playlistCover)
      headers = {"Content-Type": "multipart/form-data"}
    else
      body = JSON.stringify(formData)

    const answer = await fetchData(url, {
        method: "POST",
        headers,
        body
    })
    if (!answer.errors) dispatch(createdPlaylist(answer))
    return answer
}

export const thunkUpdatePlaylist = (formData, id) => async dispatch => {
    const url = `/api/playlists/${id}/`
    let headers = {}; let body = formData;
    if (formData.albumCover)
        headers = {"Content-Type": "multipart/form-data"}
    else
        body = JSON.stringify(formData)

    const answer = await fetchData(url, {
        method: 'PUT',
        headers,
        body
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


const initialState = {};
const playlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_PLAYLISTS: {
      const normalized = {};
      action.playlists.forEach(p => normalized[p.id] = p);
      return normalized;}
    case GOT_PLAYLIST:
    case CREATED_PLAYLIST:
    case UPDATED_PLAYLIST:
      return { ...state, [action.playlist.id]: action.playlist };
    case DELETED_PLAYLIST:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default playlistReducer;
