import React from 'react'

export default function SideCard({album}) {
    const imageUrl = playlist.playlistCover ? playlist.playlistCover : "defaultImage.png"
    
    return (
        <div>
            <img src={imageUrl}/>
            <div>
                <h3>{album.name}</h3>
                <h4>{playlist.description}</h4>
            </div>
        </div>
    )
}
