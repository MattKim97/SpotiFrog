const CHANGE_PLAYLIST = 'audioPlayer/CHANGE_PLAYLIST'
const CHANGE_TRACK = 'audioPlayer/CHANGE_TRACK'
const SET_IS_PLAYING = 'audioPlayer/SET_IS_PLAYING'

export const changePlaylist = (playlist, track) => ({
    type: CHANGE_PLAYLIST,
    playlist,
    track
})

export const changeTrack = track => ({
    type: CHANGE_TRACK,
    track
})

export const setIsPlaying = isPlaying => ({
    type: SET_IS_PLAYING,
    isPlaying
})

const initialState = {
    playlist: [],       // playlist is an array of mp3 URLs
    track: 0,
    isPlaying: false
}
function audioPlayerReducer(state = initialState, action) {
    // console.log(`AUDIO REDUCER: playlist${state.playlist} track${state.track} ${state.isPlaying}`)
    // console.log(`action: type${action.type} action${action}`)
    switch (action.type) {
        case CHANGE_PLAYLIST:
            if (state.playlist !== action.playlist)
                return {
                    ...state,
                    playlist: action.playlist,
                    track: action.track,
                    isPlaying: true
                }
            else if (state.track === action.track) return state
        /* intentional fall-through */
        case CHANGE_TRACK:
            if (state.track === action.track) return state
            return {
                ...state,
                track: action.track
            }
        case SET_IS_PLAYING:
            return state.isPlaying === action.isPlaying
                ? state
                : { ...state, isPlaying: action.isPlaying }
        default:
            return state
    }
}

export default audioPlayerReducer
