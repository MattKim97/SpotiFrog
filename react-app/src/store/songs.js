import { CREATED_SONG, DELETED_SONG, DELETED_ALBUM } from "./common";
import { fetchData } from "./csrf"

const GOT_ALL_SONGS = "songs/GOT_ALL_SONGS";
const GOT_SONG = "songs/GOT_SONG";
const UPDATED_SONG = "songs/UPDATED_SONG";
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

      const response = await fetch(url, {
        method: 'POST',
        body: formData
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

export const thunkDeleteSong = (id, playlistIds=[], albumId) => async dispatch => {
    const url = `/api/songs/${id}`
    const answer = await fetchData(url, {method: 'DELETE'})
    if (!answer.errors) dispatch(deletedSong(id, playlistIds, albumId))
    return answer
}

// export const thunkLikeSong = songId => async dispatch => {
//     const url = `/api/songs/${songId}/likes`
//     const answer = await fetchData(url, {method: "POST"})
//     if (!answer.errors) dispatch(likeSong(songId))
//     return answer
// }

// export const thunkUnlikeSong = songId => async dispatch => {
//     const url = `/api/songs/${songId}/likes`
//     const answer = await fetchData(url, {method: "DELETE"})
//     if (!answer.errors) dispatch(unlikeSong(songId))
//     return answer
// }

// export const thunkAddSongToPlaylist = (playlistId, songId) => async dispatch => {
//   const answer = await fetchData(`/api/playlists/${playlistId}/songs/${songId}`, {method: "PUT"})
//   if (!answer.errors) {
//       dispatch(addSongToPlaylist(playlistId, songId))
//   }
// }

export const selectSongsByIds = (songList) => state => {
  if (!songList) return null
  console.log("LIST OF SONG IDS", songList)

  const songs = songList.map(songId => state.songs[songId])
  console.log("SONGS SELECTED", songs)
  return songs
  //
}

// export const selectSongsByAlbum = (albumId) => state => {}


const initialState = {};
const songReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_SONGS:
      const normalized = {};
      action.songs.forEach(p => normalized[p.id] = p);
      return normalized;
    case GOT_SONG:
      return {...state, [action.song.id]: action.song };
    case CREATED_SONG:
    case UPDATED_SONG:
      return { ...state, [action.song.id]: action.song };
    case DELETED_SONG: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case LIKE_SONG:{
        const prevLikes = state[action.id].userLikes
        return {...state, [action.id]: {...state[action.id], userLikes: prevLikes + 1}}
    }
    case UNLIKE_SONG:
      const prevLikes = state[action.id].userLikes
      return {...state, [action.id]: {...state[action.id], userLikes: prevLikes - 1}}
      case DELETED_ALBUM: {
          if (!action.songIds || !action.songIds.length) return state;
          const newState = { ...state };
          action.songIds.forEach(songId => {
            if (newState[songId]?.albumId === action.id) {
              newState[songId] =
                {...newState[songId],
                  albumTrackNumber: null,
                  albumId: null}
          }})
          return newState;
        }

    default:
      return state;
  }
};

export default songReducer;
