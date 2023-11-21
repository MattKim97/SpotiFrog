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
    this.setState(prev => ({
      index: (prev.index === 0 ? this.state.tracks.length : prev.index) - 1,
    }))
  }

  handleClickNext = () => {
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



//   console.log('Entering: tracks', tracks, 'test1', test1)

//   const handleClickNext = () => {
//     console.log('Entering handleClickNext')
//     if (!tracks || !tracks.length) return
//     const nextTrackIndex = (currentTrack + 1) % tracks.length // Loop back to beginning
//     dispatch(changeCurrentTrack(nextTrackIndex))
//     setSrc(tracks[nextTrackIndex])
//   }

//   const handleClickPrevious = () => {
//     console.log('Entering handleClickPrevious')
//     if (!tracks || !tracks.length) return
//       const nextTrackIndex = (currentTrack ? currentTrack : tracks.length) - 1 // Loop back to end
//     dispatch(changeCurrentTrack(nextTrackIndex))
//     setSrc(tracks[nextTrackIndex])
//   }



//   return (
//     <AudioPlayer
//         autoPlay
//         onEnded={handleClickNext}
//         autoPlayAfterSrcChange={true}
//         showSkipControls={true}
//         showJumpControls={false}
//         src={src}
//         onClickPrevious={handleClickPrevious}
//         onClickNext={handleClickNext}
//       />
//     )
//   };


const MusicPlayer2 = () => {
  const { tracks, currentTrack } = useSelector(state => state.audioPlayer)
  // const { currentTrack } = useSelector(state => state.audioPlayer)
  const dispatch = useDispatch()

  console.log('Entering: tracks', tracks, 'test1', test1)


  const handleNextTrack = () => {
    if (!tracks || !tracks?.length) return
    const nextTrackIndex = (currentTrack + 1) % tracks.length // Loop back to beginning
    dispatch(changeCurrentTrack(nextTrackIndex))
  }

  if (!tracks && test1) dispatch(changePlaylist(test1, 0))
  console.log('After dispatch: tracks', tracks, 'test1', test1)

if (!tracks || !tracks.length || currentTrack < 0 || currentTrack >= tracks.length) {
  console.log('Before return null: tracks', tracks, 'test1', test1)
  return null
}

console.log('After null check: tracks', tracks, 'test1', test1)
  return (
    <>
    <h1>AudioPlayer</h1>
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
      src={test1[0]}
      onEnded={handleNextTrack}
      autoPlayAfterSrcChange
    />
    </>
  );
};

export default MusicPlayer;
