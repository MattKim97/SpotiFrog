import React from 'react'

export default function MainTile({playlist}) {
    const imageUrl = playlist.playlistCover ? playlist.playlistCover : "https://static.thenounproject.com/png/4974686-200.png"

    return (
        <>
        <div>
            <img src={imageUrl}/>
        </div>
        <h3>{playlist.name}</h3>
        <h4>{playlist.description}</h4>
        </>
    )
}
