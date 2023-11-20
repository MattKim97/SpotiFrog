import React from 'react'

export default function SideCard({playlist}) {
    const imageUrl = playlist.playlistCover ? playlist.playlistCover : "https://static.thenounproject.com/png/4974686-200.png"

    return (
        <div style={{"border": "red 1px dashed"}}>
            <img src={imageUrl}/>
            <div>
                <h3>{playlist.name}</h3>
                <h4>{playlist.description}</h4>
            </div>
        </div>
    )
}
