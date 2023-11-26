const CHANGE_PLAYLIST = 'audio/CHANGE_PLAYLIST'
const CHANGE_TRACK = 'audio/CHANGE_TRACK'
const SET_IS_PLAYING = 'audio/SET_IS_PLAYING'
const CHANGE_SONGS = 'audio/CHANGE_SONGS'
const SET_IS_PAUSED = 'audio/SET_IS_PAUSED'
// const CURRENT_SELECTION = 'audio/CURRENT_SELECTION'
const SET_PLAYER = 'audio/SET_PLAYER'
const SET_INNER = 'audio/SET_INNER'

export const changePlaylist = (playlist, track) => ({
    type: CHANGE_PLAYLIST,
    playlist,
    track
})

export const changeSongs = songs => ({
    type: CHANGE_PLAYLIST,
    songs
})

export const changeTrack = track => ({
    type: CHANGE_TRACK,
    track
})

export const setIsPaused = isPaused => ({
    type: SET_IS_PAUSED,
    isPaused
})

export const setIsPlaying = isPlaying => ({
    type: SET_IS_PLAYING,
    isPlaying
})

export const setPlayer = player => ({
    type: SET_PLAYER,
    player
})

export const setInner = inner => ({
    type: SET_INNER,
    inner
})

const initialState = {
    playlist: [],  // playlist is an array of songs
    track: 0,
    isPlaying: false,
    songs: [],
    current: '',
    player: null,
    inner: null
}
function audioReducer(state = initialState, action) {
    // console.log(`AUDIO REDUCER: playlist${state.playlist} track${state.track} ${state.isPlaying}`)
    console.log(`AUDIO REDUCER: action: type${action.type} action${action}`)
    switch (action.type) {
        case CHANGE_PLAYLIST:
            if (state.playlist !== action.playlist)
                return {
                    ...state,
                    playlist: action.playlist,
                    track: action.track,
                    isPlaying: true,
                    isPaused: false,
                    current: action.playlist[action.track].mp3
                }
            else if (state.track === action.track) return state
	// eslint-disable-next-line no-fallthrough
        case CHANGE_TRACK:
            if (state.track === action.track) return state
            return {
                ...state,
                track: action.track,
                current: state.playlist[action.track].mp3
            }
        case SET_IS_PLAYING:
            if (state.isPlaying === action.isPlaying) return state
            if (action.isPlaying && state.isPaused) return { ...state, isPaused: false, isPlaying: true }
            return { ...state, isPlaying: action.isPlaying }
        case SET_IS_PAUSED:
            if (state.isPaused === action.isPaused) return state
            return {
                ...state,
                isPaused: action.isPaused,
                isPlaying: !action.isPaused
            }
        case SET_PLAYER: {
            let inner=null
            console.log(`SET_PLAYER: ${state.player} ==> ${action.player}`)
            if (action.player?.current?.audio?.currnt)
                inner = action.player.current.audio.current;
            if (!action.player || (state.player === action.player && inner && state.inner === inner)) return state
            if (inner && !state.inner) return { ...state, player: action.player, inner }
            return { ...state, player: action.player }
        }
        case SET_INNER: {
            if (!action.inner || state.inner === action.inner) return state
            return { ...state, inner: action.inner }
        }
        case CHANGE_SONGS:
            return state.songs === action.songs
                ? state
                : { ...state, songs: action.songs }
        default:
            return state
    }
}

export default audioReducer
