
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Search() {
    const history = useHistory();

    function search(urlString) {
        history.push(`/${urlString}`);
    }

    return (
        <div className='SearchMainContainer'>
        <div className='SearchContainer'>
            <button className="searchButtons" onClick={() => search("playlists")}>Playlists</button>
            <button className="searchButtons" onClick={() => search("albums")}>Albums</button>
            <button className="searchButtons" onClick={() => search("songs")}>Songs</button>
        </div>
        </div>
    );
}
