const CHANGE_PLAYLIST = 'audio/CHANGE_PLAYLIST'
const CHANGE_IDS = 'audio/CHANGE_IDS'
const CHANGE_TRACK = 'audio/CHANGE_TRACK'
const SET_IS_PLAYING = 'audio/SET_IS_PLAYING'
const SET_IS_PAUSED = 'audio/SET_IS_PAUSED'
const SET_PLAYER = 'audio/SET_PLAYER'
const SET_INNER = 'audio/SET_INNER'

export const changePlaylist = (songs, track) => ({
    type: CHANGE_PLAYLIST,
    songs,
    track,
    song: songs[track]
})

/* if you omit song, lookup will be done */
const internalChangeIds = (ids, track, song) => ({
    type: CHANGE_IDS,
    ids,
    track,
    song
})
export const changeIds = (ids, track, song) => (dispatch, getState) => {
    if (!song) {
        const state = getState()
        song = state.songs[ids[track]]
    }
    dispatch(internalChangeIds(ids, track, song))
}

const internalChangeTrack = (track, song) => ({
        type: CHANGE_TRACK,
        track,
        song
    })

export const changeTrack = (track, song) => (dispatch, getState) => {
    if (!song) {
        const state = getState()
        song = state.audio.isById
            ? state.songs[state.audio.ids[track]]
            : state.audio.songs[track]
    }
    dispatch(internalChangeTrack(track, song))
}
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
    songs: [],  // songs is an array of songs
    ids: [],
    track: 0,
    isPlaying: false,
    isPaused: false,
    isById: null,    // true if ids, false if songs
    song: null,
    url: '',
    player: null,
    inner: null
}
function audioReducer(state = initialState, action) {
    console.log(`AUDIO REDUCER: songs${state.songs} track${state.track} ${state.isPlaying}`)
    console.log(`AUDIO REDUCER: action: type${action.type} action${action}`)
    switch (action.type) {
        case CHANGE_IDS:
            if (state.ids !== action.ids)
                return {
                    ...state,
                    songs: [],
                    ids: action.ids,
                    track: action.track,
                    isPlaying: true,
                    isPaused: false,
                    isById: true,
                    song: action.song,
                    url: action.song.mp3
                }
                else if (state.track !== action.track)
                return {
                    ...state,
                    track: action.track,
                    url: action.song.mp3,
                    isPlaying: true,
                    isPaused: false,
                    song: action.song
                }
                else return state
        case CHANGE_PLAYLIST:
            if (state.songs !== action.songs)
                return {
                    ...state,
                    songs: action.songs,
                    ids: [],
                    track: action.track,
                    isPlaying: true,
                    isPaused: false,
                    isById: false,
                    song: action.song,
                    url: action.song.mp3
                }
            else if (state.track === action.track) return state
	// eslint-disable-next-line no-fallthrough
        case CHANGE_TRACK:
            if (state.track === action.track) return state
            return {
                ...state,
                track: action.track,
                isPlaying: true,
                isPaused: false,
                song: action.song,
                url: action.song.mp3
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
         default:
            return state
    }
}

export default audioReducer
