import React, { createRef, memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer /*, { RHAP_UI } */ from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { changeTrack, setIsPaused, setIsPlaying } from '../../store/audio'
import { thunkGetAllSongs } from '../../store/songs'
import PlayButton2 from '../PlayButton2'

const MusicPlayer = memo(function MusicPlayer() {
  const { playlist, track, isPlaying } = useSelector(state => state.audio)

  const songs = Object.values(useSelector(state => state.songs))
  const dispatch = useDispatch()
  const audio = createRef()
  const [mp3s] = useState({})
  console.log(`Rerendering PLAYER: songs: ${songs.length} playlist: ${playlist.length}`)


// if (songs && songs.length) console.log(`songs ${Object.keys(songs[0])}`)
// songs albumId,albumName,albumTrackNumber,artist,id,liked,lyrics,mp3,name,playtimeLength,uploadedAt,userId,userLikes

// BEGIN TEMPORARY CODE
// just fills in random songs; remove when info passed
const rKey = "allSongs"
const [ref] = useState({[rKey]: null});
if (!Array.isArray(songs) || !songs.length) {
    if (!ref[rKey]) ref[rKey] = dispatch(thunkGetAllSongs())
    return null;
} else if (ref[rKey]) delete ref[rKey]

console.log("checking songs")
if (!songs || songs.length < 4) return null

function songMp3(playlist,track){
  return playlist[track]
}

let uniqueSongs
function getRandomUniqueSong() {
  if (!uniqueSongs || !uniqueSongs.length)
      uniqueSongs = [...songs]
  const index = getRandomInt(0, uniqueSongs.length-1);
  return uniqueSongs.splice(index, 1)[0]
}

if (!mp3s["first"]?.length) {
  mp3s["first"] = []
  mp3s["second"] = []
  for (let i = 0; i < 2; i++)
    mp3s["first"].push(getRandomUniqueSong().mp3)
  for (let i = 0; i < 4; i++)
    mp3s["second"].push(getRandomUniqueSong().mp3)
  console.log(songs)
  console.log(mp3s["first"].map(e => stripAWSURL(e)))
  console.log(mp3s["second"].map(e => stripAWSURL(e)))
}
// END TEMPORARY CODE

  function handleClickNext() {
    const nextTrackIndex = (track + 1) % playlist.length // Loop back to beginning
    console.log(`CLICK NEXT: ${track} ${nextTrackIndex}`)
    if (!playlist || !playlist.length) return dispatch(changeTrack(0))
    // const nextTrackIndex = (track + 1) % playlist.length // Loop back to beginning
    dispatch(changeTrack(nextTrackIndex))
    setIsPlaying(true)
  }
  const handleClickPrevious = () => {
    const prevTrackIndex = (track ? track : playlist.length) - 1 // back to end
    console.log(`CLICK PREV: ${track} ${prevTrackIndex}`)

    if (!playlist || !playlist.length) return dispatch(changeTrack(0))
    // const prevTrackIndex = (track ? track : playlist.length) - 1 // back to end
    dispatch(changeTrack(prevTrackIndex))
    setIsPlaying(true)
  }

function handleEnded() {
  console.log(`ENDED: ${track} ${songMp3(playlist, track)}`)
  handleClickNext()
}

function handleMetaData(event) {
  if (!event) return
  const { duration, album, artist, title } = event.target
  console.log(`METADATA: ${album} ${artist}`)
  console.log(`METADATA: ${title} ${duration}`)
}
function handlePause() {
  console.log(`PAUSE: ${track} ${songMp3(playlist, track)}`)
  dispatch(setIsPaused(true))
}

if (!playlist || !playlist.length ||
      track < 0 || track >= playlist.length) {
        setIsPlaying(false)
}

  return (
    <>
    <h1>MusicPlayer</h1>
    {mp3s["first"]?.length &&
    <>
      <h1>list #1 (2 songs)</h1>
      <ul>
        {mp3s["first"].map((url, i) => <li key={i}><PlayButton2 tracks={mp3s["first"]} trackIndex={i} audio={audio} />{stripAWSURL(url)}</li>)}
      </ul>
      <h1>list #2 (4 songs)</h1>
      <ul>
        {mp3s["second"].map((url, i) => <li key={i}><PlayButton2 tracks={mp3s["second"]} trackIndex={i} audio={audio} /> {stripAWSURL(url)} </li>)}
      </ul>
      </>
    }
      <AudioPlayer
        autoPlay={isPlaying}
        autoPlayAfterSrcChange={isPlaying}
        hasDefaultKeyBindings={false}
        layout='stacked-reverse'
        loop={false}
        muted={false}
        onAbort={() => console.log("ABORT")}
        onCanPlay={() => console.log("CAN PLAY")}
        onCanPlayThrough={() => console.log("CAN PLAY THROUGH")}
        onClickNext={handleClickNext}
        onClickPrevious={handleClickPrevious}
        onEmptied={() => console.log("EMPTIED")}
        onEnded={handleEnded}
        onError={() => console.log("ERROR")}
        onLoadStart={() => console.log("LOAD START")}
        onLoadedData={() => console.log("LOADED DATA")}
        onLoadedMetaData={(event) => handleMetaData(event)}
        onPause={handlePause}
        onPlay={() => console.log("PLAY")}
        onPlayError={() => console.log("PLAY ERROR")}
        onPlaying={() => console.log("PLAYING")}
        onProgress={() => console.log("PROGRESS")}
        onSeeked={() => console.log("SEEKED")}
        onSeeking={() => console.log("SEEKING")}
        onSuspend={() => console.log("SUSPEND")}
        onVolumeChanged={() => console.log("VOLUME CHANGED")}
        onWaiting={() => console.log("WAITING")}
        preload='auto'
        ref={audio}
        showFilledProgress={true}
        showFilledVolume={true}
        showJumpControls={false}
        showSkipControls={true}
        src={songMp3(playlist, track)}
        volume={.5}

        // unused settings for react-h5-audio-player
        // controls={false}
        // controlsList="nodownload"
        // customAdditionalControls={[]}
        // customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        // customProgressBarSection={
          //   [
            //     RHAP_UI.CURRENT_TIME,
            //     RHAP_UI.DURATION,
            //     RHAP_UI.PROGRESS_BAR,
            //     RHAP_UI.VOLUME,
            // ]
            // }
            // customVolumeControls={[]}
            // defaultCurrentTime="0:00"
            // defaultDuration="0:00"
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
    </>
  );
})

// BEGIN TEMPORARY CODE
// Returns a random integer between min (inclusive) and
// max (inclusive). Neither max nor min have to be an int.
function stripAWSURL(url) {
  return url.slice(url.lastIndexOf('/') + 1)
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// END TEMPORARY CODE
export default MusicPlayer;
