import { useDispatch } from 'react-redux'
import { changePlaylist, setIsPlaying } from  '../../store/audioPlayer'

const PlayButton = ({ tracks, trackIndex }) => {
  // console.log(`Entering PlayButton: playlist${tracks} track${trackIndex}`)
  const dispatch = useDispatch()

  const handlePlayClick = () => {
    dispatch(setIsPlaying(true))
    // console.log(`Entering handlePlayClick: playlist${tracks} track${trackIndex}`)
    dispatch(changePlaylist(tracks, trackIndex))
  }

  return (
    <button type='button' onClick={handlePlayClick}>
      Play
    </button>
  )
}

export default PlayButton;
