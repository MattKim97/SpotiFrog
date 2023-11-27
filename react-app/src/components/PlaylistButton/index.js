import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, changeIds, setIsPlaying, setIsPaused } from  '../../store/audio'

function PlaylistButton({ tracks }) {
  const { isPlaying, playlist, ids, isPaused, player, inner } = useSelector(state => state.audio);
  const dispatch = useDispatch();

  let isMyPlaylist
  let icon


  function isById() {
    return tracks && tracks.length && typeof tracks[0] === "number"
  }
  function resetIsMyPlaylist() {
    isMyPlaylist = (isById() ? ids : playlist) === tracks
  }
  function resetIcon() {
    icon = `fas fa-${(isMyPlaylist && !isPaused) ? "pause" : "play"}-circle`
  }

  function printVars() {
    console.log(`PLB(isMyPlaylist: ${isMyPlaylist?"T" : "F"} isPlaying: ${isPlaying} isPaused: ${isPaused} icon ${icon}`)
  }
  function resetVars() {
    resetIsMyPlaylist()
    resetIcon()
    printVars()
  }

  useEffect(() => {
    resetVars()
  }, [playlist, isPaused])

  resetVars()

  const handleClick = event => {
    event.stopPropagation();
    console.log(`PLB CLICK: `); printVars()

    if (!isMyPlaylist) { /* start playing tracks */
    console.log(" dispatching changePlaylist/ids ")
      if (tracks && tracks.length) {
        if (typeof tracks[0] === "object")
          dispatch(changePlaylist(tracks, 0))
        else
          dispatch(changeIds(tracks, 0))
      }
     return null;
  } else {
      if (isPaused) {
        // console.log(" resuming paused track ")
        if (inner) inner.play()
        else if (window.inner) window.inner.play()
        else if (player?.current) player.current.audio.current.play()
        if (inner || window.inner || player?.current) dispatch(setIsPlaying(true)) /* handles paused */
      } else { /* not paused, but reclicked; should pause */
        // console.log(" pausing track ")
        if (inner) inner.pause()
        else if (window.inner) window.inner.pause()
        else if (player?.current) player.current.audio.current.pause()
        if (inner || window.inner || player?.current) dispatch(setIsPaused(true)) /* handles playing */
      }
    }
  }

  return (
      <i className={icon} onClick={handleClick}/>
  )}

export default PlaylistButton;
