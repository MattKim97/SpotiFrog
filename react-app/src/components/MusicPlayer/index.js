import React, { useRef, memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer , { RHAP_UI }  from 'react-h5-audio-player'

import { setPlayer, changeTrack, setIsPaused, setIsPlaying, setInner } from '../../store/audio'
import { songName } from '../../utils/player'

const MusicPlayer = memo(function MusicPlayer() {
  const { playlist, ids, track, isPlaying, url, player, isById, song } = useSelector(state => state.audio)
  const [isPlayError, setIsPlayError] = useState(false)
  const dispatch = useDispatch()
  const audio = useRef()
  console.log(`Rerendering PLAYER: playlist: ${playlist?.length} ids: ${ids?.length} index: ${track} ${songName(song)}`)

  if (!player) dispatch(setPlayer(audio))
  if (audio) window.audio = audio
  if (audio.current?.audio?.current) {
    setInner(audio.current.audio.current)
    window.inner = audio.current.audio.current
  }

  function playlistLength(){
    return isById !== null && isById && ids ? ids.length : (playlist ? playlist?.length : 0)
  }

  function handleClickNext() {
    const length = playlistLength()
    const nextTrackIndex = length < 2 ? 0 : (track + 1) % length // Loop back to beginning
    // console.log(`CLICK NEXT: ${track} ${nextTrackIndex}`)
    // if (!playlist || !length) return dispatch(changeTrack(0))
    dispatch(changeTrack(nextTrackIndex))
    setIsPlaying(true)
  }

  const handleClickPrevious = () => {
    const length = playlistLength()
    const prevTrackIndex = length < 2 ? 0 : (track ? track : length) - 1 // back to end
    // console.log(`CLICK PREV: ${track} ${prevTrackIndex}`)
    // if (!playlist || !length) return dispatch(changeTrack(0))
    dispatch(changeTrack(prevTrackIndex))
    setIsPlaying(true)
  }

function handleEnded() {
  console.log(`ENDED: ${track} ${songName(song)}`)
  handleClickNext()
}

/* only duration seems set for MP3s */
function handleMetaData(event) {
  if (!event) return
  // const { duration, album, artist, title } = event.target
}
function handlePause() {
  console.log(`PAUSE: ${track} ${songName(song)}`)
  dispatch(setIsPaused(true))
}
function handlePlay() {
  console.log(`PLAY: ${track} ${songName(song)}`)
  setIsPlayError(false)
  const mainButton = document.getElementsByClassName("rhap_play-pause-button")[0]
  mainButton.classList.remove("error")
  mainButton.style["color"] = 0xffffff;
  dispatch(setIsPlaying(true))
}

function handlePlayError() {
  if (isPlayError) return
  console.log("PLAY ERROR")
  setIsPlayError(true)
  setErrorCondition()
}

function setErrorCondition() {
  const mainButton = document.getElementsByClassName("rhap_play-pause-button")[0]
  mainButton.classList.add("error")
  mainButton.style["color"] = 0xff0000;
  dispatch(setIsPaused(true))
    }


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
        onPlayError={handlePlayError}

        onPlaying={handlePlay}
        preload='auto'
        ref={audio}
        showDownloadProgress={false}
        showFilledProgress={true}
        showFilledVolume={true}
        showJumpControls={false}
        showSkipControls={true}
        src={url}
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
            onAbort={() => console.log("ABORT")}
            onCanPlay={() => console.log("CAN PLAY")}
            onCanPlayThrough={() => console.log("CAN PLAY THROUGH")}
            onEmptied={() => console.log("EMPTIED")}
            onError={() => console.log("ERROR")}
            onLoadStart={() => console.log("LOAD START")}
            onLoadedData={() => console.log("LOADED DATA")}
            onProgress={() => console.log("PROGRESS")}
            onSeeked={() => console.log("SEEKED")}
            onSeeking={() => console.log("SEEKING")}
            onSuspend={() => console.log("SUSPEND")}
            onVolumeChanged={() => console.log("VOLUME CHANGED")}
            onWaiting={() => console.log("WAITING")}
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
