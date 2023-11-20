import React from 'react'

export default function MainTile({album}) {
    const imageUrl = album.albumCover ? album.albumCover : "defaultImage.png"
    // final: userId should be user's name and should link to user
    return (
        <>
        <div>
            <img src={imageUrl}/>
        </div>
        <h3>{album.name}</h3>
        <h4>{album.releaseDate} * {album.userId}</h4>
        </>
    )
}
