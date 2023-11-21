import { fetchData } from "./csrf"

const GOT_ALL_ALBUMS = "albums/GOT_ALL_ALBUMS";
const GOT_ALBUM = "albums/GOT_ALBUM";
const CREATED_ALBUM = "albums/CREATED_ALBUM";
// const UPDATED_ALBUM = "albums/UPDATED_ALBUM";
const DELETED_ALBUM = "albums/DELETED_ALBUM";
const ADD_TO_ALBUM = "albums/ADD_TO_ALBUM";
const REMOVE_FROM_ALBUM = "albums/REMOVE_FROM_ALBUM";


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

export const addToAlbum = (albumId, song) => {

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

export const thunkCreateAlbum = data => async dispatch => {
    const url = `/api/albums/new/`
    const answer = await fetchData(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!answer.errors) dispatch(createdAlbum(answer))
    return answer
}

// export const thunkUpdateAlbum = (data, id) => async dispatch => {
//     const url = `/api/albums/${id}/`
//     const answer = await fetchData(url, {
//         method: 'PUT',
//         body: JSON.stringify(data)
//     })
//     if (!answer.errors) dispatch(updatedAlbum(answer))
//     return answer
// }

export const thunkDeleteAlbum = id => async dispatch => {
    const url = `/api/albums/${id}`
    const answer = await fetchData(url, { method: 'DELETE' });
    if (!answer.errors) dispatch(deletedAlbum(id))
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
      return {...state, [action.album.id]: action.album}
    case CREATED_ALBUM:
    // case UPDATED_ALBUM:
      return { ...state, [action.album.id]: action.album };
    case DELETED_ALBUM:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default albumReducer;
