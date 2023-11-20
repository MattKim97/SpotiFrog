import React from 'react'
import SideCard from './SideCard.js'
import MainTile from './MainTile.js'

export default function AlbumCard({format, album}) {
    const imageUrl = album.albumCover ? album.albumCover : "https://static.thenounproject.com/png/4974686-200.png"
    // final: user's name should link to user
    const year = new Date(album.releaseDate).getFullYear()
    return (
        <div className={`album ${format}`}>
            <img src={imageUrl}/>
            <div>
                <h3>{album.name}</h3>
                <h4>{year} • {album.artist}</h4>
            </div>
        </div>
    )
    // return (
    // <>
    // {format === "side" ?
    //     <SideCard album={album}/>
    // : format === "main" ?
    //     <MainTile album={album}/>
    // : <span>Something went wrong in the AlbumCard</span>
    // }
    // </>
    // )
}
