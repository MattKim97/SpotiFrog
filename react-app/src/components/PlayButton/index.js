import { memo, useState } from 'react'
import { useDispatch, useSelector,  } from 'react-redux'

import { changePlaylist, setIsPlaying } from  '../../store/audioPlayer'

/* when you use this component, memo-ize it */
const PlayButton = memo(function PlayButton({tracks, trackIndex }) {
  // console.log(`Entering PlayButton: playlist${tracks} track${trackIndex}`)
  const dispatch = useDispatch()
  const { playlist, track, isPlaying } = useSelector(state => state.audioPlayer)
  const [isOn, setIsOn] = useState(false)

  if (isOn && (playlist !== tracks || trackIndex !== track) || !isPlaying)
    return setIsOn(false)

  const handlePlayClick = () => {
    if (isOn) {
      setIsOn(prev => !prev)
      dispatch(setIsPlaying(false))
    } else {
      setIsOn(prev => !prev)
      dispatch(setIsPlaying(true))
      dispatch(changePlaylist(tracks, trackIndex))
    }
    console.log(`Leaving handlePlayClick: playlist${tracks} track${trackIndex}`)

  return (
    <i className={`fa-circle-${isPlaying ? "pause":"play"} fa-regular`} onClick={handlePlayClick}></i>
   )
}})

export default PlayButton;
