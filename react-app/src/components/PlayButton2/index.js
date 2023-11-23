import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying } from  '../../store/audio'

const PlayIcon2 = memo(
  function PlayIcon2({ tracks, trackIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, track } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)

  const dispatch = useDispatch();
  const [ref] = useState({});


  if (isOn && ((playlist !== tracks || trackIndex !== track) || !isPlaying))
    setIsOn(false)

  const handleClick = () => {
    console.log(`PB2 Entering handleClick: playlist${playlist} track${track} => playlist${tracks} track${trackIndex}`)
    if (isOn) {
        setIsOn(prev => !prev)
        dispatch(setIsPlaying(false))
      } else {
        const rKey = "changePlaylistNTrack"
        if (playlist !== tracks || track !== trackIndex) {
            if (!ref[rKey]) ref[rKey] = dispatch(changePlaylist(tracks, trackIndex))
            return null;
        } else if (ref[rKey]) delete ref[rKey]
        setIsOn(prev => !prev)
    }}

  const icon = `fas fa-${(trackIndex === track && isPlaying) ? "pause" : "play"}-circle`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ visibility: isHovered ? 'visible' : 'hidden' }}
    >
      {isHovered ? <i className={icon} /> : trackIndex + 1}
    </div>
  )})

export default PlayIcon2;
