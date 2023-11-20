import React from 'react'

export default function SideCard({album}) {
    const imageUrl = album.albumCover ? album.albumCover : "https://static.thenounproject.com/png/4974686-200.png"
    // final: userId should be user's name and should link to user
    const year = new Date(album.releaseDate).getFullYear()
    return (
        <div>
            <img src={imageUrl}/>
            <div>
                <h3>{album.name}</h3>
                <h4>{year} • {album.artist}</h4>
            </div>
        </div>
    )
}
