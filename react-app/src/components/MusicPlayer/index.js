import React, { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { changeCurrentTrack, changePlaylist } from '../../store/audioPlayer'
import PlayButton from '../PlayButton'

var test1 = [
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
]
var test2 = [
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
]


class MusicPlayer extends {
  const { playlist, currentTrack } = useSelector(state => state.audioPlayer)
  // const { currentTrack } = useSelector(state => state.audioPlayer)
  // const [src, setSrc] = useState(playlist[currentTrack])
  const dispatch = useDispatch()

  console.log('Entering: playlist', playlist, 'test1', test1)

  const handleClickNext = () => {
    console.log('Entering handleClickNext')
    if (!playlist || !playlist.length) return
    const nextTrackIndex = (currentTrack + 1) % playlist.length // Loop back to beginning
    dispatch(changeCurrentTrack(nextTrackIndex))
    setSrc(playlist[nextTrackIndex])
  }

  const handleClickPrevious = () => {
    console.log('Entering handleClickPrevious')
    if (!playlist || !playlist.length) return
      const nextTrackIndex = (currentTrack ? currentTrack : playlist.length) - 1 // Loop back to end
    dispatch(changeCurrentTrack(nextTrackIndex))
    setSrc(playlist[nextTrackIndex])
  }



  return (
    <AudioPlayer
        autoPlay
        onEnded={handleClickNext}
        autoPlayAfterSrcChange={true}
        showSkipControls={true}
        showJumpControls={false}
        src={src}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
      />
    )
  };




const MusicPlayer2 = () => {
  const { playlist, currentTrack } = useSelector(state => state.audioPlayer)
  // const { currentTrack } = useSelector(state => state.audioPlayer)
  const dispatch = useDispatch()

  console.log('Entering: playlist', playlist, 'test1', test1)


  const handleNextTrack = () => {
    if (!playlist || !playlist?.length) return
    const nextTrackIndex = (currentTrack + 1) % playlist.length // Loop back to beginning
    dispatch(changeCurrentTrack(nextTrackIndex))
  }

  if (!playlist && test1) dispatch(changePlaylist(test1, 0))
  console.log('After dispatch: playlist', playlist, 'test1', test1)

if (!playlist || !playlist.length || currentTrack < 0 || currentTrack >= playlist.length) {
  console.log('Before return null: playlist', playlist, 'test1', test1)
  return null
}

console.log('After null check: playlist', playlist, 'test1', test1)
  return (
    <>
    <h1>AudioPlayer</h1>
    {test1 &&
    <>
      <h1>test1</h1>
      <ul>
        {test1.map((url, i) => <li key={i}><PlayButton playlist={test1} trackIndex={i} />{url}</li>)}
      </ul>
      <h1>test2</h1>
      <ul>
        {test2.map((url, i) => <li key={i}><PlayButton playlist={test2} trackIndex={i} /> {url} </li>)}
      </ul>
      </>
    }
    <AudioPlayer
      src={test1[0]}
      onEnded={handleNextTrack}
      autoPlayAfterSrcChange
    />
    </>
  );
};

export default MusicPlayer;
