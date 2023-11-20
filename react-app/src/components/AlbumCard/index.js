import React from 'react'
import SideCard from './SideCard.js'
import MainTile from './MainTile.js'

export default function AlbumCard({format, album}) {
    return (
    <>
    {format === "side" ?
        <SideCard album={album}/>
    : format === "main" ?
        <MainTile album={album}/>
    : <span>Something went wrong in the AlbumCard</span>
    }
    </>
    )
}
