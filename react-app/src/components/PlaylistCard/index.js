import React from 'react'
import { Link } from 'react-router-dom'
import "./PlaylistCard.css"

export default function PlaylistCard({format, playlist}) {
    const imageUrl = playlist.playlistCover ? playlist.playlistCover : "https://static.thenounproject.com/png/4974686-200.png"

    return (
        <div className={`PlaylistCardContainer${format}`}>
        <Link to={`/playlists/${playlist.id}`}>
            <div className={`playlist${format}`}>
                <div>
                    <img src={imageUrl}/>
                </div>
                <h3>{playlist.name}</h3>
                <h4>{playlist.description}</h4>
            </div>
        </Link>
        </div>
    )
}
