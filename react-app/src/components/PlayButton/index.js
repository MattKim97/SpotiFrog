import { useDispatch } from 'react-redux'
import { changePlaylist } from  '../../store/audioPlayer'

const PlayButton = ({ playlist, trackIndex }) => {
  const dispatch = useDispatch()

  const handlePlayClick = () => dispatch(changePlaylist(playlist, trackIndex))

  return (
    <button onClick={handlePlayClick}>
      Play
    </button>
  )
}

export default PlayButton;
