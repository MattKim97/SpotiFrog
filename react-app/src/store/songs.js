const GOT_ALL_SONGS = "songs/GOT_ALL_SONGS";
const GOT_SONG = "songs/GOT_SONG";
const CREATED_SONG = "songs/CREATED_SONG";
const UPDATED_SONG = "songs/UPDATED_SONG";
const DELETED_SONG = "songs/DELETED_SONG";

export const gotAllSongs = songs => ({
    type: GOT_ALL_SONGS,
    songs
});

export const gotSong = song => ({
    type: GOT_SONG,
    song
});

export const createdSong = song => ({
    type: CREATED_SONG,
    song
});

export const updatedSong = song => ({
    type: UPDATED_SONG,
    song
});

export const deletedSong = id => ({
    type: DELETED_SONG,
    id
});

export const thunkGetAllSongs = () => async dispatch => {
    const url = `/api/songs/`
    const answer = await fetchData(url)
    if (!answer.errors) {
        answer = answer.songs
        dispatch(gotAllSongs(answer))
    }
    return answer
  }

export const thunkGetSong = id => async dispatch => {
    const url = `/api/songs/${id}/`
    const answer = await fetchData(url)
    if (!answer.errors) dispatch(gotAllSongs(answer))
    return answer
}

export const thunkCreateSong = data => async dispatch => {
    const url = `/api/songs/`
    const answer = await fetchData(url, {
        method: "POST",
        body: JSON.stringify(data)
    })
    if (!answer.errors) dispatch(createdSong(answer))
    return answer
}

export const thunkUpdateSong = (data, id) => async dispatch => {
    const url = `/api/songs/${id}/`
    const answer = await fetchData(url, {
        method: 'PUT',
        body: JSON.stringify(data)
    })
    if (!answer.errors) dispatch(updatedSong(answer))
    return answer
}

export const thunkDeleteSong = id => async dispatch => {
    const url = `/api/songs/${id}`
    const answer = await fetchData(url, {method: 'DELETE'})
    if (!answer.errors) dispatch(deletedSong(id))
    return answer
}


const initialState = {};
const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_SONGS:
      const normalized = {};
      action.songs.forEach(p => normalized[p.id] = p);
      return normalized;
    case GOT_SONG:
    case CREATED_SONG:
    case UPDATED_SONG:
      return { ...state, [action.song.id]: action.song };
    case DELETED_SONG:
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
};

export default songReducer;
