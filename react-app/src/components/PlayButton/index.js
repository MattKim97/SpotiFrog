import React, { /* memo, */ useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying, setIsPaused } from  '../../store/audio'
// import { useAudioContext } from '../../context/AudioContext';

function songMp3(playlist,track){
  return (playlist && playlist[track])
    ? playlist[track].mp3
    : ""
}

function stripAWSURL(url) {
  return !url ? "" : url.slice(url.lastIndexOf('/') + 1)
}

// const PlayButton = memo(
  function PlayButton({ tracks, trackIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, track, isPaused, player, inner } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)
  const dispatch = useDispatch();
  // const [isMyTrack, setIsMyTrack] = useState(false)
  // setIsMyTrack(playlist === tracks && trackIndex === track)
  let isMyTrack = (playlist === tracks && trackIndex === track)
  let icon = `fas fa-${(isMyTrack && isPaused) ? "play" : "pause"}-circle`;
  function resetIsMyTrack() {
    isMyTrack = (playlist === tracks && trackIndex === track)
  }
  function resetIcon() {
    icon = `fas fa-${(isMyTrack && isPaused) ? "play" : "pause"}-circle`;
  }
  // const { player } = useAudioContext();
  // const player = window.audio


  if (isOn && !isMyTrack) {
    setIsOn(false)
    console.log(`Setting ${trackIndex} to OFF`)
    return null
  } else if (!isOn && isMyTrack) {
    console.log(`Setting ${trackIndex} ON`)
    setIsOn(true)
    console.log(`Beginning PB2: ${stripAWSURL(songMp3(playlist,track))} ${trackIndex} isOn: ${isOn} `)
  }

  function nowHovered() {
    setIsHovered(true)
    resetIsMyTrack()
    resetIcon()
    console.log(`isHoevered: ${isHovered} isMyTrack: ${isMyTrack} icone classes: ${icon}} `)
  }
  function nowNotHovered() {
    setIsHovered(false)
    resetIsMyTrack()
    resetIcon()
    console.log(`isHoevered: ${isHovered} isMyTrack: ${isMyTrack} icone classes: ${icon}} `)

  }

  const handleClick = event => {
    event.stopPropagation();
    console.log(`PB2 CLICK: ${isPlaying?"playing ":""} ${isMyTrack?"mine "+trackIndex:"new"} ${isOn?"on":"off"} ${isPaused?"paused":"not paused"} `)
    if (!isOn) {
      setIsOn(true)
      console.log(`Setting ${trackIndex} to on`)
    }
    if (!isMyTrack) { /* start playing new track */
      console.log(" dispatching changePlaylist ")
      dispatch(changePlaylist(tracks, trackIndex))
      console.log("returning null")
      return null;
  } else {
      if (isPaused) {
        console.log(" resuming paused track ")
        if (inner) inner.play()
        else if (window.inner) window.inner.play()
        else if (player?.current) player.current.audio.current.play()
        if (inner || window.inner || player?.current) dispatch(setIsPlaying(true)) /* handles paused */
      } else { /* not paused, but reclicked; should pause */
        console.log(" pausing track ")
        if (inner) inner.pause()
        else if (window.inner) window.inner.pause()
        else if (player?.current) player.current.audio.current.pause()
        if (inner || window.inner || player?.current) dispatch(setIsPaused(true)) /* handles playing */
      }
    }
  }

  return (
    <div
      onMouseEnter={nowHovered}
      onMouseLeave={nowNotHovered}
      onClick={handleClick}
    >
      {isHovered ? <i className={icon} /> : trackIndex + 1}
    </div>
  )}
  // )  /* end memo */

export default PlayButton;
