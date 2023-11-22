import React, { memo, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

import { changeTrack, changePlaylist, setIsPlaying } from '../../store/audioPlayer'
import { thunkGetAllSongs } from '../../store/songs'
import PlayButton from '../PlayButton'


// var test1 = [
// 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
// 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3'
// ]
// var test2 = [
// 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
// 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
// ]


const MusicPlayer = memo(function MusicPlayer() {
  const { playlist, track, isPlaying } = useSelector(state => state.audioPlayer)

  const songs = Object.values(useSelector(state => state.songs))
  const dispatch = useDispatch()
  let test1 = []
  let test2 = []



// if (songs && songs.length) console.log(`songs ${Object.keys(songs[0])}`)
// songs albumId,albumName,albumTrackNumber,artist,id,liked,lyrics,mp3,name,playtimeLength,uploadedAt,userId,userLikes

  useEffect(() => {
    if (!playlist || !playlist.length)
      dispatch(changePlaylist(test1, 0))
    else if (!track || track < 0 || track >= playlist.length)
      dispatch(changeTrack(0)) // Reset track to 0 if out of bounds
}, [playlist, track]);


const [ref] = useState({current:{}});
if (!Array.isArray(songs) || !songs.length) {
    if (!ref.current["allSongs"]) ref.current["allSongs"] = dispatch(thunkGetAllSongs())
    return null;
} else if (ref.current["allSongs"]) delete ref.current["allSongs"]

if (!songs || songs.length < 2) return null
const urls = songs.map(song => song.mp3)
test1 = choices(urls, 2)
test2 = choices(urls, 2)
console.log(songs)

  const handleClickPrevious = () => {
    if (!playlist || !playlist.length) return dispatch(changeTrack(0))
    const nextTrackIndex = (track + 1) % playlist.length // back to beginning
    dispatch(changeTrack(nextTrackIndex))
    setIsPlaying(true)
  }
  const handleClickNext = () => {
    if (!playlist || !playlist.length) return dispatch(changeTrack(0))
    const nextTrackIndex = (track + 1) % playlist.length // Loop back to beginning
    dispatch(changeTrack(nextTrackIndex))
    setIsPlaying(true)
  }

if (!playlist || !playlist.length || !track ||
      track < 0 || track >= playlist.length) {
        setIsPlaying(false)
}


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
        autoPlay={isPlaying}
        autoPlayAfterSrcChange={isPlaying}
        hasDefaultKeyBindings={false}
        layout='stacked-reverse'
        loop={false}
        muted={false}
        onClickNext={e => handleClickNext()}
        onClickPrevious={e => handleClickPrevious()}
        onEnded={e => handleClickNext()}
        preload='auto'
        showDownloadProgress={true}
        showFilledProgress={true}
        showFilledVolume={true}
        showJumpControls={false}
        showSkipControls={true}
        src={playlist[track]}
        volume={.5}


        // controls={false}

        // controlsList="nodownload"
        // customAdditionalControls={[]}
        // customControlsSection={[RHAP_UI.MAIN_CONTROLS]}
        // customProgressBarSection={
        //   [
        //     RHAP_UI.CURRENT_TIME,
        //     RHAP_UI.DURATION,
        //     RHAP_UI.PROGRESS_BAR,
        //     RHAP_UI.VOLUME,
        // ]
        // }
        // customVolumeControls={[]}
        // defaultCurrentTime="0:00"
        // defaultDuration="0:00"

        // progressJumpSteps={{ backward: 5000, forward: 5000 }}


// rhap_theme-color: #868686 !default;   // Color of all buttons and volume/progress indicators
// rhap_background-color: #fff !default; // Color of the player background
// rhap_bar-color: #e4e4e4 !default;     // Color of volume and progress bar
// rhap_time-color: #333 !default;       // Font color of current time and duration
// rhap_font-family: inherit !default;   // Font family of current time and duration


// customProgressBarSection: [RHAP_UI.CURRENT_TIME, RHAP_UI.PROGRESS_BAR, RHAP_UI.DURATION],
// customControlsSection: [RHAP_UI.ADDITIONAL_CONTROLS, RHAP_UI.MAIN_CONTROLS, RHAP_UI.VOLUME_CONTROLS],
// customAdditionalControls: [RHAP_UI.LOOP],
// customVolumeControls: [RHAP_UI.VOLUME],

// interface CustomIcons {
//   play?: ReactNode
//   pause?: ReactNode
//   rewind?: ReactNode
//   forward?: ReactNode
//   previous?: ReactNode
//   next?: ReactNode
//   loop?: ReactNode
//   loopOff?: ReactNode
//   volume?: ReactNode
//   volumeMute?: ReactNode
// }


      />
    </>
  );
})


// Returns a random integer between min (inclusive) and
// max (inclusive). Neither max nor min have to be an int.
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choice(arr) {
  return arr[getRandomInt(0, arr.length - 1)]
}

function choices(arr, num) {
  const result = []
  for (let i = 0; i < num; i++) {
    result.push(choice(arr))
  }
  return result
}

export default MusicPlayer;
