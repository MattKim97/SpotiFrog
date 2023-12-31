import { fetchData } from "./csrf"
import { CREATED_ALBUM, CREATED_SONG, DELETED_ALBUM, DELETED_SONG } from "./common";

const GOT_ALL_ALBUMS = "albums/GOT_ALL_ALBUMS";
const GOT_ALBUM = "albums/GOT_ALBUM";
// const UPDATED_ALBUM = "albums/UPDATED_ALBUM";
// const ADD_TO_ALBUM = "albums/ADD_TO_ALBUM";
// const REMOVE_FROM_ALBUM = "albums/REMOVE_FROM_ALBUM";
const GET_USER_ALBUMS = "playlists/GET_USER_ALBUMS";

export const gotAllAlbums = albums => ({
    type: GOT_ALL_ALBUMS,
    albums
});

export const gotAlbum = album => ({
    type: GOT_ALBUM,
    album
});

export const createdAlbum = album => ({
    type: CREATED_ALBUM,
    album
});

// export const updatedAlbum = album => ({
//     type: UPDATED_ALBUM,
//     album
// });

export const deletedAlbum = id => ({
    type: DELETED_ALBUM,
    id
});

export const getUserAlbums = albums => ({
  type: GET_USER_ALBUMS,
  albums
})

export const thunkGetUserAlbums = userId => async dispatch => {
  const url = `/api/users/${userId}/albums`;
  let answer = await fetchData(url);
  if (!answer.errors) {
    dispatch(getUserAlbums(answer.albums));
  }
}

export const thunkGetAllAlbums = () => async dispatch => {
    const url = `/api/albums/`
    let answer = await fetchData(url)
    if (!answer.errors) {
        answer = answer.albums
        dispatch(gotAllAlbums(answer))
    }
    return answer
  }

export const thunkGetAlbum = id => async dispatch => {
    const url = `/api/albums/${id}`
    const answer = await fetchData(url)
    if (!answer.errors) dispatch(gotAlbum(answer))
    return answer
}

export const thunkCreateAlbum = formData => async dispatch => {

    try {
      const url = `/api/albums/new`

      const response = await fetch(url, {
        method: 'POST',
        body: formData
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(createdAlbum(responseData));
      }

      return responseData;
    } catch (error) {
      return { errors: { system: error.message } };
    }
  };


// export const thunkUpdateAlbum = (data, id) => async dispatch => {
//     const url = `/api/albums/${id}/`
//     const answer = await fetchData(url, {
//         method: 'PUT',
//         body: JSON.stringify(data)
//     })
//     if (!answer.errors) dispatch(updatedAlbum(answer))
//     return answer
// }

export const thunkDeleteAlbum = (id, songIds) => async dispatch => {
    const url = `/api/albums/${id}`
    const answer = await fetchData(url, { method: 'DELETE' });
    if (!answer.errors) dispatch(deletedAlbum(id, songIds))
    return answer
}

export const thunkAddSongToAlbum = (albumId, songId) => async dispatch => {
    const answer = await fetchData(
      `/api/albums/${albumId}/songs/${songId}`,
      { method: 'PUT' })
    if (!answer.errors) dispatch(gotAlbum(albumId))
    return answer
}

export const thunkRemoveSongFromAlbum = (albumId, songId) => async dispatch => {
  const answer = await fetchData(
    `/api/albums/${albumId}/songs/${songId}`,
    { method: 'PATCH' })
  if (!answer.errors) dispatch(gotAlbum(albumId))
  return answer
}


const initialState = {};
const albumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_ALBUMS:
      const normalized = {};
      action.albums.forEach(p => normalized[p.id] = p);
      return normalized;
    case GOT_ALBUM:
      return {...state, [action.album.id]: action.album};
    case GET_USER_ALBUMS: {
      const normalized = {};
      action.albums.forEach(a => normalized[a.id] = a);
      return {...state, ...normalized};
    }
    case CREATED_ALBUM:
    // case UPDATED_ALBUM:
      return { ...state, [action.album.id]: action.album };
    case DELETED_ALBUM:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case CREATED_SONG: {
      return action.albumId
        ? {...state,
          [action.albumId]:
          {...state[action.albumId],
            songs: [...state[action.albumId].songs, action.id]}} : state
    }
    case DELETED_SONG: {
      return action.albumId
        ? {...state,
          [action.albumId]:
          {...state[action.albumId],
            songs: state[action.albumId].songs.filter(songId => songId !== action.id)}} : state
    }
    default:
      return state;
  }
};

export default albumReducer;
