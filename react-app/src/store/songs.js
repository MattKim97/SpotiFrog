import { fetchData } from "./csrf"

const GOT_ALL_SONGS = "songs/GOT_ALL_SONGS";
const GOT_SONG = "songs/GOT_SONG";
const CREATED_SONG = "songs/CREATED_SONG";
const UPDATED_SONG = "songs/UPDATED_SONG";
const DELETED_SONG = "songs/DELETED_SONG";
const LIKE_SONG = "songs/LIKE_SONG";
const UNLIKE_SONG = "songs/UNLIKE_SONG";


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

export const likeSong = id => ({
    type: LIKE_SONG,
    id
})

export const unlikeSong = id => ({
    type: UNLIKE_SONG,
    id
})

export const thunkGetAllSongs = () => async dispatch => {
    const url = `/api/songs/`
    let answer = await fetchData(url)
    if (!answer.errors) {
        answer = answer.songs
        dispatch(gotAllSongs(answer))
    }
    return answer
  }

export const thunkGetSong = id => async dispatch => {
    const url = `/api/songs/${id}`
    const answer = await fetchData(url)
    if (!answer.errors) dispatch(gotSong(answer))
    return answer
}

export const thunkCreateSong = formData => async dispatch => {
    try {
      const url = `/api/songs/new`;
      let headers = {}; let body = formData;
      if (formData.mp3)
        headers = {"Content-Type": "multipart/form-data"}
      else
        body = JSON.stringify(formData)

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body
      });

      const responseData = await response.json();

      if (response.ok) {
        dispatch(createdSong(responseData));
      }

      return responseData;
    } catch (error) {
      return { errors: { system: error.message } };
    }
  };

export const thunkUpdateSong = (data, id) => async dispatch => {
    const url = `/api/songs/${id}`
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
    case DELETED_SONG: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case LIKE_SONG:{
        return {...state, [action.id]: {...state[action.id], liked: true}}
    }
    case UNLIKE_SONG:
        return {...state, [action.id]: {...state[action.id], liked: false}}
    default:
      return state;
  }
};

export default songReducer;
