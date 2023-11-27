import React, { useRef, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer , { RHAP_UI }  from 'react-h5-audio-player'

import { setPlayer, changeTrack, setIsPaused, setIsPlaying, setInner } from '../../store/audio'
// import { useAudioContext } from '../../context/AudioContext'


function songMp3(playlist,track){
  return playlist[track].mp3
}


const MusicPlayer = memo(function MusicPlayer() {
  const { playlist, track, isPlaying, current, player } = useSelector(state => state.audio)
  const songs = Object.values(useSelector(state => state.songs))
  const dispatch = useDispatch()
  const audio = useRef()
  // const { player, setPlayer } = useAudioContext()
  console.log(`Rerendering PLAYER: songs: ${songs.length} playlist: ${playlist.length}`)

  if (!player) dispatch(setPlayer(audio))
  if (audio) window.audio = audio
  if (audio.current?.audio?.current) {
    setInner(audio.current)
    window.inner = audio.current.audio.current
  }

  function handleClickNext() {
    const nextTrackIndex = (track + 1) % playlist.length // Loop back to beginning
    // console.log(`CLICK NEXT: ${track} ${nextTrackIndex}`)
    if (!playlist || !playlist.length) return dispatch(changeTrack(0))
    dispatch(changeTrack(nextTrackIndex))
    setIsPlaying(true)
  }
  const handleClickPrevious = () => {
    const prevTrackIndex = (track ? track : playlist.length) - 1 // back to end
    // console.log(`CLICK PREV: ${track} ${prevTrackIndex}`)
    if (!playlist || !playlist.length) return dispatch(changeTrack(0))
    dispatch(changeTrack(prevTrackIndex))
    setIsPlaying(true)
  }

function handleEnded() {
  console.log(`ENDED: ${track} ${songMp3(playlist, track)}`)
  handleClickNext()
}

/* only duration seems set for MP3s */
function handleMetaData(event) {
  if (!event) return
  // const { duration, album, artist, title } = event.target
}
function handlePause() {
  // console.log(`PAUSE: ${track} ${songMp3(playlist, track)}`)
  dispatch(setIsPaused(true))
}
function handlePlay() {
  // console.log(`PLAY: ${track} ${songMp3(playlist, track)}`)
  dispatch(setIsPlaying(true))
}

// if (!playlist || !playlist.length ||
//       track < 0 || track >= playlist.length) {
//         setIsPlaying(false)
// }

  return (
      <AudioPlayer
        autoPlay={isPlaying}
        autoPlayAfterSrcChange={true}
        hasDefaultKeyBindings={false}
        layout='stacked-reverse'
        loop={false}
        muted={false}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onEnded={handleEnded}
        onLoadedMetaData={(event) => handleMetaData(event)}
        onPause={handlePause}
        onPlay={handlePlay}
        onPlaying={handlePlay}
        preload='auto'
        ref={audio}
        showDownloadProgress={false}
        showFilledProgress={true}
        showFilledVolume={true}
        showJumpControls={false}
        showSkipControls={true}
        src={current}
        volume={.5}
        customAdditionalControls={[]}
        customVolumeControls={[
          RHAP_UI.LOOP,
          RHAP_UI.VOLUME,
        ]}

        // UNUSED settings for react-h5-audio-player
        // controls={false}
        // controlsList="nodownload"
        // customAdditionalControls={[
          //   RHAP_UI.LOOP,
          // ]}
          // customControlsSection={[
            //   RHAP_UI.ADDITIONAL_CONTROLS,
            //   RHAP_UI.MAIN_CONTROLS,
            //   RHAP_UI.VOLUME_CONTROLS,
            // ]}
            // customProgressBarSection={
            //   [
            //     RHAP_UI.CURRENT_TIME,
            //     RHAP_UI.DURATION,
            //     RHAP_UI.PROGRESS_BAR,
            //     RHAP_UI.VOLUME,
            // ]}
            // customVolumeControls={[
              //   RHAP_UI.VOLUME,
              //   RHAP_UI.VOLUME_CONTROLS,
            // ]}
            // defaultCurrentTime="0:00"
            // defaultDuration="0:00"
            // onAbort={() => console.log("ABORT")}
            // onCanPlay={() => console.log("CAN PLAY")}
            // onCanPlayThrough={() => console.log("CAN PLAY THROUGH")}
            // onEmptied={() => console.log("EMPTIED")}
            // onError={() => console.log("ERROR")}
            // onLoadStart={() => console.log("LOAD START")}
            // onLoadedData={() => console.log("LOADED DATA")}
            // onPlayError={() => console.log("PLAY ERROR")}
            // onProgress={() => console.log("PROGRESS")}
            // onSeeked={() => console.log("SEEKED")}
            // onSeeking={() => console.log("SEEKING")}
            // onSuspend={() => console.log("SUSPEND")}
            // onVolumeChanged={() => console.log("VOLUME CHANGED")}
            // onWaiting={() => console.log("WAITING")}
            // progressJumpSteps={{ backward: 5000, forward: 5000 }}
            // showDownloadProgress={true}

            // css variables for react-h5-audio-player
            // rhap_theme-color: #868686 !default;   // Color of all buttons and volume/progress indicators
// rhap_background-color: #fff !default; // Color of the player background
// rhap_bar-color: #e4e4e4 !default;     // Color of volume and progress bar
// rhap_time-color: #333 !default;       // Font color of current time and duration
// rhap_font-family: inherit !default;   // Font family of current time and duration

// current defaults for ordering of controls
// customProgressBarSection: [RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION],
// customControlsSection: [RHAP_UI.ADDITIONAL_CONTROLS, RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS],
// customAdditionalControls: [RHAP_UI.LOOP],
// customVolumeControls: [RHAP_UI.VOLUME],

// names for custom control icons (not used)
// interface CustomIcons {
//   play?: ReactNode
//   pause?: ReactNode
//   rewind?: ReactNode
//   forward?: ReactNode
//   previous?: ReactNode
//   next?: ReactNode
//   loop?: ReactNode
//   loopOff?: ReactNode
//   volume?: ReactNode
//   volumeMute?: ReactNode
// }


    />
  );
})

export default MusicPlayer;
