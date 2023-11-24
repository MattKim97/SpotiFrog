import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying, setIsPaused } from  '../../store/audio'

const PlayButton2 = memo(
  function PlayButton2({ tracks, trackIndex, audio }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, track, isPaused } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)

  const dispatch = useDispatch();
  const [ref] = useState({});
  let isMyTrack = (playlist[trackIndex] === tracks[trackIndex] && trackIndex === track)

  console.log(`Beginning PB2: ${isPlaying?"Y":"N"} ${isMyTrack?"mine":formatTrackInfoClick()} isOn: ${isOn} `)
  // if (!trackIndex)
  //   console.log(typeof audio.current.state==='object'?Object.keys(audio.current.state):"no audio state")

  if (isOn && !isMyTrack) {
    setIsOn(false)
    return null
  }

  function formatTrackInfoClick(){
    return `playlist: ${playlist[track]===tracks[track]?'same':playlist[track]?.slice(playlist.length - 30, playlist.length - 14)} track: ${track===trackIndex?"same":track}`
  }

  const handleClick = () => {
    const rKey = "changePlaylist"
    console.log(`PB2 CLICK: ${isPlaying?"Y":"N"} ${isMyTrack?"mine":formatTrackInfoClick()}`)
    if (!isOn) setIsOn(true)
    if (!isMyTrack) { /* start playing new track */
      if (!ref[rKey]) ref[rKey] = dispatch(changePlaylist(tracks, trackIndex))
      return null;
  } else {
      if (ref[rKey]) delete ref[rKey]
      if (isPaused) {
        console.log(" resuming paused track ")
        audio.current.audio.current.play()
        dispatch(setIsPlaying(true)) /* handles paused */
      } else { /* not paused, but reclicked; should pause */
        console.log(" pausing track ")
        audio.current.audio.current.pause()
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
