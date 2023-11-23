import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { setIsPlaying } from '../../store/audio'


function AudioPlayerX({playlist, selectionIndex, onRemove}) {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(selectionIndex);

    useEffect(() => {
        if (currentTrackIndex >= playlist.length)
            setCurrentTrackIndex(0)
    }, [playlist, currentTrackIndex]);

    const handleNextTrack = () => {
        if (currentTrackIndex < playlist.length - 1)
            setCurrentTrackIndex(prev => prev + 1)
        else
            setCurrentTrackIndex(0)
    };

    const handleRemoveTrack = index => onRemove(index)

    if (!playlist.length)
        return <div>Empty playlist</div>;

    return (
      <div>
        <AudioPlayer
            src={playlist[currentTrackIndex]}
            onEnded={handleNextTrack}
            autoPlayAfterSrcChange
        />
        <ul>
            {playlist.map((track, index) => (
            <li key={index}>
                {track}
                <button onClick={() => handleRemoveTrack(index)}>Remove</button>
            </li>
            ))}
        </ul>
      </div>
    );
};



var test1 = [
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
]
var test2 = [
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
]
var trackXXX = 0

class MusicPlayer2 extends React.Component {
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
    setIsPlaying(true)
  }

  handleClickNext = () => {
    console.log('Entering handleClickNext')
    this.setState(prev => ({
      index: prev.index < this.state.tracks.length - 1 ? prev.index + 1 : 0,
    }))
    setIsPlaying(true)
  }


  render() {
    return (
      <AudioPlayer
        src={test1[trackXXX]}
        layout='stacked-reverse'
        autoPlay={true}
        autoPlayAfterSrcChange={true}
        loop={true}
        muted={false}
        showSkipControls={true}
        showJumpControls={false}
        hasDefaultKeyBindings={false}
        onClickPrevious={this.handleClickPrevious}
        onClickNext={this.handleClickNext}
        onEnded={this.handleClickNext}
        volume={.5}
      />
    )}}

export default AudioPlayerX;
