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
var track = 0

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: test1,
      index: 0,
      src: undefined
    };
  }

  handleClickPrevious = () => {
    console.log('Entering handleClickPrevious')
    this.setState(prev => ({
      index: (prev.index === 0 ? this.state.tracks.length : prev.index) - 1,
    }))
  }

  handleClickNext = () => {
    console.log('Entering handleClickNext')
    this.setState(prev => ({
      index: prev.index < this.state.tracks.length - 1 ? prev.index + 1 : 0,
    }))
  }
  render() {
    return (
      <AudioPlayer
        src={test1[track]}
        layout='stacked-reverse'
        autoplay={true}
        autoPlayAfterSrcChange={true}
        loop={true}
        muted={false}
        showSkipControls={true}
        showJumpControls={false}
        hasDefaultKeyBindings={false}
        onClickPrevious={this.handleClickPrevious}
        onClickNext={this.handleClickNext}
        onEnded={this.handleClickNext}
      />
    )}}



const MusicPlayer2 = () => {
  // const { playlist, currentTrack } = useSelector(state => state.audioPlayer)
  const { playlist } = useSelector(state => state.audioPlayer)
  const { currentTrack } = useSelector(state => state.audioPlayer)
  const dispatch = useDispatch()

  console.log('Entering: playlist', playlist, 'test1', test1)


  const handleClickPrevious = () => {
    if (!playlist || !playlist?.length) return
    const nextTrackIndex = (currentTrack + 1) % playlist.length // Loop back to beginning
    dispatch(changeCurrentTrack(nextTrackIndex))
  }
  const handleClickNext = () => {
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
    <h1>MusicPlayer</h1>
    {test1 &&
    <>
      <h1>test1</h1>
      <ul>
        {test1.map((url, i) => <li key={i}><PlayButton tracks={test1} trackIndex={i} />{url}</li>)}
      </ul>
      <h1>test2</h1>
      <ul>
        {test2.map((url, i) => <li key={i}><PlayButton tracks={test2} trackIndex={i} /> {url} </li>)}
      </ul>
      </>
    }
      <AudioPlayer
        src={playlist[currentTrack]}
        layout='stacked-reverse'
        autoplay={true}
        autoPlayAfterSrcChange={true}
        loop={true}
        muted={false}
        showSkipControls={true}
        showJumpControls={false}
        hasDefaultKeyBindings={false}
        onClickPrevious={handleClickPrevious}
        onClickNext={handleClickNext}
        onEnded={handleClickNext}
      />
    </>
  );
};

export default MusicPlayer;
