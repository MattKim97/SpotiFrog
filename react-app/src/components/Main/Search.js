
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Search() {
    const history = useHistory();

    function search(urlString) {
        history.push(`/${urlString}`);
    }

    return (
        <div className='SearchContainer'>
            <button onClick={() => search("playlists")}>Playlists</button>
            <button onClick={() => search("albums")}>Albums</button>
            <button onClick={() => search("songs")}>Songs</button>
        </div>
    );
}
