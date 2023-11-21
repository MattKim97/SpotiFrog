import { useState, useEffect } from 'react';
import MusicPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function AudioPlayer({playlist, selectionIndex, onRemove}) {
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
        <MusicPlayer
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

export default AudioPlayer;
