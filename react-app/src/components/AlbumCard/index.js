import React from 'react'
import { Link } from 'react-router-dom'

export default function AlbumCard({format, album}) {
    const imageUrl = album.albumCover ? album.albumCover : "https://static.thenounproject.com/png/4974686-200.png";
    // final: user's name should link to user
    const year = new Date(album.releaseDate).getFullYear();
    return (
        <div className={`AlbumCardContainer${format}`}>
        <Link to={`/albums/${album.id}`}>
            <div className={`album${format}`}>
                <img src={imageUrl} alt="Album"/>
                <div>
                    <h3>{album.name}</h3>
                    <h4><span className="albumYearToolTip" title={new Date(album.releaseDate).toLocaleDateString(undefined, {weekday: 'long',year: 'numeric',month: 'long',day: 'numeric'})}>{year}</span> • {album.artist}</h4>
                </div>
            </div>
        </Link>
        </div>
    )
}
