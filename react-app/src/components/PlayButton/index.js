import React, { /* memo, */ useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, changeIds, setIsPlaying, setIsPaused } from  '../../store/audio'


// const PlayButton = memo(
  function PlayButton({ tracks, trackIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, ids, track, isPaused, player, inner } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)
  const dispatch = useDispatch();

  let isMyTrack
  let icon

  function isById() {
    return tracks && tracks.length && typeof tracks[0] === "number"
  }
  function resetIsMyTrack() {
    isMyTrack = ((isById() ? ids : playlist) === tracks && trackIndex === track)
  }
  function resetIcon() {
    icon = `fas fa-${(isMyTrack && !isPaused) ? "pause" : "play"}-circle`
  }

  function resetOn() {
    if (isOn && !isMyTrack) {
      setIsOn(false)
      console.log(`Setting ${trackIndex} to OFF`)
      return null
    } else if (!isOn && isMyTrack) {
      console.log(`Setting ${trackIndex} ON`)
      setIsOn(true)
      // console.log(`Beginning PB2: ${stripAWSURL(songMp3(playlist,track))} ${trackIndex} isOn: ${isOn} `)
    }
  }
  function printVars() {
    console.log(`PB2(${trackIndex}): track ${track} isOn: ${isOn} isMyTrack: ${isMyTrack} isPlaying: ${isPlaying} isPaused: ${isPaused} icon ${icon}`)
  }
  function resetVars() {
    resetIsMyTrack()
    resetIcon()
    resetOn()
  }
  function nowHovered() {
    setIsHovered(true)
    printVars()
  }

  function nowNotHovered() {
    setIsHovered(false)
    printVars()
  }

  useEffect(() => {
    resetVars()
  }, [playlist, track, isPaused])

  resetVars()

  const handleClick = event => {
    event.stopPropagation();
    console.log(`PB2 CLICK: ${isPlaying?"playing ":""} ${isMyTrack?"mine "+trackIndex:"new"} ${isOn?"on":"off"} ${isPaused?"paused":"not paused"} `)
    if (!isOn) {
      setIsOn(true)
      console.log(`Setting ${trackIndex} to on`)
    }
    if (!isMyTrack) { /* start playing new track */
      console.log(" dispatching changePlaylist/ids ")
      if (tracks && tracks.length) {
        if (typeof tracks[0] === "object")
          dispatch(changePlaylist(tracks, trackIndex))
        else
          dispatch(changeIds(tracks, trackIndex))
      }
      // console.log("returning null")
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
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
      onMouseEnter={nowHovered}
      onMouseLeave={nowNotHovered}
      onClick={handleClick}
    >
      {isHovered ? <i className={icon} /> : trackIndex + 1}
    </div>
  )}
  // )  /* end memo */

export default PlayButton;
