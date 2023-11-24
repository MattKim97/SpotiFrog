import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying } from  '../../store/audio'

const PlayIcon2 = memo(
  function PlayIcon2({ tracks, trackIndex, audio }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, track } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)

  const dispatch = useDispatch();
  const [ref] = useState({});
  let isMyTrack = (playlist === tracks && trackIndex === track)


  if (isOn && !isMyTrack)
    setIsOn(false)

  function formatTrackInfoClick(){
    return `playlist: ${playlist===tracks?'same':playlist.slice(playlist.length - 20)} track: ${track===trackIndex?"same":track}`
  }

  const handleClick = () => {
    console.log(`PB2 CLICK: ${isPlaying?"Y":"N"} ${isMyTrack?"mine":formatTrackInfoClick()}`)
    if (isOn) {
        setIsOn(prev => !prev)
        audio.current.pause()
        dispatch(setIsPlaying(false))
      } else {
        const rKey = "changePlaylistNTrack"
        if (!isMyTrack) {
            if (!ref[rKey]) ref[rKey] = dispatch(changePlaylist(tracks, trackIndex))
            return null;
        } else if (ref[rKey]) delete ref[rKey]
        audio.current.play()
        setIsOn(prev => !prev)
    }}

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

export default PlayIcon2;
