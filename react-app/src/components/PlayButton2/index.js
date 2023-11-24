import React, { memo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changePlaylist, setIsPlaying } from  '../../store/audio'

const PlayButton2 = memo(
  function PlayButton2({ tracks, trackIndex, audio }) {
  const [isHovered, setIsHovered] = useState(false);
  const { isPlaying, playlist, track } = useSelector(state => state.audio);
  const [isOn, setIsOn] = useState(false)

  const dispatch = useDispatch();
  const [ref] = useState({});
  let isMyTrack = (playlist[trackIndex] === tracks[trackIndex] && trackIndex === track)

  console.log(`Beginning PB2: ${isPlaying?"Y":"N"} ${isMyTrack?"mine":formatTrackInfoClick()} isOn: ${isOn} `)
  // if (!trackIndex)
  //   console.log(typeof audio.current.state==='object'?Object.keys(audio.current.state):"no audio state")

  if (isOn && !isMyTrack)
    setIsOn(false)

  function formatTrackInfoClick(){
    return `playlist: ${playlist[track]===tracks[track]?'same':playlist[track]?.slice(playlist.length - 30, playlist.length - 14)} track: ${track===trackIndex?"same":track}`
  }

  const handleClick = () => {
    console.log(`PB2 CLICK: ${isPlaying?"Y":"N"} ${isMyTrack?"mine":formatTrackInfoClick()}`)
    if (isOn) {
        setIsOn(prev => !prev)
        console.log("attempting to cause audio component to pause")
        audio.current?.audio?.current?.pause()
        dispatch(setIsPlaying(false))
      } else {
        const rKey = "changePlaylistNTrack"
        if (!isMyTrack) {
            if (!ref[rKey]) ref[rKey] = dispatch(changePlaylist(tracks, trackIndex))
            return null;
        } else if (ref[rKey]) delete ref[rKey]
        console.log("attempting to cause audio component to play")

        audio.current?.audio?.current?.play()
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

export default PlayButton2;
