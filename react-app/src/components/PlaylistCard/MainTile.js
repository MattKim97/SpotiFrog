import React from 'react'

export default function MainTile({playlist}) {
    const imageUrl = playlist.playlistCover ? playlist.playlistCover : "defaultImage.png"
    /
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
