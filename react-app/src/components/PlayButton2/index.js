import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying, setIsPaused } from  '../../store/audio'
import { useAudioContext } from '../../context/AudioContext';


function songMp3(playlist,track){
  return (playlist && playlist[track])
    ? playlist[track].mp3
    : ""
}

function stripAWSURL(url) {
  return !url ? "" : url.slice(url.lastIndexOf('/') + 1)
}

const PlayButton2 = memo(
  function PlayButton2({ tracks, trackIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, track, isPaused } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)

  const dispatch = useDispatch();
  let isMyTrack = (playlist === tracks && trackIndex === track)
  const { player } = useAudioContext();
  // const player = window.audio

  console.log(`Beginning PB2: ${isPlaying?"Y":"N"} ${isMyTrack?"mine":formatTrackInfoClick()} ${trackIndex} isOn: ${isOn} `)


  if (isOn && !isMyTrack) {
    setIsOn(false)
    console.log(`Setting ${trackIndex} to off`)
    return null
  }

  function formatTrackInfoClick(){
    return `playlist: ${playlist===tracks?'same':stripAWSURL(songMp3(playlist,track))} track: ${track===trackIndex?"same":trackIndex}`
  }

  const handleClick = event => {
    event.stopPropagation();
    const rKey = "changePlaylist"
    console.log(`PB2 CLICK: ${isPlaying?"playing ":""} ${isMyTrack?"mine"+trackIndex:""} ${isOn?"on":"off"} ${isPaused?"paused":""}`)
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
        player.current.audio.current.play()
        dispatch(setIsPlaying(true)) /* handles paused */
      } else { /* not paused, but reclicked; should pause */
        console.log(" pausing track ")
        player.current.audio.current.pause()
        dispatch(setIsPaused(true)) /* handles playing */
      }
    }
  }

  const icon = `fas fa-${(isMyTrack && isPlaying) ? "pause" : "play"}-circle`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {isHovered ? <i className={icon} /> : trackIndex + 1}
    </div>
  )})

export default PlayButton2;
