const CHANGE_PLAYLIST = 'audioPlayer/CHANGE_PLAYLIST'
const CHANGE_CURRENT_TRACK = 'audioPlayer/CHANGE_CURRENT_TRACK'

export const changePlaylist = (playlist, track) => ({
    type: CHANGE_PLAYLIST,
    playlist,
    track
})

export const changeCurrentTrack = track => ({
    type: CHANGE_CURRENT_TRACK,
    track
})

const initialState = {
    playlist: [],       // playlist is an array of mp3 URLs
    currentTrack: 0
}
function audioPlayerReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_PLAYLIST:
            if (state.playlist !== action.playlist)
                return {
                    ...state,
                    playlist: action.playlist,
                    currentTrack: action.track
                }
            else if (state.currentTrack === action.track) return state
        /* intentional fall-through */
        case CHANGE_CURRENT_TRACK:
            if (state.currentTrack === action.track) return state
            return {
                ...state,
                currentTrack: action.track
            }
        default:
            return state
    }
}

export default audioPlayerReducer
