import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying, setIsPaused } from  '../../store/audio'

function PlaylistButton({ tracks }) {
  const { isPlaying, playlist, isPaused, player, inner } = useSelector(state => state.audio);
  const dispatch = useDispatch();

  let isMyPlaylist
  let icon
  function resetIsMyPlaylist() {
    isMyPlaylist = playlist === tracks
  }
  function resetIcon() {
    icon = `fas fa-${(isMyPlaylist && !isPaused) ? "pause" : "play"}-circle`
  }

  function printVars() {
    console.log(`PLB(isMyPlaylist: ${isMyPlaylist} isPlaying: ${isPlaying} isPaused: ${isPaused} icon ${icon}`)
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
      dispatch(changePlaylist(tracks, 0))
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
